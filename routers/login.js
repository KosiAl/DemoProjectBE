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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport = require("passport");
const temp_service_1 = require("./temp.service");
function login() {
    const router = (0, express_1.Router)();
    if (jsonwebtoken_1.default) {
        console.log("jsonwebtoken library is installed and imported correctly");
    }
    else {
        console.error("jsonwebtoken library is not installed or imported correctly");
    }
    router
        .get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // Make a call to the database to get the user's information
        let user = (0, temp_service_1.getUser)();
        delete user.password;
        res.json(user);
    }))
        .post("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let userCopy = Object.assign({}, (0, temp_service_1.getUser)());
        let recivedUser = Object.assign({}, req.body);
        let isUserLegit = false;
        if (recivedUser.email === userCopy.email &&
            recivedUser.password === userCopy.password) {
            isUserLegit = true;
        }
        else {
            isUserLegit = false;
        }
        try {
            // Make a call to the database to get the user's information
            // Use bcrypt to compare the password the user sent with the password stored in the database
            // check if user exists
            if (!isUserLegit) {
                return res
                    .status(400)
                    .json({ error: "User does not exist" });
            }
            else {
                const jwToken = jsonwebtoken_1.default.sign({ id: userCopy.id }, "secret" /* , {expiresIn: '1h'} */);
                delete userCopy.password;
                res.json({ fUser: userCopy, jwt: jwToken });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }));
    return router;
}
exports.default = login;
