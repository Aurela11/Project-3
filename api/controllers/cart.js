const { PrismaClient } = require("@prisma/client");
const { NotFoundException } = require("../exceptions/not-found");
const { ErrorCode } = require("../exceptions/root");
const { CreateCartSchema, ChangeQuantitySchema } = require("../schema/cart");
const prisma = new PrismaClient();

const addItemToCart = async (req, res) => {
    
        const validatedData = CreateCartSchema.parse(req.body);
        let product;

        try {
            product = await prisma.product.findFirstOrThrow({
                where: {
                    id: validatedData.productId
                }
            });
        } catch (err) {
            throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
        }

        const cart = await prisma.cartItem.create({
            data: {
                userId: req.user.id,
                productId: product.id,
                quantity: validatedData.quantity
            }
        });

        res.json(cart); 
    
};
  
  const deleteItemFromCart = async (req, res) => {
   await prisma.cartItem.delete({
    where:{
        id: +req.params.id
    }
   })
   res.json("Cart deleted successfully")
  };
  
  const changeQuantity = async (req, res) => {
    const validatedData = ChangeQuantitySchema.parse(req.body)
    const updatedCart = await prisma.cartItem.update({
        where:{
            id: +req.params.id
        },
        data:{
            quantity:validatedData.quantity
        }
    })
    res.json(updatedCart)
  };
  
  const getCart = async (req, res) => {
   const cart = await prisma.cartItem.findMany({
    where:{
        userId: req.user.id
    },
    include:{
        product:true
    }
   })
   res.json(cart)
  };
  
  module.exports = {
    addItemToCart,
    deleteItemFromCart,
    changeQuantity,
    getCart
  };
  