"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../harness.js");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_underscore2.default.mixin({
    "objReject": function rejectByProperty(input, test, context) {
        return (0, _underscore2.default)(input).reduce(function (object, v, k) {
            if (!test.call(context, v, k, input)) {
                object[k] = v;
            }

            return object;
        }, {}, context);
    }
});

function getTargets(febeArray) {
    var endpointArray = (0, _underscore2.default)(febeArray).map(function (febeObject) {
        return "" + _harness.target + febeObject.route.slim;
    });

    var titleArray = (0, _underscore2.default)(febeArray).map(function (febeObject) {
        return febeObject.parts.title;
    });

    var targetObject = (0, _underscore2.default)(titleArray).object(endpointArray);

    return (0, _underscore2.default)(targetObject).objReject(function (property) {
        return property.includes("{");
    });
}

function loadPage(title, url) {
    _harness.driver.get(url);
    _harness.driver.wait(_harness.until.titleMatches(RegExp(title + " - Pivot")), 5000);
}

function appRoutes(routes) {
    (0, _harness.describe)("loads each route successfully", function () {
        var targets = getTargets(routes);

        var _loop = function _loop(title) {
            (0, _harness.it)("loads " + title, function () {
                loadPage(title, targets[title]);
            });
        };

        for (var title in targets) {
            _loop(title);
        }
    });
}

exports.default = appRoutes;
