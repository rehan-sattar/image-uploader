const express = require('express');
const cors = require('cors');
const imageUploadRouter = require('./modules/image-upload/router');

const app = express();
const port = 8080 || process.env.PORT;
const API_VERSION = 1;

// router
app.use(`/api/${API_VERSION}/image-upload`, imageUploadRouter);

app.listen(port, () => {
  console.log('SERVER STARTED AT PORT: ' + port);
});
