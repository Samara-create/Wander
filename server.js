const http = require('http');
const dotenv = require('dotenv');
const app = require('./config/app');
const { connectDB } = require('./config/database');
const { initializeSocket } = require('./config/socket');

dotenv.config();
connectDB();

const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));