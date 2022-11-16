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
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class User {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pepper = process.env.BCRYPT_PASSWORD;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstname,lastname,password_digest) VALUES($1, $2,$3) RETURNING *';
                const hash = bcrypt_1.default.hashSync(u.password + pepper, process.env.saltRounds ? parseInt(process.env.saltRounds) : 10);
                const result = yield conn.query(sql, [u.firstname, u.lastname, hash]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable to create user`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'select firstname,lastname from users';
                const result = yield conn.query(sql);
                const user = result.rows;
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable get users`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'select firstname,lastname from users where id=($1)';
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                console.log(user);
                return user;
            }
            catch (err) {
                throw new Error(`unable get user with id ${id}`);
            }
        });
    }
    authenticate(firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pepper = process.env.BCRYPT_PASSWORD;
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password_digest FROM users WHERE firstname=($1) and lastname=($2)';
                const result = yield conn.query(sql, [firstname, lastname]);
                console.log(result.rows.length);
                console.log(password + pepper);
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    console.log(bcrypt_1.default.compareSync(password + pepper, user.password_digest));
                    if (bcrypt_1.default.compareSync(password + pepper, user.password_digest))
                        return user;
                }
                return null;
            }
            catch (err) {
                throw new Error(`unable to login`);
            }
        });
    }
}
exports.User = User;
