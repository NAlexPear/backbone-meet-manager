module.exports = function getRequireConfig( grunt, options ){
    var textModule = `${__dirname.split( "node_modules" )[0]}/requirejs-text/text`;

    return {
        "dist": {
            "options": {
                "baseUrl": `.tmp/${options.yeoman.app}/scripts/`,
                "mainConfigFile": "require-config.js",
                "stubModules": [ textModule ],
                "findNestedDependencies": true,
                "optimize": "none",
                "name": "app",
                "out": `${options.yeoman.dist}/scripts/app.js`
            }
        }
    };
};
