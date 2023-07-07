"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// routers
const dogapi_1 = __importDefault(require("./router/dogapi"));
const translateapi_1 = __importDefault(require("./router/translateapi"));
const jokeapi_1 = __importDefault(require("./router/jokeapi"));
// CORS, JSON
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// use router
app.use('/dog', dogapi_1.default);
app.use('/translate', translateapi_1.default);
app.use('/joke', jokeapi_1.default);
// actual port listen
app.listen(8000, () => {
    console.log('listen on port 8000');
});
