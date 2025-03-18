const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const pubClient = createClient();
const subClient = pubClient.duplicate();

const setupRedisAdapter = (io) => {
    io.adapter(createAdapter(pubClient, subClient));
};

module.exports = setupRedisAdapter;
