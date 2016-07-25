"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../harness.js");

var closeButton;
var importerCount;

function initializeTestImport() {
    _harness.driver.get(_harness.target + "/admin/tests/import");
    _harness.driver.manage().window().setSize(1300, 760);

    _harness.driver.wait(_harness.until.titleMatches(/(?!Import Tests)/), 3000);
}

function testImporterCount(count) {
    _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("test-import")), 1000);

    _harness.driver.findElements(_harness.By.className("test-import")).then(function (elements) {
        return _harness.assert.equal(elements.length, count);
    });
}

function initializeTestImportPage() {
    (0, _harness.describe)("page load", function () {
        (0, _harness.it)("navigates to a working iframe", function () {
            initializeTestImport();

            _harness.driver.isElementPresent(_harness.By.className("test-import-container"));
        });

        (0, _harness.it)("starts with one importer visible on page load", function () {
            importerCount = 1;
            testImporterCount(importerCount);
        });

        (0, _harness.it)("starts with importer close buttons in the DOM but disabled", function () {
            closeButton = _harness.driver.findElement(_harness.By.className("fa-close"));
            _harness.driver.wait(_harness.until.elementIsNotVisible(closeButton), 1000);
        });
    });
}

exports.default = initializeTestImportPage;
