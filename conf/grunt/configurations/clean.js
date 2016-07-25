module.exports = function getCleanConfig( grunt, options ){
    return {
        "dist": [ ".tmp", options.yeoman.dist ],
        "server": ".tmp"
    };
};
