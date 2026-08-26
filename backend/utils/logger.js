const fs = require('fs');
const path = require('path');

// Simple logging utility
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/app.log'), { flags: 'a' });

const logger = {
  info: (message) => {
    const log = `[INFO] ${new Date().toISOString()} - ${message}`;
    console.log(log);
    logStream.write(log + '\n');
  },
  error: (message) => {
    const log = `[ERROR] ${new Date().toISOString()} - ${message}`;
    console.error(log);
    logStream.write(log + '\n');
  },
  warn: (message) => {
    const log = `[WARN] ${new Date().toISOString()} - ${message}`;
    console.warn(log);
    logStream.write(log + '\n');
  },
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      const log = `[DEBUG] ${new Date().toISOString()} - ${message}`;
      console.debug(log);
      logStream.write(log + '\n');
    }
  },
};

module.exports = logger;