module.exports = {
  require: 'ts-node/register',
  extension: ['ts'],
  spec: 'tests/**/*.test.ts',
  timeout: 10000,
  exit: true
};