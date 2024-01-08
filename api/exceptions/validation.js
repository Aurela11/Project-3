const { HttpException } = require("./root");

class UnprocessableEntity extends HttpException {
    constructor(error, message, errorCode) {
        super(message, errorCode, 422, error);
    }
}

module.exports = { UnprocessableEntity };
