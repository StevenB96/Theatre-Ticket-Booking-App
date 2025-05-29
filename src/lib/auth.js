import bcryptjs from 'bcryptjs';

const saltRounds = 10;

export async function hashPassword(password) {
  return await bcryptjs.hash(password, saltRounds);
}

export async function verifyPassword(password, hash) {
  return await bcryptjs.compare(password, hash);
}