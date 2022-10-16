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
const user_1 = require("../user");
const database_1 = __importDefault(require("../../database"));
const userStore = new user_1.UserStore();
const user = {
    email: 'abdullah@google.com',
    password: 'pass',
    first_name: 'abdallah',
    last_name: 'abdelkader'
};
let addedUser;
describe('Testing User Store', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const Usersql = 'DELETE FROM users;';
        yield connection.query(Usersql);
        connection.release();
    }));
    it('Creation method should be defined', () => {
        expect(userStore.create).toBeDefined();
    });
    it('Testing Creation method', () => __awaiter(void 0, void 0, void 0, function* () {
        addedUser = yield userStore.create(user);
        expect(user.email).toEqual(addedUser.email);
        expect(user.first_name).toEqual(addedUser.first_name);
        expect(user.last_name).toEqual(addedUser.last_name);
    }));
    it('Get method should be defined', () => {
        expect(userStore.getItem).toBeDefined();
    });
    it('Get Item for exisiting item should not be null', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userStore.getItem(addedUser.id);
        expect(user.id).toEqual(addedUser.id);
    }));
    it('Get All method should be defined', () => {
        expect(userStore.getAll).toBeDefined();
    });
    it('Testing get all method', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userStore.getAll();
        expect(users.slice(-1)[0].id).toEqual(addedUser.id);
    }));
    it('Update method should be defined', () => {
        expect(userStore.updateItem).toBeDefined();
    });
    it('Testing the update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield userStore.updateItem(Object.assign(Object.assign({}, addedUser), { email: 'Hussam' }));
        expect(updatedUser.email).toBe('Hussam');
    }));
    it('Deletion method should be defined', () => {
        expect(userStore.deleteItem).toBeDefined();
    });
    it('Testing the delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield userStore.deleteItem(addedUser.id);
        expect(deletedUser.id).toEqual(addedUser.id);
    }));
});
