"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _chance = require("chance");

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance = new _chance2.default();

function clickRandomCard(cardClass, cardContainerClass) {
    _harness.driver.findElement(_harness.By.className(cardContainerClass)).findElements(_harness.By.className(cardClass)).then(function (cards) {
        cards[chance.integer({ "min": 0, "max": cards.length - 1 })].click();
    });
}

function cardUi() {
    (0, _harness.describe)("student cards", function () {
        (0, _harness.it)("shown when a class card is clicked", function () {
            clickRandomCard("class", "classes");
            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("mini student card")), 3000);
        });

        (0, _harness.it)("have checkboxes for multi-selection", function () {
            _harness.driver.wait(_harness.until.elementLocated(_harness.By.css("input[type='checkbox'].select")), 1000);
        });

        (0, _harness.it)("can select multiple students with checkboxes", function () {
            _harness.driver.findElements(_harness.By.css("input[type='checkbox'].select")).then(function (elements) {
                for (var i = 0; i <= 5; i++) {
                    elements[i].click();
                    _harness.driver.wait(_harness.until.elementIsSelected(elements[i]), 1000);
                }
            });
        });

        (0, _harness.it)("has a 'view longitudinal' button that appears when student cards are checked", function () {
            _harness.driver.findElement(_harness.By.css("button.viewLongitudinally")).then(function (button) {
                return _harness.driver.wait(_harness.until.elementIsVisible(button));
            }, 3000);
        });

        (0, _harness.it)("has a working link to longitudinal data through the longitudinal button", function () {
            _harness.driver.findElement(_harness.By.css("button.viewLongitudinally")).click();

            _harness.driver.wait(_harness.until.titleMatches(/Pivot\s-[\w\s]+-\s(?!Admin)/));
            _harness.driver.wait(_harness.until.elementLocated(_harness.By.id("create_new_group")));
        });
    });
}

exports.default = cardUi;
