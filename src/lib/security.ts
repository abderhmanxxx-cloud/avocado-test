import crypto from "crypto";
import sanitizeHtml from "sanitize-html";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await crypto.randomBytes(16).toString("hex");
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      else resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(":");
  
  return new Promise((resolve) => {
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) resolve(false);
      else resolve(derivedKey.toString("hex") === key);
    });
  });
}

export function generateReferralCode(): string {
  return crypto.randomBytes(6).toString("hex").toUpperCase();
}

export function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function verifyHMAC(payload: string, secret: string): boolean {
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(process.env.WEBHOOK_SECRET || "")
  );
}

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}
