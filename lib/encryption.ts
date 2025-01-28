import CryptoJS from "crypto-js";
import { env } from "./env";

const ENCRYPTION_KEY = env.NEXT_PUBLIC_ENCRYPTION_KEY;

export function encryptString(value: string) {
  return CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
}

export function decryptString(value: string) {
  return CryptoJS.AES.decrypt(value, ENCRYPTION_KEY).toString(
    CryptoJS.enc.Utf8
  );
}

export function jumbleStrings(str1: string, str2: string) {
  const combined = str1 + str2;
  const length = combined.length;

  const indices = Array.from({ length }, (_, i) => i);

  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const jumbled = indices.map((i) => combined[i]).join("");

  const seed = indices.map((i) => i.toString(36).padStart(2, "0")).join("");

  return jumbled + "|" + str1.length.toString(36) + "|" + seed;
}

export function unjumbleStrings(jumbledStr: string) {
  const [jumbled, len1, seed] = jumbledStr.split("|");
  const length = jumbled.length;

  const indices = [];
  for (let i = 0; i < length; i++) {
    indices.push(parseInt(seed.substr(i * 2, 2), 36));
  }

  const unjumbled = new Array(length);

  for (let i = 0; i < length; i++) {
    unjumbled[indices[i]] = jumbled[i];
  }

  const str1Length = parseInt(len1, 36);
  const str1 = unjumbled.slice(0, str1Length).join("");
  const str2 = unjumbled.slice(str1Length).join("");

  return [str1, str2];
}
