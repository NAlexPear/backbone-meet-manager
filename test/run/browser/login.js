"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../harness.js");

var _login = require("../helpers/login");

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testUser = {
    "username": "admin",
    "password": "password"
};

function login() {
    (0, _harness.describe)("Login page", function () {
        (0, _harness.it)("logs " + testUser.username + " in successfully", function () {
            return (0, _login2.default)(testUser, _harness.target);
        });
    });
}

exports.default = login;
