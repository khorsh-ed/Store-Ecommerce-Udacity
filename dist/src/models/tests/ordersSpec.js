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
const order_1 = __importDefault(require("../order"));
const orderStore = new order_1.default();
const order = {
    status: 'inprogress',
    user_id: 1
};
let addedOrder;
describe('Testing User Store', () => {
    it('Creation method should be defined', () => {
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
        const user = yield orderStore.getItem(addedOrder.id);
        expect(user.id).toEqual(addedOrder.id);
    }));
    it('Get All method should be defined', () => {
        expect(orderStore.getAll).toBeDefined();
    });
    it('Testing get all method', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield orderStore.getAll();
        expect(users.slice(-1)[0].id).toEqual(addedOrder.id);
    }));
    it('Update method should be defined', () => {
        expect(orderStore.updateItem).toBeDefined();
    });
    it('Testing the update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield orderStore.updateItem(Object.assign(Object.assign({}, addedOrder), { status: 'in prog' }));
        expect(updatedUser.status).toBe('in prog');
    }));
    it('Deletion method should be defined', () => {
        expect(orderStore.deleteItem).toBeDefined();
    });
    it('Testing the delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield orderStore.deleteItem(addedOrder.id);
        expect(deletedUser.id).toEqual(addedOrder.id);
    }));
});
