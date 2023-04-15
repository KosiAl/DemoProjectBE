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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const JwtStrategy = passport_jwt_1.default.Strategy;
const temp_service_1 = require("../routers/temp.service");
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    // get user from database
    const user = (0, temp_service_1.getUser)();
    if (user) {
        console.log("OK");
        return done(null, user);
    }
    else {
        console.log("NOT OK");
        return done(null, false);
    }
}));
passport_1.default.use(jwtLogin);
