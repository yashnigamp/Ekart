const express = require('express');
const router = require('./Router/routing');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use('/',router);
app.use(express.static(__dirname + '/Assets/Images'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
