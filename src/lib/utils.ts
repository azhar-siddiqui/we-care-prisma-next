import { LoggedInAdminUser, LoggedInUser } from "@/@types/login-user";
import { Role } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOtp() {
  // Generate a random number between 10000 and 99999
  const min = 10000;
  const max = 99999;
  const randomBytes = crypto.randomInt(min, max + 1); // randomInt generates an integer in [min, max]
  return randomBytes.toString();
}

// Get initials for fallback (e.g., "AS" or "A")
export function getInitialsFallbackName(
  user: LoggedInAdminUser | LoggedInUser | null
): string {
  // Step 1: Determine fallback name based on role
  console.log("getInitialsFallbackName", user);
  const fallbackName = user?.role === Role.ADMIN ? "ADMIN" : "USER";

  // Step 2: Generate initials from fallback name
  if (!fallbackName) return "";
  const words = fallbackName.trim().split(" ");
  if (words.length === 1) {
    return words[0][0]?.toUpperCase() ?? ""; // e.g., "Azhar" → "A"
  }
  return (words[0][0] + (words[1][0] ?? "")).toUpperCase();
}

export const detectOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/macintosh|mac os x/.test(userAgent)) {
    return "mac";
  }
  if (/win/.test(userAgent)) {
    return "windows";
  }
  return "unknown"; // Fallback for other OSes (e.g., Linux, mobile)
};
