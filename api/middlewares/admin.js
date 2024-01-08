const { UnauthorizedException } = require("../exceptions/unauthorized");
const { ErrorCode } = require("../exceptions/root");

const adminMiddleware = async (req, res, next) => {
    const user = req.user;
    if (user.role === 'ADMIN') {
        next();
    } else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
};

module.exports = adminMiddleware;
