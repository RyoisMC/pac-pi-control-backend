const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;
app.use(cors());
const mountRoutes = require('./routes');
app.use(express.json())
mountRoutes(app);

app.listen(port, () => {
  console.log(`PAC Pi Control app listening at http://localhost:${port}`);
})