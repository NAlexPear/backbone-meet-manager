/* global requirejs */
requirejs.config( {
    "paths": {
        "template": "../../../app/templates",
        "jquery": "../../../node_modules/jquery/dist/jquery",
        "backbone": "../../../node_modules/backbone/backbone",
        "underscore": "../../../node_modules/underscore/underscore",
        "text": "../../../node_modules/requirejs-text/text"
    },

    "shim": {
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "exports": "Backbone"
        }
    }
} );
