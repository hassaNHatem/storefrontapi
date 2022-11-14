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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const product_1 = require("../product");
const user_1 = require("../user");
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
