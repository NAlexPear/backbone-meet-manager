"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createScreenshotGif;

var _child_process = require("child_process");

var date = new Date();
var day = date.toISOString().split("T")[0];
var time = date.toTimeString().split(" ")[0].split(":").join("");

function createScreenshotGif() {
    (0, _child_process.exec)("convert -delay 50 -loop 0 " + __dirname + "/screenshots/start*.png " + __dirname + "/gifs/" + day + "_" + time + ".gif");
}
