const { Router } = require("express");
const { errorHandler } = require("../types/error-handler");
const { createProduct, updateProduct, deleteProduct, listProduct, getProductById, searchProducts } = require("../controllers/products");
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require("../middlewares/admin");

const productsRoutes = Router();

productsRoutes.post('/',[authMiddleware, adminMiddleware], errorHandler(createProduct));
productsRoutes.put('/:productId',[authMiddleware, adminMiddleware], errorHandler(updateProduct));
productsRoutes.delete('/:id',[authMiddleware, adminMiddleware], errorHandler(deleteProduct));
productsRoutes.get('/',[authMiddleware, adminMiddleware], errorHandler(listProduct));
productsRoutes.get('/:productId',[authMiddleware, adminMiddleware], errorHandler(getProductById));
productsRoutes.get('/search',[authMiddleware], errorHandler(searchProducts));
module.exports = productsRoutes;
