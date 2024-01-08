const { PrismaClient } = require("@prisma/client");
const { AddressSchema, UpdateUserSchema } = require("../schema/users");
const { NotFoundException} = require("../exceptions/not-found");
const { ErrorCode } = require("../exceptions/root");
const { BadRequestsException } = require("../exceptions/bad-requests");

const prisma = new PrismaClient();

const addAddress = async (req, res) => {
  
  AddressSchema.parse(req.body)

  const address = await prisma.address.create({
      data:{
          ...req.body,
          userId: req.user.id
      }
  })
  res.json(address)
}


const deleteAddress = async (req, res) => {
  try {
    await prisma.address.delete({
      where: {
        id: +req.params.id
      }
    });
    res.json({ success: true });
  } catch (err) {
    throw new NotFoundException('Address not found.', ErrorCode.ADDRESS_NOT_FOUND)
  }
};

const listAddress = async (req, res) => {
  
    const addresses = await prisma.address.findMany({
      where: {
        userId: req.user.id
      }
    });
    res.json(addresses);
 
};

const updateUser = async (req, res) => {
  const validatedData = UpdateUserSchema.parse(req.body)
  let shippingAddress;
    let billingAddress;
    console.log(validatedData);

    if (validatedData.defaultShippingAddress) {
        try {
            shippingAddress = await prisma.address.findFirst({
                where: {
                    id: validatedData.defaultShippingAddress
                }
            });
        } catch (error) {
            throw new NotFoundException('Shipping address not found.', ErrorCode.ADDRESS_NOT_FOUND);
        }

        if (!shippingAddress || shippingAddress.userId !== req.user.id) {
            throw new BadRequestsException('Shipping address does not belong to user', ErrorCode.ADDRESS_DOES_NOT_BELONG);
        }
    }

    if (validatedData.defaultBillingAddress) {
        try {
            billingAddress = await prisma.address.findFirst({
                where: {
                    id: validatedData.defaultBillingAddress
                }
            });
        } catch (error) {
            throw new NotFoundException('Billing address not found.', ErrorCode.ADDRESS_NOT_FOUND);
        }

        if (!billingAddress || billingAddress.userId !== req.user.id) {
            throw new BadRequestsException('Billing address does not belong to user', ErrorCode.ADDRESS_DOES_NOT_BELONG);
        }
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: validatedData
    });

    res.json(updatedUser);
};
const listUsers = async(req, res) =>{
  const users = await prisma.user.findMany({
    skip: +req.query.skip || 0,
    take: 5
  })
  res.json(users)
}

const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where:{
        id:+req.params.id
      },
      include:{
        addresses:true
      }
    })
    res.json(user);
    
  } catch (err) {
    throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND)
  }
};
const changeUserRole = async(req, res) => {
  try {
    const user = await prisma.user.update({
      where:{
        id: +req.params.id
      },
      data:{
        role: req.body.role
      }
    })
    res.json(user);
    
  } catch (err) {
    throw new NotFoundException('User not found.', ErrorCode.USER_NOT_FOUND) 
  }
}

module.exports = {
  addAddress,
  deleteAddress,
  listAddress,
  updateUser,
  getUserById,
  changeUserRole,
  listUsers
};
