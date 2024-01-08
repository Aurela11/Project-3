const { Router } = require('express');
const { errorHandler } = require('../types/error-handler');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin')
const { addAddress, deleteAddress, listAddress, updateUser, changeUserRole, listUsers, getUserById } = require('../controllers/users');

const usersRoutes = Router();

usersRoutes.post('/address', [authMiddleware], errorHandler(addAddress));
usersRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get('/address', [authMiddleware], errorHandler(listAddress));
usersRoutes.put('/', [authMiddleware], errorHandler(updateUser));
usersRoutes.put('/:id/role', [authMiddleware, adminMiddleware], errorHandler(changeUserRole))
usersRoutes.get('/', [authMiddleware, adminMiddleware], errorHandler(listUsers))
usersRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getUserById))

module.exports = usersRoutes;
