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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const hash_1 = __importDefault(require("../utility/hash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const configuration_1 = __importDefault(require("../../configuration"));
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const results = yield conn.query(sql);
                conn.release();
                return results.rows;
            }
            catch (err) {
                throw new Error(`app listening on port ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const hashedPassword = (0, hash_1.default)(user);
                const sql = `INSERT INTO users(email , password , first_name , last_name)
                          VALUES($1, $2 , $3 , $4) RETURNING *`;
                const results = yield conn.query(sql, [user.email, hashedPassword, user.first_name, user.last_name]);
                conn.release();
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create new user ${error.message}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, first_name, last_name, email FROM users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve all the users ${error.message}`);
            }
        });
    }
    getItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT id, email, first_name, last_name FROM users 
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
    updateItem(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE users 
                  SET email=$2,first_name=$3, last_name=$4, password=$5
                  WHERE id=$1
                  RETURNING id, email, first_name, last_name`;
                const result = yield conn.query(sql, [
                    user.id, user.email, user.first_name, user.last_name, user.password,
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
                const sql = `DELETE FROM users 
                   WHERE id=($1) 
                   RETURNING id, email, 
                   first_name, last_name`;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete user ${id}, ${error.message}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT password FROM users
                   WHERE email=($1)`;
                const result = yield conn.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    if (bcrypt_1.default.compareSync(`${password}${configuration_1.default.pepper}`, hashPassword)) {
                        const user = yield conn.query('SELECT id, email, first_name, last_name FROM users WHERE email=($1)', [email]);
                        return user.rows[0];
                    }
                }
                conn.release();
                return null;
            }
            catch (error) {
                throw new Error(`Could not login: ${error.message}`);
            }
        });
    }
}
exports.UserStore = UserStore;
exports.default = UserStore;
