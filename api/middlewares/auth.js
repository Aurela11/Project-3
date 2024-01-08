const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require("../exceptions/unauthorized");
const { ErrorCode } = require("../exceptions/root");
const { JWT_SECRET_KEY } = require("../secret");

const Prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
    // 1. Extract the token from the header
    const token = req.headers.authorization;

    // 2. If the token is not present, throw an error of unauthorized
    if (!token) {
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }

    try {
        // 3. If the token is present, verify the token and extract the payload
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        
        // 4. Get the user from the payload
        const user = await Prisma.user.findFirst({ where: { id: payload.userId } });
        
        if (!user) {
            return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
        }
        
        // 5. Attach the user to the current request object
        req.user = user;
        next();
    } catch (error) {
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
};

module.exports = authMiddleware;
