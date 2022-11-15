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
const order_1 = require("../order");
const product_1 = require("../product");
const user_1 = require("../user");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const user = new user_1.User();
const store = new order_1.Order();
const product = new product_1.productStore();
describe('orders modal', () => {
    it('should add order', () => __awaiter(void 0, void 0, void 0, function* () {
        const adduser = user.create({
            firstname: 'test',
            lastname: 'test',
            password: 'test',
        });
        const order = yield store.addOrder(1);
        expect(order).toEqual({ id: 1, user_id: '1', status: 'active' });
    }));
    it('shoul show specfic order', () => __awaiter(void 0, void 0, void 0, function* () {
        const adduser = user.create({
            firstname: 'test',
            lastname: 'test',
            password: 'test',
        });
        const order = yield store.addOrder(1);
        const getorder = yield store.getOrder(1);
        expect(getorder).toEqual({ id: 1, user_id: '1', status: 'active' });
    }));
});
const request = (0, supertest_1.default)(index_1.default);
describe('testing order endpoints', () => {
    it('return 200 when using endpoint /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orders')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc')
            .send({ userId: 1 });
        expect(response.status).toBe(200);
    }));
    it('return 200 when using endpoint /orders/:id/products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orders/1/products')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc')
            .send({ quantity: 250, product_id: '1' });
        expect(response.status).toBe(400);
    }));
});
