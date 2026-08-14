export async function registerUser(formData) {
    console.log("Pretend sending:", formData);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        success: true,
        userId: "fake123",
        status: "pending_verification",
    };
}

export async function sendOtp(mobile) {
    console.log("Sending OTP to:", mobile);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        success: true,
        message: "OTP sent",
    };
}

export async function verifyOtp(mobile, code) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // pretend "123456" is always the correct code, for testing
    if (code === "123456") {
        return { success: true, token: "token-abc" };
    } else {
        return { success: false, error: "Incorrect code" };
    }
}
