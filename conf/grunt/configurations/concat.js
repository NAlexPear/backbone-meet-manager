module.exports = function getConcatConfig( grunt, options ){
    /* eslint-disable new-cap*/
    var startUpCallback;

    function startApplication( App ){
        var app = new App.default();

        app.start();
    }

    startUpCallback = ( "" + startApplication );

    return {
        "dist": {
            "src": [ `${options.yeoman.dist}/scripts/app.js` ],
            "dest": `${options.yeoman.dist}/scripts/app.js`,
        },
        "options": {
            "footer": `\n\nrequirejs( [ \"app\" ], ${startUpCallback} );`
        }
    };
};
