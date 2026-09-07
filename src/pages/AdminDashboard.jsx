import { useEffect, useMemo, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { getAllSignups, getDashboardStats, getFunnel, getAcquisitionBreakdown, resendWhatsappInvite } from "../lib/mockApi";

const STAGE_LABELS = {
  landing_view: "View",
  form_start: "Start",
  form_complete: "Form",
  otp_verified: "OTP",
  whatsapp_joined: "Join",
};

const WHATSAPP_LABELS = {
  pending: "Pending",
  sent: "Sent",
  failed: "Failed",
};

function StatCard({ label, value, note, featured, loading }) {
  return (
    <div className={`${styles.statCard} ${featured ? styles.statCardFeatured : ""}`}>
      <p className={styles.statLabel}>{label}</p>
      {loading ? <div className={styles.skeletonLine} /> : <p className={styles.statValue}>{value.toLocaleString()}</p>}
      <p className={styles.statNote}>{note}</p>
    </div>
  );
}

function Panel({ title, action, children, wide }) {
  return (
    <div className={`${styles.panel} ${wide ? styles.panelWide : ""}`}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>{title}</h3>
        {action}
      </div>
      <div className={styles.panelBody}>{children}</div>
    </div>
  );
}

function BarChart({ data, height = 160 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={styles.barChart} style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className={styles.barChartCol}>
          <span className={styles.barChartValue}>{d.note ?? d.value}</span>
          <div className={styles.barChartBar} style={{ height: `${(d.value / max) * 100}%` }} />
          <span className={styles.barChartLabel}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyDesc}>{description}</p>
    </div>
  );
}

function toCsv(rows) {
  const headers = ["First Name", "Last Name", "Mobile", "Email", "Source", "Referred By", "Consent", "WhatsApp Status", "Created At"];
  const lines = rows.map((r) => [r.first_name, r.last_name, r.mobile, r.email, r.acquisition_source, r.referred_by_name ?? "", r.consent_ok ? "Yes" : "No", WHATSAPP_LABELS[r.whatsapp_status], r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
  return [headers.join(","), ...lines].join("\n");
}

function downloadCsv(rows) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lfn-signups.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [funnel, setFunnel] = useState(null);
  const [acq, setAcq] = useState(null);
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resendingId, setResendingId] = useState(null);

  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function loadAll() {
    Promise.all([getDashboardStats(), getFunnel(), getAcquisitionBreakdown(), getAllSignups()]).then(([s, f, a, g]) => {
      setStats(s);
      setFunnel(f);
      setAcq(a);
      setSignups(g);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadAll();
  }, []);

  const funnelData = useMemo(() => {
    if (!funnel) return [];
    const first = funnel.stages[0]?.count ?? 0;
    return funnel.stages.map((s) => ({ label: STAGE_LABELS[s.stage] ?? s.stage, value: s.count, note: first > 0 ? `${Math.round((s.count / first) * 100)}%` : undefined }));
  }, [funnel]);

  const sourceOptions = useMemo(() => {
    const set = new Set(signups.map((s) => s.acquisition_source));
    return Array.from(set);
  }, [signups]);

  const filteredSignups = useMemo(() => {
    return signups.filter((r) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || `${r.first_name} ${r.last_name}`.toLowerCase().includes(q) || r.mobile.includes(q) || r.email.toLowerCase().includes(q);
      const matchesSource = sourceFilter === "all" || r.acquisition_source === sourceFilter;
      const matchesStatus = statusFilter === "all" || r.whatsapp_status === statusFilter;
      const created = r.created_at.slice(0, 10);
      const matchesFrom = !dateFrom || created >= dateFrom;
      const matchesTo = !dateTo || created <= dateTo;
      return matchesSearch && matchesSource && matchesStatus && matchesFrom && matchesTo;
    });
  }, [signups, search, sourceFilter, statusFilter, dateFrom, dateTo]);

  async function handleResend(id) {
    setResendingId(id);
    try {
      await resendWhatsappInvite(id);
      loadAll();
    } finally {
      setResendingId(null);
    }
  }

  const active = stats?.active_users ?? 0;
  const pending = stats?.pending_verification_users ?? 0;

  return (
    <div className={styles.dashboard}>
      <div className={styles.kpiGrid}>
        <StatCard label="Total Signups" value={stats?.total_signups ?? 0} note="Everyone registered" featured loading={loading} />
        <StatCard label="Active Members" value={active} note="Verified by OTP" loading={loading} />
        <StatCard label="Pending Verification" value={pending} note="Awaiting OTP" loading={loading} />
        <StatCard label="Total Referrals" value={stats?.total_referrals ?? 0} note="Credited on verify" loading={loading} />
      </div>

      <div className={styles.row2}>
        <Panel title="Signup Funnel" wide>
          {loading ? <div className={styles.skeletonBlock} /> : funnelData.every((d) => d.value === 0) ? <EmptyState title="No funnel data yet" description="Events are recorded as visitors move through sign-up." /> : <BarChart data={funnelData} />}
        </Panel>
        <Panel title="Acquisition Source" wide>
          {loading ? <div className={styles.skeletonBlock} /> : (acq?.breakdown.length ?? 0) === 0 ? <EmptyState title="No acquisition data yet" description="Each member picks a source when they register." /> : <BarChart data={acq.breakdown.map((b) => ({ label: b.acquisition_source, value: b.count }))} />}
        </Panel>
      </div>

      <Panel
        title="Signups"
        action={
          <button type="button" className={styles.primaryButtonSmall} onClick={() => downloadCsv(filteredSignups)}>
            Export CSV
          </button>
        }
      >
        <div className={styles.filterBar}>
          <input className={styles.input} placeholder="Search name, mobile, email" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className={styles.select} value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="all">All sources</option>
            {sourceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All WhatsApp status</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <input className={styles.input} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <input className={styles.input} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>

        {loading ? (
          <div className={styles.skeletonBlock} />
        ) : filteredSignups.length === 0 ? (
          <EmptyState title="No signups match" description="Try adjusting your filters." />
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Referred By</th>
                  <th>Consent</th>
                  <th>WhatsApp</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredSignups.map((r) => (
                  <tr key={r.id}>
                    <td>{r.first_name} {r.last_name}</td>
                    <td>{r.mobile}</td>
                    <td>{r.email}</td>
                    <td>{r.acquisition_source}</td>
                    <td>{r.referred_by_name ?? "—"}</td>
                    <td>{r.consent_ok ? "Yes" : "No"}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles["status_" + r.whatsapp_status]}`}>{WHATSAPP_LABELS[r.whatsapp_status]}</span>
                    </td>
                    <td>{r.created_at.slice(0, 10)}</td>
                    <td>
                      <button type="button" className={styles.linkButton} disabled={resendingId === r.id} onClick={() => handleResend(r.id)}>
                        {resendingId === r.id ? "Sending…" : "Resend"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}