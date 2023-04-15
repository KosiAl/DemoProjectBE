"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
function api() {
    const router = (0, express_1.Router)();
    router
        .use((req, res, next) => {
        if (!req.body) {
            next(new Error("Bad request"));
            return;
        }
        next();
    })
        .use("/v1", apiV1())
        .use((req, res, next) => {
        console.log("Invalid route");
        res.status(404).json({
            error: "Invalid route",
        });
    })
        .use((err, req, res, next) => {
        res.status(500).json({
            error: err.message,
        });
    });
    return router;
}
exports.default = api;
function apiV1() {
    const router = (0, express_1.Router)();
    router
        .use((req, res, next) => {
        console.log("API V1");
        next();
    })
        .use("/register", (0, register_1.default)())
        .use("/login", (0, login_1.default)());
    return router;
}
