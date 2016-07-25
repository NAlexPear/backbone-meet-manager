module.exports = function getOpenConfig( grunt, options ){
    return {
        "server": {
            "path": "http://localhost:" + grunt.option( "port" ) || options.vars.serverport
        }
    };
};
