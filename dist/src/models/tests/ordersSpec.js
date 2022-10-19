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
const database_1 = __importDefault(require("../../database"));
const order_1 = __importDefault(require("../order"));
const user_1 = __importDefault(require("../user"));
const product_1 = __importDefault(require("../product"));
const orderStore = new order_1.default();
const userStore = new user_1.default();
const productStore = new product_1.default();
const user = {
    email: 'abdullah1@google.com',
    password: 'password123',
    first_name: 'abdallah',
    last_name: 'abdelkader'
};
const order = {
    status: 'inprogress',
};
const product = {
    name: 'apple',
    price: 12
};
let addedOrder;
let addedUser;
let addedProduct;
let addedOrderProduct;
describe('Testing Order Store', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // added user
            const createdUser = yield userStore.create(user);
            user.id = createdUser.id;
            order.user_id = user.id;
            // added product
            const createdProduct = yield productStore.create(product);
            product.id = createdProduct.id;
        }
        catch (err) {
            console.log(err);
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const orderProductSql = 'DELETE FROM order_products;';
        yield connection.query(orderProductSql);
        const Ordersql = 'DELETE FROM orders;';
        yield connection.query(Ordersql);
        const Usersql = 'DELETE FROM users;';
        yield connection.query(Usersql);
        const Productsql = 'DELETE FROM products;';
        yield connection.query(Productsql);
        connection.release();
    }));
    it('Order method should be defined', () => {
        expect(orderStore.create).toBeDefined();
    });
    it('Testing Creation method', () => __awaiter(void 0, void 0, void 0, function* () {
        addedOrder = yield orderStore.create(order);
        expect(order.status).toEqual(addedOrder.status);
    }));
    it('Get method should be defined', () => {
        expect(orderStore.getItem).toBeDefined();
    });
    it('Get Item for exisiting item should not be null', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield orderStore.getItem(addedOrder.id);
        expect(order.id).toEqual(addedOrder.id);
    }));
    it('Get All method should be defined', () => {
        expect(orderStore.getAll).toBeDefined();
    });
    it('Testing get all method', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield orderStore.getAll();
        expect(orders.slice(-1)[0].id).toEqual(addedOrder.id);
    }));
    it('Update method should be defined', () => {
        expect(orderStore.updateItem).toBeDefined();
    });
    it('Testing the update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedOrder = yield orderStore.updateItem(Object.assign(Object.assign({}, addedOrder), { status: 'in prog' }));
        expect(updatedOrder.status).toBe('in prog');
    }));
    it('add product method should be defined', () => {
        expect(orderStore.addProduct).toBeDefined();
    });
    it('Testing the add product method', () => __awaiter(void 0, void 0, void 0, function* () {
        addedOrderProduct = yield orderStore.addProduct(20, addedOrder.id, product.id);
        expect(+addedOrderProduct.order_id).toEqual(+addedOrder.id);
        expect(+addedOrderProduct.product_id).toEqual(+product.id);
    }));
    it('Deletion method should be defined', () => {
        expect(orderStore.deleteItem).toBeDefined();
    });
    it('Testing the delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        addedOrderProduct = yield orderStore.addProduct(20, addedOrder.id, product.id);
        const deletedOrder = yield orderStore.deleteItem(addedOrder.id);
        expect(deletedOrder.id).toEqual(addedOrder.id);
    }));
});
