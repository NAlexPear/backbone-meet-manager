"use strict";

var _testing = require("selenium-webdriver/testing");

var _testing2 = _interopRequireDefault(_testing);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _harness = require("./harness.js");

var suite = _interopRequireWildcard(_harness);

var _flags = require("./flags.js");

var _flags2 = _interopRequireDefault(_flags);

var _gif = require("./helpers/gif.js");

var _gif2 = _interopRequireDefault(_gif);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testCount = 0;
var tests = (0, _flags2.default)([]);

function unlinkItems(items) {
    (0, _underscore2.default)(items).each(function (item) {
        return _fs2.default.unlink(item);
    });
}

function applyToGlob(target, callback) {
    if (typeof callback === "function") {
        (0, _glob2.default)(target, {}, function (error, files) {
            return callback(files);
        });
    }
}

function checkHelpers(dirname, extension, callback) {
    var target = __dirname + "/helpers/" + dirname;
    var tail = extension && !_underscore2.default.isEmpty(extension) ? "." + extension : "";

    function handleError(error) {
        if (error) {
            _fs2.default.mkdir(target);
        } else {
            applyToGlob(target + "/*" + tail, callback);
        }
    }

    _fs2.default.access(target, _fs2.default.F_OK, handleError);
}

_testing2.default.before(function () {
    checkHelpers("screenshots", "png", unlinkItems);
    checkHelpers("gifs");
    suite.initDriver();
});

_testing2.default.after(function () {
    (0, _gif2.default)();
    suite.driver.quit;
    testCount = 0;
});

_testing2.default.beforeEach(function () {
    testCount++;
    suite.driver.saveScreenshot(__dirname + "/helpers/screenshots/start" + testCount + ".png");
});

_testing2.default.afterEach(function () {
    var consoleColor = "\t\x1b[36m%s\x1b[0m";

    function formatAndWriteToStdout(color, message) {
        process.stdout.write(_util2.default.format(color, "Browser Console:", message + "\n"));
    }

    function handleBrowserLogs(logs) {
        if (logs && !(0, _underscore2.default)(logs).isEmpty()) {
            (0, _underscore2.default)(logs).each(function (log) {
                return formatAndWriteToStdout(consoleColor, log.message);
            });
        }
    }
    if (!suite.browser.match(/firefox/)) {
        suite.driver.manage().logs().get("browser").then(handleBrowserLogs);
    }
});

(0, _underscore2.default)(tests).each(function (test) {
    return test.call();
});
