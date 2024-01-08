const { Router } = require('express');
const authRoutes = require('./auth');
const productsRoutes = require ('./products')
const usersRoutes = require('./users');
const cartRoutes = require('./cart');
const orderRoutes = require('./orders');


const rootRouter = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
rootRouter.use('/users', usersRoutes)
rootRouter.use('/carts', cartRoutes)
rootRouter.use('/orders', orderRoutes)

module.exports = rootRouter;
