"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _harness = require("../harness.js");

function loginCallback(testUser, target) {
    var usernameField;
    var passwordField;
    var loginButton;

    _harness.driver.get(target);

    _harness.driver.findElement(_harness.By.linkText("Logout")).then(function (logoutButton) {
        return logoutButton.click();
    }, function (error) {
        return _harness.assert.isOk(error);
    });

    _harness.driver.wait(_harness.until.titleContains("Login"), 5000);

    usernameField = _harness.driver.findElement(_harness.By.id("username"));
    passwordField = _harness.driver.findElement(_harness.By.id("password"));
    loginButton = _harness.driver.findElement(_harness.By.css("button.primary"));

    usernameField.click();
    usernameField.sendKeys(testUser.username);

    passwordField.click();
    passwordField.sendKeys(testUser.password);

    loginButton.click();

    _harness.driver.wait(_harness.until.titleContains("Pivot - "), 5000);
}

exports.default = loginCallback;
