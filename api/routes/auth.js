const express = require('express');
const { signup, login, me } = require('../controllers/auth');
const { errorHandler } = require('../types/error-handler');
const authRoutes = express.Router();
const authMiddleware = require('../middlewares/auth')

// Assuming 'login' is your login handler function
authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me',[authMiddleware], errorHandler(me));

module.exports = authRoutes;
