import { Redis } from "@upstash/redis";
import { env } from "./env";

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// Store OTP with 10-minute expiration
export async function storeOTP(email: string, otp: string) {
  const key = `otp:${email}`;
  await redis.set(key, otp, { ex: 600 }); // 600 seconds = 10 minutes
}

// Verify OTP
export async function verifyOTP(
  email: string,
  otp: string
): Promise<{ isValid: boolean; message: string }> {
  const key = `otp:${email}`;
  const storedData = await redis.get(key);

  if (!storedData) {
    return {
      isValid: false,
      message: "OTP expired or invalid. Please register again.",
    };
  }

  let otpData;
  try {
    otpData =
      typeof storedData === "string" ? JSON.parse(storedData) : storedData;
  } catch (error) {
    console.error("Error parsing stored OTP data:", error);
    return { isValid: false, message: "Invalid OTP data format." };
  }

  const { createdAt } = otpData;

  // Check if OTP is expired (e.g., 10 minutes expiration)
  const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
  const currentTime = Date.now();
  if (currentTime - createdAt > OTP_EXPIRY_TIME) {
    await redis.del(key); // Optionally delete expired OTP
    return {
      isValid: false,
      message: "OTP expired or invalid. Please register again.",
    };
  }

  // Check if OTP matches
  if (otpData !== Number(otp)) {
    return { isValid: false, message: "Please enter the correct OTP." };
  }

  return { isValid: true, message: "OTP verified successfully." };
}

// Delete OTP after verification
export async function deleteOTP(email: string) {
  const key = `otp:${email}`;
  await redis.del(key);
}
