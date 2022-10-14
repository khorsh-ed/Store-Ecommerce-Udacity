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
exports.deleteItem = exports.updateItem = exports.getItem = exports.getAll = exports.create = void 0;
const order_1 = __importDefault(require("../models/order"));
const orderStore = new order_1.default();
const create = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield orderStore.create(request.body);
        response.json({
            status: 'success',
            data: Object.assign({}, product),
            message: 'a product has been created!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getAll = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderStore.getAll();
        response.json({
            status: 'success',
            data: Object.assign({}, orders),
            message: 'orders have been retrieved!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const getItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderStore.getOne(+request.params.id);
        response.json({
            status: 'success',
            data: Object.assign({}, order),
            message: 'order has been retrieved',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getItem = getItem;
const updateItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield orderStore.updateOne(request.body);
        response.json({
            status: 'success',
            data: product,
            message: 'Order has been updated!',
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateItem = updateItem;
const deleteItem = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderStore.deleteOne(+request.params.id);
        response.json({
            status: 'success',
            data: Object.assign({}, order),
            message: 'Order has been deleted!',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteItem = deleteItem;
