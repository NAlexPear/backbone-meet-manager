module.exports = function getSassConfig( grunt, options ){
    var files = {};
    var output = `${options.yeoman.app}/styles/main.css`;
    var input = `${options.yeoman.app}/styles/scss/main.scss`;

    files[ output ] = input;

    return {
        "dist": {
            "files": files
        }
    };
};
