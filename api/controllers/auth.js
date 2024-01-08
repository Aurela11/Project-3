const {PrismaClient}= require('@prisma/client');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../secret');
const{ BadRequestsException} = require ('../exceptions/bad-requests')
const {ErrorCode} = require ('../exceptions/root');
const { UnprocessableEntity } = require('../exceptions/validation');
const {SignUpSchema} = require('../schema/users');
const { NotFoundException } = require('../exceptions/not-found');

const prisma = new PrismaClient();

const signup = async (req, res, next) => {
   
    const parsedData = SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
        new BadRequestsException('User already exists!', ErrorCode.USER_ALREADY_EXISTS);

    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });

    res.json(newUser);
};
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
        
    if (!user) {
       throw new NotFoundException('User not found' , ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(password, user.password)) {
     throw  new BadRequestsException('Incorrect password', ErrorCode.INCORRECT_PASSWORD);

    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
    
    res.json({ user, token });  
};

// me  -> return the logged in user

const me = async (req, res) => {
    res.json(req.user);
};



module.exports = { signup,
                   login,
                   me 

 };
