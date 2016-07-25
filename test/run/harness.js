"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.realDataTarget = exports.target = exports.before = exports.it = exports.describe = exports.assert = exports.expect = exports.should = exports.driver = exports.initDriver = exports.until = exports.By = exports.browser = undefined;

var _seleniumWebdriver = require("selenium-webdriver");

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _testing = require("selenium-webdriver/testing");

var _testing2 = _interopRequireDefault(_testing);

var _capabilities = require("selenium-webdriver/lib/capabilities");

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var firefoxCapabilities = _capabilities.Capabilities.firefox();
var target = process.env.TARGET;
var browser = process.env.BROWSER;
var realDataTarget = process.env.NHCS;
var By = _seleniumWebdriver2.default.By;
var until = _seleniumWebdriver2.default.until;
var should = _chai2.default.should();
var expect = _chai2.default.expect;
var assert = _chai2.default.assert;
var describe = _testing2.default.describe;
var it = _testing2.default.it;
var before = _testing2.default.before;
var driver;

if (!browser.match(/chrome|phantomjs|firefox/)) {
    throw new Error("Your chosen browser is unsupported at this time, please use chrome or phantomjs (case-sensitive)");
}

if (browser.match(/firefox/)) {
    process.stdout.write("Beware, the Firefox driver is SUPER buggy... use at your own risk!");

    _fs2.default.access("/bin/geckodriver", _fs2.default.F_OK, function handleMissingDriver(error) {
        if (error) {
            throw new Error("Please install the Firefox WebDriver to /bin/geckodriver before testing in Firefox");
        }
    });
}

firefoxCapabilities.set("marionette", true);
process.env.PATH += ":" + "/bin/geckodriver";

exports.driver = driver = new _seleniumWebdriver2.default.Builder().withCapabilities(firefoxCapabilities).forBrowser(browser).build();

_seleniumWebdriver2.default.WebDriver.prototype.saveScreenshot = function saveScreenshot(filename) {
    function handleError(error) {
        if (error) {
            throw error;
        }
    }

    return driver.takeScreenshot().then(function (data) {
        _fs2.default.writeFile(filename, data.replace(/^data:image\/png;base64,/, ""), "base64", handleError);
    });
};

function initDriver() {
    driver.get(target);
    driver.manage().window().setSize(975, 600);
}

exports.browser = browser;
exports.By = By;
exports.until = until;
exports.initDriver = initDriver;
exports.driver = driver;
exports.should = should;
exports.expect = expect;
exports.assert = assert;
exports.describe = describe;
exports.it = it;
exports.before = before;
exports.target = target;
exports.realDataTarget = realDataTarget;
