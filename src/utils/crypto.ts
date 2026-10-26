/**
 * Zero-Trust Web Crypto API Engine
 * Implements genuine AES-GCM 256-bit encryption and SHA-256 integrity validation
 */

export interface EncryptionResult {
  ciphertextBase64: string;
  ivHex: string;
  sha256Hash: string;
}

export async function generateAesKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function exportKeyToHex(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('raw', key);
  const bytes = new Uint8Array(exported);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder();
  const buffer = await window.crypto.subtle.digest('SHA-256', enc.encode(text));
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function encryptData(plainText: string, key: CryptoKey): Promise<EncryptionResult> {
  const enc = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedData = enc.encode(plainText);

  const cipherBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encodedData
  );

  const cipherBytes = new Uint8Array(cipherBuffer);
  let binary = '';
  for (let i = 0; i < cipherBytes.byteLength; i++) {
    binary += String.fromCharCode(cipherBytes[i]);
  }
  const ciphertextBase64 = btoa(binary);

  const ivHex = Array.from(iv)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const sha256Hash = await sha256Hex(plainText);

  return {
    ciphertextBase64,
    ivHex,
    sha256Hash,
  };
}

export async function decryptData(
  ciphertextBase64: string,
  ivHex: string,
  key: CryptoKey
): Promise<string> {
  const binary = atob(ciphertextBase64);
  const cipherBytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    cipherBytes[i] = binary.charCodeAt(i);
  }

  const ivMatches = ivHex.match(/.{1,2}/g) || [];
  const iv = new Uint8Array(ivMatches.map(byte => parseInt(byte, 16)));

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    cipherBytes
  );

  const dec = new TextDecoder();
  return dec.decode(decryptedBuffer);
}
