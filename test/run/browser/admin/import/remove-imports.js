"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../harness.js");

var _resetButton = require("./ui/reset-button.js");

var _resetButton2 = _interopRequireDefault(_resetButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addTestButton;

function initializeTestImport() {
    _harness.driver.get(_harness.target + "/admin/tests/import");
    _harness.driver.manage().window().setSize(1300, 760);
}

function testImporterCount(count) {
    _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("test-import")), 1000);

    _harness.driver.findElements(_harness.By.className("test-import")).then(function (elements) {
        return _harness.assert.equal(elements.length, count);
    });
}

function componentRemoval() {
    (0, _harness.describe)("import component removal", function () {
        (0, _harness.before)(initializeTestImport);

        (0, _harness.it)("removes an import component when the close button is clicked sans pending files", function () {
            _harness.driver.wait(_harness.until.elementLocated(_harness.By.css("button.add-test.standard")), 1000);

            addTestButton = _harness.driver.findElement(_harness.By.css("button.add-test.standard"));
            addTestButton.click();
            addTestButton.click();

            _harness.driver.findElements(_harness.By.className("fa-close")).then(function (closeButtons) {
                return closeButtons[0].click();
            });

            testImporterCount(2);
        });

        (0, _resetButton2.default)();
    });
}

exports.default = componentRemoval;
