"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

function applyToCards(callback) {
    _harness.driver.findElement(_harness.By.id("card-demo")).findElements(_harness.By.className("mini student card")).then(callback);
}

function testCardWrap(assertion) {
    applyToCards(function (cards) {
        cards[0].getLocation().then(function (location) {
            var firstLocation = location;

            cards[cards.length - 1].getLocation().then(function (lastLocation) {
                return assertion(firstLocation.y, lastLocation.y);
            });
        });
    });
}

function testCardAlignment(cardIndex, assertion, alignment) {
    applyToCards(function (cards) {
        cards[cardIndex].getLocation().then(function (location) {
            var baseline = location;

            _harness.driver.executeScript(function addCardClass() {
                $("#card-demo ").addClass(arguments[0]);
            }, alignment).then(function () {
                applyToCards(function (centeredCards) {
                    centeredCards[cardIndex].getLocation().then(function (newLocation) {
                        assertion(baseline.x, newLocation.x);
                        _harness.driver.executeScript(function removeCardClass() {
                            $("#card-demo").removeClass(arguments[0]);
                        }, alignment);
                    });
                });
            });
        });
    });
}

function checkAlignments() {
    return (0, _harness.describe)("aligns content appropriately", function () {
        (0, _harness.it)(": center", function () {
            _harness.driver.manage().window().setSize(1800, 760);

            testCardAlignment(0, _harness.assert.isBelow, "center");
            testCardAlignment(5, _harness.assert.isAbove, "center");
        });

        (0, _harness.it)(": left", function () {
            testCardAlignment(0, _harness.assert.isAbove, "left");
        });

        (0, _harness.it)(": right", function () {
            testCardAlignment(0, _harness.assert.isBelow, "right");
        });
    });
}

function checkSpacing() {
    return (0, _harness.describe)("spaces content appropriately", function () {
        (0, _harness.it)(": space-around", function () {
            _harness.driver.manage().window().setSize(635, 760);

            applyToCards(function (cards) {
                _harness.assert.equal(cards.length, 6);

                cards[0].getLocation().then(function (location) {
                    var firstLocation = location;

                    cards[3].getLocation().then(function (testLocation) {
                        return _harness.assert.equal(testLocation.x, firstLocation.x);
                    });
                });
            });
        });

        (0, _harness.it)(": space-between", function () {
            _harness.driver.executeScript(function addCardSpacing() {
                $("#card-demo").addClass(arguments[0]);
            }, "space-between");

            applyToCards(function (cards) {
                cards[0].getLocation().then(function (location) {
                    var firstLocation = location;

                    cards[cards.length - 1].getLocation().then(function (testLocation) {
                        var lastLocation = testLocation;

                        cards[cards.length - 1].getSize().then(function (size) {
                            var cardSize = size;
                            var adjustedTestCoordinate = 635 - (lastLocation.x + cardSize.width);

                            _harness.assert.notEqual(firstLocation.x, adjustedTestCoordinate);
                        });
                    });
                });
            });

            _harness.driver.executeScript(function removeCardSpacing() {
                $("#card-demo").removeClass(arguments[0]);
            }, "space-between");
        });
    });
}

function flexDemo() {
    (0, _harness.describe)("Responsive Flex-Grid Demo", function () {
        (0, _harness.it)("loads the demo page correctly", function () {
            _harness.driver.get(_harness.target + "/demo/flex-grid");
            _harness.driver.manage().window().setSize(1300, 760);

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.id("card-demo")), 2000);
        });
        (0, _harness.describe)("basic static grid", function () {
            (0, _harness.it)("wraps content when appropriate", function () {
                testCardWrap(_harness.assert.equal);

                _harness.driver.manage().window().setSize(500, 760);
                testCardWrap(_harness.assert.isBelow);
            });

            checkSpacing();
            checkAlignments();
        });
    });
}

exports.default = flexDemo;
