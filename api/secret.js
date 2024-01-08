require('dotenv').config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = { PORT, JWT_SECRET_KEY };


