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
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_1 = require("../models/product");
const store = new product_1.productStore();
dotenv_1.default.config();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json(products);
});
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jsonwebtoken_1.default.verify(_req.token, process.env.TOKEN_SECRET);
        const product = yield store.create(_req.body);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(Number(_req.query.id));
        console.log(_req.query.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const products_routes = (app) => {
    app.get('/products', index);
    app.post('/products/add', __1.ensureToken, create);
    app.get('/products/get', show);
};
exports.default = products_routes;
