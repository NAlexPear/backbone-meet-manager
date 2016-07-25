"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _febe = require("../../helpers/febe.js");

var _febe2 = _interopRequireDefault(_febe);

var _admin = require("../../../../febe/routes/admin.json");

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function adminRoutes() {
    (0, _harness.describe)("FEBE routes for the Admin app", function () {
        (0, _febe2.default)(_admin2.default);
    });
}

exports.default = adminRoutes;
