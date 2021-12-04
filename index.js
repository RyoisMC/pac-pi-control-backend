const express = require('express');
const app = express();
const cors = require('cors');
const nocache = require('nocache');
const port = 3000;
const mountRoutes = require('./routes');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Allow-Headers', '*');
	next();
});
app.use(cors());
app.use(nocache());
app.set('etag', false);
app.use(express.json());
mountRoutes(app);

app.listen(port, () => {
  console.log(`PAC Pi Control app listening at http://localhost:${port}`);
})