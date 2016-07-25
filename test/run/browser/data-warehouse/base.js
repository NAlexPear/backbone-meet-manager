"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _routes = require("./routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _init = require("./init.js");

var _init2 = _interopRequireDefault(_init);

var _ui = require("./ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _quickView = require("./quick-view.js");

var _quickView2 = _interopRequireDefault(_quickView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dataWarehouse() {
    (0, _harness.describe)("Data Warehouse", function () {
        (0, _routes2.default)();
        (0, _init2.default)();
        (0, _ui2.default)();
        (0, _quickView2.default)();
    });
}

exports.default = dataWarehouse;
