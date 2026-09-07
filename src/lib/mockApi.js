const USERS_KEY = "lfn_users";
const EVENTS_KEY = "lfn_events";
const SESSION_KEY = "lfn_session_user_id";

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readEvents() {
  const raw = localStorage.getItem(EVENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function genReferralCode(firstName) {
  return firstName.slice(0, 3).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
}

export function logEvent(type, sessionId) {
  const events = readEvents();
  events.push({ id: genId(), event_type: type, session_id: sessionId, created_at: new Date().toISOString() });
  writeEvents(events);
}

export async function registerUser(data) {
  await delay(500);

  const users = readUsers();

  const mobile = data.mobile;
  const existing = users.find((u) => u.mobile === mobile);

  if (existing && existing.status === "active") {
    return {
      success: false,
      message: "This mobile number is already registered",
    };
  }

  const referredByCode = data.referredBy || null;

  const referredBy = referredByCode
    ? users.find((u) => u.referral_code === referredByCode)
    : null;

  const user = {
    id: genId(),

    first_name: data.firstName,
    last_name: data.lastName,

    mobile,
    whatsapp_number: data.whatsappNumber || mobile,

    email: data.email,

    age_range: data.ageRange || null,

    acquisition_source: data.howDidYouHear || null,
    acquisition_detail: data.universityCommunity || null,

    referred_by_user_id: referredBy ? referredBy.id : null,
    referred_by_name: referredBy
      ? `${referredBy.first_name} ${referredBy.last_name}`
      : null,

    referral_code: null,

    consent_ok: !!(
      data.consents?.communications?.accepted &&
      data.consents?.communityParticipation?.accepted &&
      data.consents?.imageVideoUsage?.accepted
    ),

    status: "pending_verification",
    whatsapp_status: "pending",

    created_at: new Date().toISOString(),

    otp_verified_at: null,

    // Mock OTP
    otp_code: "123456",
  };

  users.push(user);
  writeUsers(users);

  logEvent("form_complete", data.sessionId || null);

  return {
    success: true,
    message: "Registration successful",
    user,
  };
}


export async function sendOtp() {
  await delay(400);
  return { success: true };
}

export async function verifyOtp(userId, code) {
  await delay(500);

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);

  if (idx === -1) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (users[idx].otp_code !== code) {
    return {
      success: false,
      message: "Incorrect code",
    };
  }

  users[idx].status = "active";
  users[idx].otp_verified_at = new Date().toISOString();
  users[idx].referral_code = genReferralCode(users[idx].first_name);
  users[idx].whatsapp_status = "sent";

  writeUsers(users);

  localStorage.setItem(SESSION_KEY, users[idx].id);

  logEvent("otp_verified", null);
  logEvent("whatsapp_joined", null);

  return {
    success: true,
    user: users[idx],
  };
}


export async function getCurrentUser() {
  await delay(200);
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  const users = readUsers();
  return users.find((u) => u.id === id) || null;
}

export async function updateCurrentUser(patch) {
  await delay(400);
  const id = localStorage.getItem(SESSION_KEY);
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Not logged in");
  users[idx] = { ...users[idx], ...patch };
  writeUsers(users);
  return users[idx];
}

export async function getAllSignups() {
  await delay(400);
  return readUsers();
}

export async function resendWhatsappInvite(userId) {
  await delay(600);
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("User not found");
  users[idx].whatsapp_status = "sent";
  writeUsers(users);
  return users[idx];
}

export async function getDashboardStats() {
  await delay(300);
  const users = readUsers();
  return {
    total_signups: users.length,
    active_users: users.filter((u) => u.status === "active").length,
    pending_verification_users: users.filter((u) => u.status === "pending_verification").length,
    total_referrals: users.filter((u) => u.referred_by_user_id).length,
    whatsapp_sent_count: users.filter((u) => u.whatsapp_status === "sent").length,
    whatsapp_failed_count: users.filter((u) => u.whatsapp_status === "failed").length,
  };
}

export async function getFunnel() {
  await delay(300);
  const events = readEvents();
  const count = (type) => events.filter((e) => e.event_type === type).length;
  return {
    stages: [
      { stage: "landing_view", count: count("landing_view") },
      { stage: "form_start", count: count("form_start") },
      { stage: "form_complete", count: count("form_complete") },
      { stage: "otp_verified", count: count("otp_verified") },
      { stage: "whatsapp_joined", count: count("whatsapp_joined") },
    ],
  };
}

export async function getAcquisitionBreakdown() {
  await delay(300);
  const users = readUsers();
  const map = {};
  users.forEach((u) => {
    map[u.acquisition_source] = (map[u.acquisition_source] || 0) + 1;
  });
  return { breakdown: Object.entries(map).map(([acquisition_source, count]) => ({ acquisition_source, count })) };
}