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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const results = yield conn.query(sql);
                conn.release();
                return results.rows;
            }
            catch (err) {
                throw new Error(`could not retrieve orders ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO orders(status , user_id)
                          VALUES($1, $2) RETURNING *`;
                const results = yield conn.query(sql, [order.status, order.user_id]);
                conn.release();
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create new order ${error.message}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve all the orders ${error.message}`);
            }
        });
    }
    getItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders 
      WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                console.log(error);
                throw new Error(`Could not find order ${id}, ${error.message}`);
            }
        });
    }
    updateItem(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE orders 
                  SET status=$2
                  WHERE id=$1
                  RETURNING *`;
                const result = yield conn.query(sql, [
                    order.id, order.status,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update order, ${error.message}`);
            }
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM orders 
                   WHERE id=($1) 
                   RETURNING *
                   `;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete order ${id}, ${error.message}`);
            }
        });
    }
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO order_products(quantity , order_id , product_id) VALUES ($1,$2,$3) RETURNING *`;
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add product ${productId}, ${error.message}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
exports.default = OrderStore;
