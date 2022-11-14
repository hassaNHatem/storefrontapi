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
// import { weapon, MythicalWeaponStore } from '../product';
const product_1 = require("../product");
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
