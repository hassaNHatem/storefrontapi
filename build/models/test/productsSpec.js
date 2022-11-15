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
// import { weapon, MythicalWeaponStore } from '../product';
const product_1 = require("../product");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const user_1 = require("../user");
const user = new user_1.User();
const store = new product_1.productStore();
describe('product modal', () => {
    it('should have an index', () => {
        expect(store.index).toBeDefined();
    });
    it('index should return a list', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
    it('should have create method', () => {
        expect(store.create).toBeDefined();
    });
    it('creates a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: 'testproduct',
            price: 20,
        });
        expect(result).toEqual({
            id: 1,
            product_name: 'testproduct',
            price: '20',
        });
    }));
    it('has a show method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.show).toBeDefined();
    }));
    it('shows specific product with id', () => __awaiter(void 0, void 0, void 0, function* () {
        const proeduct = yield store.create({
            id: 1,
            name: 'testproduct',
            price: 20,
        });
        const result = yield store.show(1);
        expect(result).toEqual({
            id: 1,
            product_name: 'testproduct',
            price: '20',
        });
    }));
});
const request = (0, supertest_1.default)(index_1.default);
describe('testing products endpoints', () => {
    const token = user.create({
        firstname: 'has',
        lastname: 'has',
        password: 'has',
    });
    it('return 200 when using endpoint /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products');
        expect(response.status).toBe(200);
    }));
    it('return 200 when using endpoint /products/add', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/products/add')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc')
            .send({ name: 'producttest', price: '15' });
        // const response = await request
        //   .post('/products/add')
        //   .set({ name: 'producttest', price: '15' });
        expect(res.status).toBe(200);
    }));
    it('return 200 when using endpoint /products/get', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/products/get?id=1');
        expect(res.status).toBe(200);
    }));
});
