const bcryptjs = require('bcryptjs');
// const { hashPassword, verifyPassword } = require('./library/auth');

const saltRounds = 10;

async function hashPassword(password) {
  return await bcryptjs.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcryptjs.compare(password, hash);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
