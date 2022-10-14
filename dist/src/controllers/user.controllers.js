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
exports.authenticate = exports.deleteOne = exports.updateOne = exports.getOne = exports.getAll = exports.create = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configuration_1 = __importDefault(require("../../configuration"));
const userStore = new user_1.default();
const create = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(request.body);
        const user = yield userStore.create(request.body);
        response.json({
            status: 'success',
            data: Object.assign({}, user),
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
const getOne = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.getOne(+request.params.id);
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
exports.getOne = getOne;
const updateOne = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(request.body);
        const user = yield userStore.updateOne(request.body);
        response.json({
            status: 'success',
            data: user,
            message: 'User has been updated!',
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateOne = updateOne;
const deleteOne = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.deleteOne(+request.params.id);
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
exports.deleteOne = deleteOne;
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
