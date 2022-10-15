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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const results = yield conn.query(sql);
                conn.release();
                return results.rows;
            }
            catch (err) {
                throw new Error(`could not retrieve products ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO products(name , price)
                          VALUES($1, $2) RETURNING *`;
                const results = yield conn.query(sql, [product.name, product.price]);
                conn.release();
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create new product ${error.message}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, name, price FROM products';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve all the products ${error.message}`);
            }
        });
    }
    getItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT id, name, price FROM products 
      WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                console.log(error);
                throw new Error(`Could not find user ${id}, ${error.message}`);
            }
        });
    }
    updateItem(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE products 
                  SET name=$2,price=$3
                  WHERE id=$1
                  RETURNING id, name , price`;
                const result = yield conn.query(sql, [
                    product.id, product.name, product.price,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update user, ${error.message}`);
            }
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM products 
                   WHERE id=($1) 
                   RETURNING id, name,price 
                   `;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete user ${id}, ${error.message}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
exports.default = ProductStore;
