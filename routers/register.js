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
const express_1 = require("express");
const temp_service_1 = require("./temp.service");
function register() {
    const router = (0, express_1.Router)();
    router.post("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        (0, temp_service_1.saveUser)(Object.assign({}, req.body));
        try {
            let userCopy = Object.assign({}, (0, temp_service_1.getUser)());
            delete userCopy.password;
            res.json(userCopy);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }));
    return router;
}
exports.default = register;
