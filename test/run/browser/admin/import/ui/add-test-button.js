"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../../harness.js");

var addTestButton;
var closeButton;

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

function addTestButtonUi() {
    (0, _harness.describe)("'Add Test' button", function () {
        (0, _harness.before)(initializeTestImport);

        (0, _harness.it)("adds a test import component when the 'add test' button is clicked", function () {
            addTestButton = _harness.driver.findElement(_harness.By.css("button.add-test.standard"));

            _harness.driver.wait(_harness.until.elementIsVisible(addTestButton), 1000);

            addTestButton.click();

            testImporterCount(2);
        });

        (0, _harness.it)("enables close buttons when more than one component is visible", function () {
            closeButton = _harness.driver.findElement(_harness.By.className("fa-close"));

            _harness.driver.wait(_harness.until.elementIsVisible(closeButton), 1000);
        });
    });
}

exports.default = addTestButtonUi;
