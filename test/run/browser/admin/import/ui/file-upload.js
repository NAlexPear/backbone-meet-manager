"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../../harness.js");

var addTestButton;
var fileUpload;

var testFilePath = __dirname.split("run")[0] + "test-files/file-upload.txt";

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

function uploadFile(filePath) {
    fileUpload = _harness.driver.findElement(_harness.By.css("input[type=file]"));

    _harness.driver.executeScript(function setInput() {
        var input = document.querySelector("input[type=file]");

        input.style.display = "block";
        input.removeAttribute("multiple");
    });

    fileUpload.sendKeys(filePath);

    _harness.driver.executeScript(function revertInput() {
        var input = document.querySelector("input[type=file]");

        input.style.display = "";
        input.setAttribute("multiple", "true");
    });
}

function removeFile(fileNumber) {
    _harness.driver.findElements(_harness.By.className("fa-trash")).then(function (trashButtons) {
        return trashButtons[fileNumber - 1].click();
    });
}

function confirmDeleteThroughModal() {
    _harness.driver.findElement(_harness.By.css("button.delete")).click();
}

function fileUploadUi() {
    (0, _harness.describe)("file uploads", function () {
        (0, _harness.before)(initializeTestImport);

        (0, _harness.it)("responds visually to new files", function () {
            uploadFile(testFilePath);
            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("file-upload-file")), 1000);
        });

        (0, _harness.it)("allows users to delete a staged file", function () {
            removeFile(1);

            _harness.driver.findElements(_harness.By.className("file-upload-file")).then(function (files) {
                return _harness.assert.equal(files.length, 0);
            });
        });

        (0, _harness.it)("warns users with a modal when removing imports with pending uploads", function () {
            addTestButton = _harness.driver.findElement(_harness.By.css("button.add-test.standard"));
            addTestButton.click();
            testImporterCount(2);

            uploadFile(testFilePath);

            _harness.driver.findElements(_harness.By.className("fa-close")).then(function (closeButtons) {
                return closeButtons[0].click();
            });

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("modal")), 1000);
        });

        (0, _harness.it)("cancels the import removal through the modal when applicable", function () {
            _harness.driver.findElement(_harness.By.css("button.cancel")).click();

            _harness.driver.findElements(_harness.By.className("modal")).then(function (modals) {
                return _harness.assert.equal(modals.length, 0);
            });
        });

        (0, _harness.it)("continues with import removal through the modal when requested", function () {
            _harness.driver.findElements(_harness.By.className("fa-close")).then(function (closeButtons) {
                return closeButtons[0].click();
            });

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("modal")), 1000).then(confirmDeleteThroughModal);

            testImporterCount(1);
        });
    });
}

exports.default = fileUploadUi;
