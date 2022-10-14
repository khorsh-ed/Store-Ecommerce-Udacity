"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const configuration_1 = __importDefault(require("../../configuration"));
exports.default = (user) => {
    return bcrypt_1.default.hashSync(user.password + configuration_1.default.pepper, Number(configuration_1.default.salt));
};
