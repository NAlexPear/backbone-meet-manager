"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../harness.js");

var _init = require("./init.js");

var _init2 = _interopRequireDefault(_init);

var _removeImports = require("./remove-imports.js");

var _removeImports2 = _interopRequireDefault(_removeImports);

var _fileValidation = require("./file-validation.js");

var _fileValidation2 = _interopRequireDefault(_fileValidation);

var _addTestButton = require("./ui/add-test-button.js");

var _addTestButton2 = _interopRequireDefault(_addTestButton);

var _fileUpload = require("./ui/file-upload.js");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function testImport() {
    (0, _harness.describe)("Test Import Page", function () {
        (0, _init2.default)();
        (0, _addTestButton2.default)();
        (0, _removeImports2.default)();
        (0, _fileUpload2.default)();
        (0, _fileValidation2.default)();
    });
}

exports.default = testImport;
