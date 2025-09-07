import { LoggedInAdminUser, LoggedInUser } from '@/@types/login-user';
import { Role } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { env } from './env';

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Type guard to check if userData is Admin
function isAdmin(userData: LoggedInAdminUser | LoggedInUser): userData is LoggedInAdminUser {
  return 'email' in userData; // Admin has 'email', User has 'username'
}

// Generate JWT
export async function generateToken(userData: LoggedInAdminUser | LoggedInUser): Promise<string> {
  // Initialize the JWT payload with common fields
  let payload: Record<string, unknown> = {
    id: userData.id,
    role: userData.role,
    contactNumber: userData.contactNumber,
  };

  // Add fields specific to Admin or User
  if (isAdmin(userData)) {
    payload = {
      ...payload,
      email: userData.email,
      labName: userData.labName,
      ownerName: userData.ownerName,
      isTrialUsed: userData.isTrialUsed,
      isBlock: userData.isBlock,
    };
  } else {
    payload = {
      ...payload,
      username: userData.username,
      name: userData.name,
      adminId: userData.adminId,
    };
  }

  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days expiration
    .sign(JWT_SECRET);
  return token;
}

// Verify JWT
export async function verifyToken(token: string): Promise<LoggedInAdminUser | LoggedInUser | null> {
  try {
    const { payload } = await jose.jwtVerify<LoggedInAdminUser | LoggedInUser>(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('ERR: on auth.ts', error);
    return null;
  }
}

export const isValidRole = (role: Role): role is 'ADMIN' | 'USER' => {
  return role === Role.ADMIN || role === Role.USER;
};
