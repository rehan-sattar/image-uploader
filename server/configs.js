const mongoose = require('mongoose');

// Load env configuration
const loadEnvironmentVariables = () => {
  if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config({ path: './development.env' });
  } else if (process.env.NODE_ENV === 'prod') {
    require('dotenv').config({ path: './prod.env' });
  }
};

const establishDatabaseConnection = () => {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('Database URL not found.');
    console.error(`
      STEPS TO SOLVE THIS PROBLEM:
      1. Make sure to have an environment variable file.
      2. Add a key DATABASE_URL=[URL_HERE]
      3. Restart the server
  `);
    return Promise.reject();
  }
  const connectionOptions = {};
  return mongoose.connect(DATABASE_URL, connectionOptions);
};

module.exports = {
  loadEnvironmentVariables,
  establishDatabaseConnection,
};
