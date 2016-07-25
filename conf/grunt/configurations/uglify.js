module.exports = function getUglifyConfig( grunt, options ){
    var mainPath = `${options.yeoman.dist}/scripts/app.js`;
    var filesArray = [
        `${options.yeoman.dist}/scripts/app.js`
    ];

    var files = {};

    files[ mainPath ] = filesArray;

    return {
        "dist": {
            "files": files
        }
    };
};
