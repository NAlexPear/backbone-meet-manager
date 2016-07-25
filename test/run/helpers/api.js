"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _teacher = require("../test-files/users/teacher.json");

var _teacher2 = _interopRequireDefault(_teacher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakePivotServer = {
    "setUp": function setUpXHR() {
        this.server = _sinon2.default.fakeServer.create();

        this.server.respondWith("GET", "/teachers/1/classes/", ["200", { "Content-Type": "application/json" }, JSON.stringify("Response from the API: " + _teacher2.default)]);
    },
    "tearDown": function tearDownXHR() {
        this.server.restore();
    },
    "respond": function respondToRequest() {
        this.server.respond();
    }
};

exports.default = fakePivotServer;
