// Libraries
import webDriver from "selenium-webdriver";
import mocha from "selenium-webdriver/testing";
import { Capabilities } from "selenium-webdriver/lib/capabilities";
import chai from "chai";
import fs from "fs";

/* eslint-disable no-process-env */
var firefoxCapabilities = Capabilities.firefox();
var target = process.env.TARGET;
var browser = process.env.BROWSER;
var realDataTarget = process.env.NHCS;
var By = webDriver.By;
var until = webDriver.until;
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;
var describe = mocha.describe;
var it = mocha.it;
var before = mocha.before;
var driver;

if( !browser.match( /chrome|phantomjs|firefox/ ) ){
    throw new Error( "Your chosen browser is unsupported at this time, please use chrome or phantomjs (case-sensitive)" );
}

if( browser.match( /firefox/ ) ){
    process.stdout.write( "Beware, the Firefox driver is SUPER buggy... use at your own risk!" );

    fs.access( "/bin/geckodriver", fs.F_OK, function handleMissingDriver( error ){
        if( error ){
            throw new Error( "Please install the Firefox WebDriver to /bin/geckodriver before testing in Firefox" );
        }
    } );
}

firefoxCapabilities.set( "marionette", true );
process.env.PATH += ":" + "/bin/geckodriver";

driver = new webDriver.Builder()
    .withCapabilities( firefoxCapabilities )
    .forBrowser( browser )
    .build();

webDriver.WebDriver.prototype.saveScreenshot = function saveScreenshot( filename ){
    function handleError( error ){
        if( error ){
            throw error;
        }
    }

    return driver.takeScreenshot().then( ( data ) => {
        fs.writeFile(
            filename,
            data.replace( /^data:image\/png;base64,/,"" ),
            "base64",
            handleError
        );
    } );
};

function initDriver(){
    driver.get( target );
    driver.manage().window().setSize( 975, 600 );
}

export {
    browser,
    By,
    until,
    initDriver,
    driver,
    should,
    expect,
    assert,
    describe,
    it,
    before,
    target,
    realDataTarget
};
