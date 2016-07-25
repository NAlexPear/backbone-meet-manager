"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../../harness.js");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _login = require("../../helpers/login");

var _login2 = _interopRequireDefault(_login);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server;
var testUser;

if (_harness.realDataTarget) {
    testUser = {
        "username": "mblessinger",
        "password": "password",
        "id": 90
    };
} else {
    testUser = {
        "username": "admin",
        "password": "password",
        "id": 1
    };
}

function generateUrl() {
    var root = _harness.realDataTarget || _harness.target;
    var url = root + "/data-warehouse/overview/" + testUser.id;

    return url;
}

function initializeOverview() {
    var url = generateUrl();

    if (!_harness.realDataTarget) {
        console.log("Starting up the server!");

        server = _sinon2.default.fakeServer.create();

        _sinon2.default.stub(_jquery2.default, "ajax");

        _harness.driver.get(url).then(function () {
            console.log(server);
            server.respond();

            _jquery2.default.ajax.restore();
            console.log(server);

            server.restore();
        });
    } else {
        _harness.driver.get(url);
    }

    _harness.driver.manage().window().setSize(1300, 760);
}

function intializeOverviews() {
    (0, _harness.describe)("loads correctly", function () {
        (0, _harness.it)("logs " + testUser.username + " in successfully", function () {
            return (0, _login2.default)(testUser, _harness.realDataTarget || _harness.target);
        });

        (0, _harness.it)("loads a class overview page for teachers with student data", function () {
            initializeOverview();

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("classes")), 3000);
        });

        (0, _harness.it)("presents classes as cards for teachers", function () {
            initializeOverview();

            _harness.driver.wait(_harness.until.elementLocated(_harness.By.className("class card")), 1000);

            _harness.driver.findElements(_harness.By.className("class card")).then(function (cards) {
                return _harness.assert.isAbove(cards.length, 0);
            });
        });
    });
}

exports.default = intializeOverviews;
