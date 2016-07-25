"use strict";
var _ = require( "underscore" );

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;


module.exports = function runGrunt( grunt ){
    var yeomanConfig = {
        "app": "app",
        "dist": "dist"
    };

    var config = require( "load-grunt-configs" )( grunt, {
        "config": {
            "src": "conf/grunt/configurations/*.*"
        },
        "yeoman": yeomanConfig,
        "vars": {
            "livereloadport": LIVERELOAD_PORT,
            "serverport": SERVER_PORT
        }
    } );

    require( "load-grunt-tasks" );

    require( "time-grunt" )( grunt );

    // Automatically load required Grunt tasks
    require( "jit-grunt" )( grunt, {
        "useminPrepare": "grunt-usemin"
    } );

    grunt.initConfig( _( config ).extend( {
        "yeoman": yeomanConfig,
        "useminPrepare": {
            "html": "<%= yeoman.app %>/index.html",
            "options": {
                "dest": "<%= yeoman.dist %>"
            }
        },
        "usemin": {
            "html": [ "<%= yeoman.dist %>/{,*/}*.html" ],
            "css": [ "<%= yeoman.dist %>/styles/{,*/}*.css" ],
            "options": {
                "dirs": [ "<%= yeoman.dist %>" ]
            }
        },
        "imagemin": {
            "dist": {
                "files": [ {
                    "expand": true,
                    "cwd": "<%= yeoman.app %>/images",
                    "src": "{,*/}*.{png,jpg,jpeg}",
                    "dest": "<%= yeoman.dist %>/images"
                } ]
            }
        },
        "cssmin": {
            "dist": {
                "files": {
                    "<%= yeoman.dist %>/styles/main.css": [
                        ".tmp/styles/{,*/}*.css",
                        "<%= yeoman.app %>/styles/{,*/}*.css"
                    ]
                }
            }
        },
        "htmlmin": {
            "dist": {
                "options": {},
                "files": [ {
                    "expand": true,
                    "cwd": "<%= yeoman.app %>",
                    "src": "*.html",
                    "dest": "<%= yeoman.dist %>"
                } ]
            }
        }
    } ) );

    grunt.task.loadTasks( "conf/grunt/tasks" );
};
