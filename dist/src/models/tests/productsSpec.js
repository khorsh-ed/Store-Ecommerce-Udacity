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
const product_1 = __importDefault(require("../product"));
const productStore = new product_1.default();
const product = {
    name: 'apple',
    price: 12
};
let addedProduct;
describe('Testing Product Store', () => {
    it('Creation method should be defined', () => {
        expect(productStore.create).toBeDefined();
    });
    it('Testing Creation method', () => __awaiter(void 0, void 0, void 0, function* () {
        addedProduct = yield productStore.create(product);
        expect(product.name).toEqual(addedProduct.name);
        expect(product.price).toEqual(addedProduct.price);
    }));
    it('Get method should be defined', () => {
        expect(productStore.getItem).toBeDefined();
    });
    it('Get Item for exisiting item should not be null', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productStore.getItem(addedProduct.id);
        expect(product.id).toEqual(addedProduct.id);
    }));
    it('Get All method should be defined', () => {
        expect(productStore.getAll).toBeDefined();
    });
    it('Testing get all method', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield productStore.getAll();
        expect(products.slice(-1)[0].id).toEqual(addedProduct.id);
    }));
    it('Update method should be defined', () => {
        expect(productStore.updateItem).toBeDefined();
    });
    it('Testing the update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield productStore.updateItem(Object.assign(Object.assign({}, addedProduct), { name: 'kometra' }));
        expect(updatedUser.name).toBe('kometra');
    }));
    it('Deletion method should be defined', () => {
        expect(productStore.deleteItem).toBeDefined();
    });
    it('Testing the delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProduct = yield productStore.deleteItem(addedProduct.id);
        expect(deletedProduct.id).toEqual(addedProduct.id);
    }));
});
