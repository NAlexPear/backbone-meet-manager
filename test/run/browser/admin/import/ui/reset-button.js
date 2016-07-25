"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../../harness.js");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

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

function testElementHidden(webElement) {
    webElement.isDisplayed().then(function (displayed) {
        return _harness.assert.isNotTrue(displayed);
    });
}

function addTestButtonUi() {
    (0, _harness.describe)("reset button", function () {
        (0, _harness.before)(initializeTestImport);

        (0, _harness.it)("prompts users to confirm their choice to reset test/importer data", function () {
            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("reset")), 1000);

            _harness.driver.findElements(_harness.By.className("reset")).then(function (resetButtons) {
                return resetButtons[0].click();
            });

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("inline field")), 1000);
        });

        (0, _harness.it)("cancels the reset when the 'No' button is clicked", function () {
            _harness.driver.findElement(_harness.By.css("div.inline.field>button.standard.cancel")).click();

            _harness.driver.findElement(_harness.By.className("control")).findElements(_harness.By.css("div")).then(function (divs) {
                return (0, _underscore2.default)(divs).each(function (div) {
                    div.getAttribute("class").then(function (classes) {
                        return _harness.assert.notInclude(classes, "inline field");
                    });
                });
            });
        });

        (0, _harness.it)("removes all but one importers on reset", function () {
            addTestButton = _harness.driver.findElement(_harness.By.css("button.add-test.standard"));
            addTestButton.click();

            testImporterCount(2);

            _harness.driver.findElements(_harness.By.className("reset")).then(function (resetButtons) {
                return resetButtons[0].click();
            });

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.css("div.inline.field>button.delete")), 1000).then(function (button) {
                return button.click();
            });

            testImporterCount(1);
        });

        (0, _harness.it)("removes bottom controls on reset", function () {
            _harness.driver.findElement(_harness.By.id("bottom-controls")).then(testElementHidden);
        });

        (0, _harness.it)("removes close import decorators on reset", function () {
            _harness.driver.findElements(_harness.By.className("fa-close")).then(function (closeButtons) {
                return (0, _underscore2.default)(closeButtons).each(testElementHidden);
            });
        });
    });
}

exports.default = addTestButtonUi;
