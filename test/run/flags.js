"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = flagTests;

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flags = {};

function flagTests(testFunctionArray) {
    var testsToRun = (0, _underscore2.default)(testFunctionArray).filter(function (test) {
        var isPresent = (0, _underscore2.default)(Object.keys(flags)).contains(test.name);
        var isTrue = flags[test.name];

        return isPresent && isTrue;
    });

    return testsToRun;
}
