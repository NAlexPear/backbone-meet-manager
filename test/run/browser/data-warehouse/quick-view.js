"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

function generateUrl() {
    var root = _harness.realDataTarget || _harness.target;
    var url = root + "/data-warehouse/class/4533214";

    return url;
}

function initializeOverview() {
    var url = generateUrl();

    _harness.driver.get(url);

    _harness.driver.manage().window().setSize(1300, 760);
}

function applyToElement(element, callback) {
    var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    args.unshift(element);

    callback.apply(this, args);
}

function applyToCardByIndex(cardClass, cardIndex, callback) {
    _harness.driver.findElements(_harness.By.className(cardClass)).then(function (cards) {
        return applyToElement(cards[cardIndex], callback);
    });
}

function applyToSelectorLocation(selector, callback) {
    var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
    var index = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    function elementCallback(element) {
        var _this = this;

        element.getLocation().then(function (location) {
            args.unshift(location);

            callback.apply(_this, args);
        });
    }

    _harness.driver.findElements(_harness.By.css(selector)).then(function (elements) {
        return applyToElement(elements[index], elementCallback);
    });
}

function checkForDecoupling() {
    function frameCallback(frameLocation, cardLocation) {
        _harness.assert.isAtLeast(frameLocation.y, cardLocation.y + 50);
    }
    function cardCallback(cardLocation) {
        applyToSelectorLocation("iframe", frameCallback, [cardLocation]);
    }
    applyToSelectorLocation(".mini.student.card", cardCallback, [], 1);
}

function interstitialUi() {
    (0, _harness.describe)("student quick views", function () {
        (0, _harness.it)("shows a quick view when student cards are clicked", function () {
            initializeOverview();

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("mini student card")), 5000);

            applyToCardByIndex("mini student card", 1, function (card) {
                return card.click();
            });

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.id("quick-view-frame")), 3000);
        });

        (0, _harness.it)("removes quick view when the same card is clicked", function () {
            applyToCardByIndex("mini student card", 1, function (card) {
                return card.click();
            });

            function frameCondition() {
                return _harness.driver.findElements(_harness.By.css("iframe")).then(function (frames) {
                    return frames.length === 0;
                });
            }

            _harness.driver.wait(frameCondition, 3000);
        });

        (0, _harness.it)("doesn't duplicate iframes when the browser window is rapidly resized", function () {
            applyToCardByIndex("mini student card", 1, function (card) {
                return card.click();
            });

            _harness.driver.manage().window().setSize(300, 760);
            _harness.driver.manage().window().setSize(1500, 760);
            _harness.driver.manage().window().setSize(110, 760);
            _harness.driver.manage().window().setSize(1240, 760);
            _harness.driver.manage().window().setSize(1300, 760);
            _harness.driver.manage().window().setSize(110, 760);
            _harness.driver.manage().window().setSize(1240, 760);
            _harness.driver.manage().window().setSize(1300, 760);

            function frameCondition() {
                return _harness.driver.findElements(_harness.By.css("iframe")).then(function (frames) {
                    return frames.length === 1;
                });
            }

            _harness.driver.wait(frameCondition, 3000);
        });

        (0, _harness.it)("doesn't allow cards to become separated from their summaries when the browser window is resized", function () {
            _harness.driver.manage().window().setSize(300, 760);

            checkForDecoupling();

            _harness.driver.manage().window().setSize(600, 760);

            checkForDecoupling();

            _harness.driver.manage().window().setSize(1300, 760);

            checkForDecoupling();
        });
    });
}

exports.default = interstitialUi;
