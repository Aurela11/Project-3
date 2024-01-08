const { Router } = require('express');
const { errorHandler } = require('../types/error-handler');
const authMiddleware = require('../middlewares/auth');
const {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart
} = require('../controllers/cart');

const cartRoutes = Router();

cartRoutes.post('/', [authMiddleware], errorHandler(addItemToCart));
cartRoutes.get('/', [authMiddleware], errorHandler(getCart));
cartRoutes.delete('/:id', [authMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.put('/:id', [authMiddleware], errorHandler(changeQuantity));

module.exports = cartRoutes;
