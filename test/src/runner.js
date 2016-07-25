// Libraries
import mocha from "selenium-webdriver/testing";
import _ from "underscore";
import fs from "fs";
import glob from "glob";
import util from "util";

// Test Suite Variables
import * as suite from "./harness.js";

// Test Flags
import flagTests from "./flags.js";

// Helpers
import createScreenshotGif from "./helpers/gif.js";

var testCount = 0;
var tests = flagTests( [] );

function unlinkItems( items ){
    _( items ).each(
        ( item ) => fs.unlink( item )
    );
}

function applyToGlob( target, callback ){
    if( typeof callback === "function" ){
        glob(
            target,
            {},
            ( error, files ) => callback( files )
        );
    }
}

function checkHelpers( dirname, extension, callback ){
    var target = `${__dirname}/helpers/${dirname}`;
    var tail = extension && !_.isEmpty( extension ) ? `.${extension}` : "";

    function handleError( error ){
        if( error ){
            fs.mkdir( target );
        }
        else{
            applyToGlob( `${target}/*${tail}`, callback );
        }
    }

    fs.access(
        target,
        fs.F_OK,
        handleError
    );
}

mocha.before( () => {
    checkHelpers( "screenshots", "png", unlinkItems );
    checkHelpers( "gifs" );
    suite.initDriver();
} );

mocha.after( () => {
    createScreenshotGif();
    suite.driver.quit;
    testCount = 0;
} );

mocha.beforeEach( () => {
    testCount++;
    suite.driver.saveScreenshot( `${__dirname}/helpers/screenshots/start${testCount}.png` );
} );

mocha.afterEach( () => {
    var consoleColor = "\t\x1b[36m%s\x1b[0m";

    function formatAndWriteToStdout( color, message ){
        process.stdout.write(
            util.format(
                color,
                "Browser Console:",
                `${message}\n`
            )
        );
    }

    function handleBrowserLogs( logs ){
        if( logs && !_( logs ).isEmpty() ){
            _( logs ).each(
                ( log ) => formatAndWriteToStdout( consoleColor, log.message )
            );
        }
    }
    if( !suite.browser.match( /firefox/ ) ){
        suite.driver
        .manage()
        .logs()
        .get( "browser" )
        .then( handleBrowserLogs );
    }
} );

_( tests ).each(
    ( test ) => test.call()
);
