
const { NotFoundException } = require('../exceptions/not-found');
const { ErrorCode } = require('../exceptions/root');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
      // 1. to create a transaction
    // 2. to list all the cart items and proceed if cart is not empty
    // 3. calculate the total amount
    // 4. fetch address of user 
    // 5. to define computed field for formatted address on address module
    // 6. we will create a order and order productsorder products 
    // 7. create event
    // 8. to empty the cart
    const { defaultShippingAddress } = req.params;
        const user = req.body;
        
  return await prisma.$transaction(async(tx) =>{
    const cartItems = await tx.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include:{
            product:true
        }
    })
 
    if(cartItems.length == 0){
       return res.json({message:"Cart is empty"}) 
    }
    const price = cartItems.reduce((prev, current) => {
        return prev + (current.quantity * +current.product.price)
    },0);

    const address = await tx.address.create({
       
       
        where:{
            
             id:req.user.defaultShippingAddress
        }
        
    })
   
    const order = await tx.order.create({
       data:{
        userId: req.user.id,
        netAmount:price,
        address:address.formattedAddress,
        products:{
            create:cartItems.map((cart) => {
                return {
                 productId:cart.productId,
                 quantity: cart.quantity
                }
            })
        }
       } 
    })
    const  orderEvent = await tx.orderEvent.create({
      data:{
        orderId:order.id,
      }  
    })
    await tx.cartItem.deleteMany({
        where:{
            userId:req.user.id
        }
    })
    return res.json(order);
  })
   
}


const listOrders = async (req, res) => {
    const orders = await prismaCilent.order.findMany({
        where: {
            userId: req.user.id
        }
    });
    res.json(orders);
};

const cancelOrder = async (req, res) => {
    try {
        const order = await prisma.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: 'CANCELLED'
            }
        });
        await prismaCilent.orderEvent.create({
            data: {
                orderId: order.id,
                status: "CANCELLED"
            }
        });
        res.json(order);
    } catch (err) {
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND);
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await prisma.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                products: true,
                events: true
            }
        });
        res.json(order);
    } catch (err) {
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND);
    }
};

const listAllOrders = async (req, res) => {
    let whereClause = {};
    const status = req.query.status;
    if (status) {
        whereClause = {
            status
        };
    }
    const orders = await prisma.order.findMany({
        where: whereClause,
        skip: +req.query.skip || 0,
        take: 5
    });
    res.json(orders);
};

const changeStatus = async (req, res) => {
    try {
        const order = await prismaCilent.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: req.body.status
            }
        });
        await prisma.orderEvent.create({
            data: {
                orderId: order.id,
                status: req.body.status
            }
        });
        res.json(order);
    } catch (err) {
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND);
    }
};

const listUserOrders = async (req, res) => {
    let whereClause = {
        userId: +req.params.id
    };
    const status = req.params.status;
    if (status) {
        whereClause = {
            ...whereClause,
            status
        };
    }
    const orders = await prisma.order.findMany({
        where: whereClause,
        skip: +req.query.skip || 0,
        take: 5
    });
    res.json(orders);
};

module.exports = {
    createOrder,
    listOrders,
    cancelOrder,
    getOrderById,
    listAllOrders,
    changeStatus,
    listUserOrders
};
