// Define ErrorCode object
const ErrorCode = {
    USER_NOT_FOUND: 1001,
    USER_ALREADY_EXISTS: 1002,
    INCORRECT_PASSWORD: 1003,
    ADDRESS_NOT_FOUND:1004,
    ADDRESS_DOES_NOT_BELONG:1005,
    UNPROCESSABLE_ENTITY:2001,
    INTERNAL_EXCEPTION: 3001,
    UNAUTHORIZED:4001,
    PRODUCT_NOT_FOUND:5001,
    ORDER_NOT_FOUND : 6001,
};

// Define HttpException class
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

module.exports = { HttpException, ErrorCode };
