const express = require('express');
const app = express();
const port = 3000;
const mountRoutes = require('./routes');
app.use(express.json())
mountRoutes(app);

app.listen(port, () => {
  console.log(`PAC Pi Control app listening at http://localhost:${port}`);
})