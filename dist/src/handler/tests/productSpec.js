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
describe('Testing Prouct EndPoint', () => {
    const product = {
        name: 'apple',
        price: 12
    };
    const user = {
        email: 'ahmam@google.com',
        password: 'pass',
        first_name: 'abdallah',
        last_name: 'abdelkader'
    };
    let productId;
    let userApi = '/api/users';
    let Api = '/api/products';
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${userApi}/`)
            .send(user)
            .expect(200)
            .then((res) => {
            token = JSON.parse(res.text).token;
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const Usersql = 'DELETE FROM users;';
        yield connection.query(Usersql);
        connection.release();
    }));
    it('Testing the create endpoint with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${Api}/`)
            .send(Object.assign({}, product))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
            productId = JSON.parse(res.text).data.id;
        });
    }));
    it('Testing the create endpoint with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`${Api}/`)
            .send(Object.assign({}, product))
            .set('Authorization', `Bearer kjlhskjshks`)
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
    it('Testing the get item endpoint with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`${Api}/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    }));
    it('Testing the update endpoint with an invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .patch(`${Api}`)
            .set('Authorization', 'Bearer hesddkhgdkjhgyIamafaketoken')
            .send(Object.assign(Object.assign({}, product), { name: 'Ahmed Mohamed' }))
            .expect(401);
    }));
    it('Testing the update endpoint with a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .patch(`${Api}`)
            .set('Authorization', `Bearer ${token}`)
            .send(Object.assign(Object.assign({}, product), { name: 'Ahmed Hamdy' }))
            .expect(200);
    }));
    it('Testing the delete endpoint with valid token ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`${Api}/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ id: productId })
            .expect(200);
    }));
});
