const express = require('express');
const app = express();
const cors = require('cors');
const nocache = require('nocache');
const port = 3000;
const mountRoutes = require('./routes');

app.use(cors());
app.use(nocache());
app.use(express.json())
mountRoutes(app);

app.listen(port, () => {
  console.log(`PAC Pi Control app listening at http://localhost:${port}`);
})