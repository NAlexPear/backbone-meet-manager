"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _febe = require("../../helpers/febe.js");

var _febe2 = _interopRequireDefault(_febe);

var _core = require("../../../../febe/routes/core.json");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function adminRoutes() {
    (0, _harness.describe)("FEBE routes for Pivot Core", function () {
        (0, _febe2.default)(_core2.default);
    });
}

exports.default = adminRoutes;
