"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _routes = require("./routes.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function admin() {
    (0, _harness.describe)("Core", function () {
        (0, _routes2.default)();
    });
}

exports.default = admin;
