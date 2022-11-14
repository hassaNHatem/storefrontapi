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
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const store = new order_1.Order();
dotenv_1.default.config();
const addOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jsonwebtoken_1.default.verify(_req.token, process.env.TOKEN_SECRET);
        const order = yield store.addOrder(parseInt(_req.body.userId));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = _req.params.id;
    const productId = _req.body.product_id;
    const quantity = parseInt(_req.body.quantity);
    try {
        process.env.ENV !== 'test' &&
            jsonwebtoken_1.default.verify(_req.token, process.env.TOKEN_SECRET);
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        console.log(orderId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jsonwebtoken_1.default.verify(_req.token, process.env.TOKEN_SECRET);
        const order = yield store.getOrder(_req.body.userId);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const orderRoutes = (app) => {
    app.post('/orders', __1.ensureToken, addOrder);
    app.post('/orders/:id/products', __1.ensureToken, addProduct);
    app.get('/orders/:id', __1.ensureToken, getOrder);
};
exports.orderRoutes = orderRoutes;
