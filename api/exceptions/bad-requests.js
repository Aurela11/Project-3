const { HttpException, ErrorCode } = require("./root");

class BadRequestsException extends HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, null);
    }
}
module.exports = { BadRequestsException };