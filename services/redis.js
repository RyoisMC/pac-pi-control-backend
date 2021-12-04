const redis = require('redis').createClient();
redis.on('connect', function() {
    console.log('Redis server online.');
});
redis.on('error', (err) => console.log('[REDIS ERROR]: ', err));
redis.connect();
module.exports = redis;