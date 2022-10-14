"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configuration_1 = __importDefault(require("../../../configuration"));
const handleUnauthorizedUser = (response) => {
    response
        .status(400)
        .send('<h2> Login again please <h2>');
};
const AuthenticateMiddleware = (request, response, next) => {
    try {
        const authorizationHeader = request.get('Authorization');
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            if (token) {
                const decode = jsonwebtoken_1.default.verify(token, configuration_1.default.token);
                if (decode) {
                    next();
                }
                else {
                    handleUnauthorizedUser(response);
                }
            }
            else {
                handleUnauthorizedUser(response);
            }
        }
        else {
            handleUnauthorizedUser(response);
        }
    }
    catch (error) {
        handleUnauthorizedUser(response);
    }
};
exports.default = AuthenticateMiddleware;
