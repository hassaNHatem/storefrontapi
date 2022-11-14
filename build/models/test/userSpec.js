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
const user_1 = require("../user");
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
        expect(result.firstname).toEqual('test2');
    }));
    it('should display all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual(jasmine.anything());
    }));
}));
