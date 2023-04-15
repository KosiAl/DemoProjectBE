"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const api_1 = __importDefault(require("./api"));
const cors_1 = __importDefault(require("cors"));
require("../Auth/passport");
function configure(app) {
    app.use((0, cors_1.default)())
        .get("/", (req, res, next) => {
        res.send({ text: "Hello World" });
    })
        .use(express_1.default.static("public"))
        .use((0, body_parser_1.json)())
        .use("/api", (0, api_1.default)())
        .use((req, res, next) => {
        next(new Error("Not Found"));
    });
}
exports.default = configure;
