"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.deleteItem = exports.updateItem = exports.getItem = exports.getAll = exports.create = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configuration_1 = __importDefault(require("../../configuration"));
const userStore = new user_1.default();
const create = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.create(request.body);
        const token = jsonwebtoken_1.default.sign({ user }, configuration_1.default.token);
        response.json({
            status: 'success',
            data: Object.assign({}, user),
            token: token,
            message: 'a user has been created!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getAll = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userStore.getAll();
        response.json({
            status: 'success',
            data: Object.assign({}, users),
            message: 'user has been retrieved!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const getItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.getItem(+request.params.id);
        console.log(user);
        response.json({
            status: 'success',
            data: Object.assign({}, user),
            message: 'User has been retrieved',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getItem = getItem;
const updateItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.updateItem(request.body);
        response.json({
            status: 'success',
            data: user,
            message: 'User has been updated!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateItem = updateItem;
const deleteItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.deleteItem(+request.params.id);
        response.json({
            status: 'success',
            data: Object.assign({}, user),
            message: 'User has been deleted!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteItem = deleteItem;
const authenticate = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield userStore.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, configuration_1.default.token);
        if (!user) {
            return response.status(401).json({
                status: 'error',
                message: 'the username and password are not matching',
            });
        }
        return response.json({
            status: 'success',
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'Logged in successfully',
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.authenticate = authenticate;
