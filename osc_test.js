const { Client } = require('node-osc');
const client = new Client('10.0.20.35', 10023);

client.send('/config/routing/IN/1-8', 4, (err) => {
  if (err) console.error(err);
  client.close();
});