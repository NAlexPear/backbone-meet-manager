"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _routes = require("./routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _base = require("./import/base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function admin() {
    (0, _harness.describe)("Admin", function () {
        (0, _routes2.default)();
        (0, _base2.default)();
    });
}

exports.default = admin;
