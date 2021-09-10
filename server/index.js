const configs = require('./configs');
const express = require('express');
const path = require('path');
const cors = require('cors');

configs.loadEnvironmentVariables();

const imageUploadRouter = require('./modules/image-upload/router');

const app = express();
const port = 8080 || process.env.PORT;
const API_VERSION = 1;
const UPLOAD_DIRECTORY_PATH = path.join('.', 'uploads');
const ONE_YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(
  '/uploads',
  express.static(UPLOAD_DIRECTORY_PATH, { maxAge: ONE_YEAR_IN_MILLISECONDS })
);

// router
app.use(`/api/${API_VERSION}/image-upload`, imageUploadRouter);

app.listen(port, () => {
  console.log('SERVER STARTED AT PORT: ' + port);
  // Open the database connection
  configs
    .establishDatabaseConnection()
    .then(() => {
      console.log('Database connection established.');
    })
    .catch(err => {
      console.log(err);
    });
});
