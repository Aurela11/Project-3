const { PrismaClient } = require("@prisma/client");
const { NotFoundException } = require("../exceptions/not-found");
const { ErrorCode } = require("../exceptions/root");
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    try {
        const product = await prisma.product.create({
            data: {
                ...req.body,
                tags: req.body.tags.join(',')
            }
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',');
        }
        const updatedProduct = await prisma.product.update({
            where: {
                id:parseInt(productId)
            },
            data: product
        });
        res.json(updatedProduct);
    } catch (err) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }
};
 const deleteProduct = async(req, res) =>{
  //Assigment  
 }
 const listProduct = async (req, res) => {
    try {
      const count = await prisma.product.count();
      const products = await prisma.product.findMany({
        skip: +req.query.skip || 0,
        take: 5
      });
  
      res.json({
        count,
        data: products
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
 const getProductById = async(req, res) =>{
    try{
        const {productId} = req.params;
        const product = await prisma.product.findFirstOrThrow({
            where:{
                id:parseInt(productId)
            }
        })
        res.json(product);
    }catch (err) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }
 }

 const searchProducts = async(req, res) =>{
 const products = await prisma.product.findMany({
    where:{
       name: {
        search:req.query.q.toString(), 
       },
       description: {
        search:req.query.q.toString(), 
       },
       tags: {
        search:req.query.q.toString(), 
       }
    }
 }) 
 res.json(products)  
 }


module.exports = { createProduct,
                   updateProduct,
                   deleteProduct,
                   listProduct,
                   getProductById,
                   searchProducts
};
