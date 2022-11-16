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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const store = new user_1.User();
describe('user auth', () => __awaiter(void 0, void 0, void 0, function* () {
    it('should authenticate user login', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authenticate('test', 'test', 'test');
        expect(result).toEqual(jasmine.anything());
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            firstname: 'test2',
            lastname: 'test',
            password: 'test',
        });
        expect(result).toEqual(jasmine.anything());
    }));
    it('should display all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual(jasmine.anything());
    }));
}));
const request = (0, supertest_1.default)(index_1.default);
describe('testing user endpoints', () => {
    it('should return 200 on using /register', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/register')
            .set('Content-type', 'application/json')
            .send({ firstname: 'test2', lastname: 'test', password: 'test' });
        expect(response.status).toBe(200);
    }));
    it('should return 200 on using /login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/login')
            .set('Content-type', 'application/json')
            .send({ firstname: 'test2', lastname: 'test', password: 'test' });
        expect(response.status).toBe(200);
    }));
    it('should return 200 on using /users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc');
        expect(response.status).toBe(200);
    }));
    it('should return 200 on using //users/get/1', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users/get?id=1')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc');
        expect(response.status).toBe(200);
    }));
});
