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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing Order EndPoint', () => {
    const order = {
        status: 'apple',
    };
    const user = {
        email: 'ahssmahjm',
        password: 'pass',
        first_name: 'abdallah',
        last_name: 'abdelkader'
    };
    const product = {
        name: 'apple',
        price: 12
    };
    let productId;
    let userApi = '/api/users';
    let productApi = '/api/products';
    let Api = '/api/orders';
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${userApi}/`)
            .send(user)
            .expect(200)
            .then((res) => {
            token = JSON.parse(res.text).token;
            order.user_id = JSON.parse(res.text).data.id;
        });
        yield request
            .post(`${productApi}/`)
            .send(Object.assign({}, product))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
            productId = JSON.parse(res.text).data.id;
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const usersql = 'DELETE FROM users;';
        yield connection.query(usersql);
        const ordersql = 'DELETE FROM orders;';
        yield connection.query(ordersql);
        const productsql = 'DELETE FROM products;';
        yield connection.query(productsql);
        connection.release();
    }));
    it('Testing the create endpoint with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${Api}/`)
            .send(Object.assign({}, order))
            .set('Authorization', `Bearer kjlhskjshks`)
            .expect(401);
    }));
    it('Testing the create endpoint with valid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${Api}`)
            .send(order)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
            order.id = JSON.parse(res.text).data.id;
        });
    }));
    it('Testing the get item endpoint with valid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`${Api}/${order.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    }));
    it('Testing the get item endpoint with invalid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`${Api}/${order.id}`)
            .set('Authorization', `Bearer kjdhgjdgdjgkdj`)
            .expect(401);
    }));
    it('Testing the getall endpoint with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`${Api}/`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    }));
    it('Testing the getall endpoint with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`${Api}/`)
            .set('Authorization', 'Bearer heyIamafaketokesdfn')
            .expect(401);
    }));
    it('Testing the update endpoint with an invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .patch(`${Api}`)
            .set('Authorization', 'Bearer hesddkhgdkjhgyIamafaketoken')
            .send(Object.assign(Object.assign({}, order), { status: 'Ahohamed' }))
            .expect(401);
    }));
    it('Testing the update endpoint with a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .patch(`${Api}`)
            .set('Authorization', `Bearer ${token}`)
            .send(Object.assign(Object.assign({}, order), { status: 'Ahmedy' }))
            .expect(200);
    }));
    it('Testing the delete endpoint with invalid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`${Api}/${order.id}`)
            .set('Authorization', `Bearer jhgskjgskjsgskj`)
            .expect(401);
    }));
    it('Testing the delete endpoint with valid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`${Api}/${order.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    }));
    it('Testing the add product endpoint with invalid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`${Api}/${order.id}`)
            .set('Authorization', `Bearer jhgskjgskjsgskj`)
            .send({
            productId: productId,
            quantity: 20
        })
            .expect(401);
    }));
    it('Testing the add product endpoint with valid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`${Api}/${order.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            productId: productId,
            quantity: 20
        })
            .expect(200);
    }));
});
