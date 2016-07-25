"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../../harness.js");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileUpload;
var fileCount;
var validFileCount;

var testFilePath = __dirname.split("run")[0] + "test-files/file-upload.txt";
var testISTEPPath = __dirname.split("run")[0] + "test-files/test-istep.csv";
var rejectText = "This file did not match any of our test definitions.";

function initializeTestImport() {
    _harness.driver.get(_harness.target + "/admin/tests/import");
    _harness.driver.manage().window().setSize(1300, 760);
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

function setFileCount() {
    _harness.driver.findElements(_harness.By.className("file-upload-file")).then(function (files) {
        return fileCount = files.length;
    });
}

function setValidFileCount() {
    _harness.driver.findElements(_harness.By.className("okay-text")).then(function (files) {
        return validFileCount = files.length;
    });
}

function testFileValidationStates(stateTest) {
    _harness.driver.findElements(_harness.By.className("state")).then(function (stateTrackers) {
        (0, _underscore2.default)(stateTrackers).each(stateTest);
    });
}

function handleStaleElementReferenceError(error, newStateTest) {
    if (error.name === "StaleElementReferenceError") {
        testFileValidationStates(newStateTest);
    } else {
        throw error;
    }
}

function testElementVisibility(element, isHidden) {
    element.isDisplayed().then(function (displayState) {
        return _harness.assert.equal(displayState, !isHidden);
    });
}

function testButtonIsHidden(buttonClass) {
    _harness.driver.findElements(_harness.By.css("button." + buttonClass)).then(function (buttons) {
        return (0, _underscore2.default)(buttons).each(function (button) {
            return testElementVisibility(button, true);
        });
    });
}

function fileValidation() {
    (0, _harness.describe)("file validation", function () {
        (0, _harness.before)(initializeTestImport);

        (0, _harness.it)("hides file validation button by default", function () {
            testButtonIsHidden("start-validation", true);
        });

        (0, _harness.it)("shows a file validation button when a file is uploaded", function () {
            uploadFile(testFilePath);

            _harness.driver.findElements(_harness.By.className("start-validation")).then(function (validationButtons) {
                return validationButtons[0].isDisplayed();
            });
        });

        (0, _harness.it)("shows the file count on the validation button", function () {
            setFileCount();

            _harness.driver.findElement(_harness.By.className("validatable-count")).then(function (count) {
                _harness.driver.wait(_harness.until.elementTextContains(count, fileCount), 3000);
            });
        });

        (0, _harness.it)("rejects invalid files", function () {
            _harness.driver.findElement(_harness.By.className("start-validation")).click();

            testFileValidationStates(function (stateTracker) {
                _harness.driver.wait(_harness.until.elementTextContains(stateTracker, rejectText), 5000).then(function () {
                    return true;
                }, function (error) {
                    return handleStaleElementReferenceError(error, function (newStateTracker) {
                        _harness.driver.wait(_harness.until.elementTextContains(newStateTracker, rejectText), 5000);
                    });
                });
            });
        });

        (0, _harness.it)("accepts valid files", function () {
            uploadFile(testISTEPPath);

            _harness.driver.findElement(_harness.By.className("start-validation")).click();

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("okay-text")), 5000);
        });

        (0, _harness.it)("removes the validation button after validation", function () {
            testButtonIsHidden("start-validation");
        });

        (0, _harness.it)("adds a 'Start Import' button after successful validation", function () {
            _harness.driver.findElements(_harness.By.className("start-import")).then(function (importButtons) {
                return importButtons[0].isDisplayed();
            });
        });

        (0, _harness.it)("shows count of valid files on the 'Start Import' button", function () {
            uploadFile(testFilePath);
            setFileCount();
            setValidFileCount();

            _harness.driver.findElement(_harness.By.className("upload-count")).then(function (count) {
                _harness.driver.wait(_harness.until.elementTextContains(count, validFileCount), 3000);
            });
        });
    });
}

exports.default = fileValidation;
