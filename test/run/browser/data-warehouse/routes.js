"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _febe = require("../../helpers/febe.js");

var _febe2 = _interopRequireDefault(_febe);

var _dataWarehouse = require("../../../../febe/routes/data-warehouse.json");

var _dataWarehouse2 = _interopRequireDefault(_dataWarehouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dataWarehouseRoutes() {
    (0, _harness.describe)("FEBE routes for the Data Warehouse app", function () {
        (0, _febe2.default)(_dataWarehouse2.default);
    });
}

exports.default = dataWarehouseRoutes;
