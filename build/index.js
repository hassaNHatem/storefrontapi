"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureToken = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const orders_1 = require("./handlers/orders");
dotenv_1.default.config();
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200,
};
function ensureToken(req, res, next) {
    const bearerheader = req.headers['authorization'];
    if (typeof bearerheader !== 'undefined') {
        const bearer = bearerheader.split(' ');
        const bearertoken = bearer[1];
        req.token = bearertoken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.ensureToken = ensureToken;
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, products_1.default)(app);
(0, orders_1.orderRoutes)(app);
(0, user_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
