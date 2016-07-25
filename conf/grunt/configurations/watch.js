module.exports = function getWatchConfig( grunt, options ){
    return {
        "options": {
            "nospawn": true,
            "livereload": options.vars.livereloadport
        },
        "livereload": {
            "options": {
                "livereload": grunt.option( "livereloadport" ) || options.vars.livereloadport
            },
            "files": [
                `${options.yeoman.app}/*.html`,
                `{.tmp,${options.yeoman.app}}/styles/{,*/}*.css`,
                `{.tmp,${options.yeoman.app}}/scripts/{,*/}*.js`,
                `${options.yeoman.app}/images/{,*/}*.{png,jpg,jpeg,gif,webp}`,
                `${options.yeoman.app}/templates/*.html`
            ]
        }
    };
};
