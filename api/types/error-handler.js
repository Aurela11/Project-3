const { ZodError } = require("zod");
const { InternalException } = require("../exceptions/internal-exception");
const { ErrorCode, HttpException } = require("../exceptions/root");
const {BadRequestsException} = require('../exceptions/bad-requests')

const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await  method  (req, res, next);
        } catch (error) {
            let exception;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                  if(error instanceof ZodError){
                    exception = new BadRequestsException('Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY, error)
                  }else{
                    exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
                  }

               
            }
            next(exception);
        }
    };
};

module.exports = { errorHandler };
