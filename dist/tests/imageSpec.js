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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing the images endpoint', () => {
    it('Calling images endpoint without name paramater should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images').expect(400);
    }));
    it('Calling images endpoint without width paramater should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord').expect(400);
    }));
    it('Calling images endpoint without height paramater should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=300').expect(400);
    }));
    it('Calling images endpoint without providing height paramaters with correct value should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=300&height=30-').expect(400);
    }));
    it('Calling images endpoint without providing width paramaters with correct value should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjrd&width=30-0&height=30').expect(400);
    }));
    it('Calling images endpoint with width paramaters bigger than 999 should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=999999&height=30').expect(400);
    }));
    it('Calling images endpoint with width paramaters smaller than 1 should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=0&height=30').expect(400);
    }));
    it('Calling images endpoint with height paramaters bigger than 999 should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=99&height=9990').expect(400);
    }));
    it('Calling images endpoint with height paramaters smaller than 1 should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=99&height=0').expect(400);
    }));
    it('Calling images endpoint without providing existing name should returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=jushdsrd&width=300&height=300').expect(404);
    }));
    it('Calling images endpoint with correct paramater values should returns 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?name=fjord&width=300&height=300').expect(200);
    }));
});
