const express = require('express');
const router = require('./Router/routing');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
app.use('/',router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
