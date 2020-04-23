import pem from 'pem';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

function ensureOpenSsl() {
  if (os.platform() === 'win32') {
    pem.config({ pathOpenSSL: 'C:/Program Files/OpenSSL-Win64/bin/openssl.exe' });
  }
}

export function createSelfSignedCertificate(certPath, keyPath, password) {
  ensureOpenSsl();
  pem.createCertificate({ selfSigned: true, serviceKeyPassword: password, days: 365 }, (err, result) => {
    fs.writeFileSync(path.join(__dirname, certPath), result.certificate);
    fs.writeFileSync(path.join(__dirname, keyPath), result.serviceKey);
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
}

export function getSerializedCertificate(certPath) {
  const pfx = fs.readFileSync(path.join(__dirname, certPath));
  const pfxAsString = pfx.toString().replace(/(\r\n|\n|\r|-|BEGIN|END|CERTIFICATE|\s)/gm, '');
  return pfxAsString;
}

export function getPrivateKey(keyPath) {
  const privateKey = fs.readFileSync(path.join(__dirname, keyPath), 'utf8');
  return privateKey;
}

export function decryptSymetricKey(base64encodedKey, keyPath) {
  const asymetricPrivateKey = getPrivateKey(keyPath);
  const decodedKey = Buffer.from(base64encodedKey, 'base64');
  const decryptedSymetricKey = crypto.privateDecrypt(asymetricPrivateKey, decodedKey);
  return decryptedSymetricKey;
}

export function decryptPayload(base64encodedPayload, decryptedSymetricKey) {
  const iv = Buffer.alloc(16, 0);
  decryptedSymetricKey.copy(iv, 0, 0, 16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', decryptedSymetricKey, iv);
  let decryptedPayload = decipher.update(base64encodedPayload, 'base64', 'utf8');
  decryptedPayload += decipher.final('utf8');
  return decryptedPayload;
}
