"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.saveUser = void 0;
var user;
function saveUser(pUser) {
    pUser.id = Math.floor(Math.random() * 100);
    user = pUser;
}
exports.saveUser = saveUser;
function getUser() {
    return user;
}
exports.getUser = getUser;
