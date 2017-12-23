class BaseHTTPError extends Error {
    constructor(msg, OPCode, httpCode, httpMsg) {
        super(msg)
        this.OPCode = OPCode 
        this.httpCode = httpCode
        this.httpMsg = httpMsg
        this.name = 'BaseHTTPError'
    }
    static get['DEFAULT_OPCODE'] () {
        return 1000000
    } 
}

class InternalError extends BaseHTTPError {
    constructor(msg) {
        const OPCode = 1000001
        const httpMsg = '服务器开小差了'
        super(msg, OPCode, 500, httpMsg)
    }
}

class ValidationError extends BaseHTTPError {
    constructor(path, reason) {
        const OPCode = 2000000
        const httpCode = 400
        super(`error validation param, path: ${path}, reason: ${reason}`, OPCode, httpCode, '参数错误，请检查后再重试~')
        this.name = 'validationError'
    }
}

class DuplicatedUserNameError extends ValidationError {
    constructor (username) {
        super(`username`, 'duplicate user name: ${username}')
        this.httpMsg = '这个昵称已被占用'
        this.OPCode = 2000001
    }
}

module.exports = {
    BaseHTTPError,
    ValidationError,
    DuplicatedUserNameError,
    InternalError,
}