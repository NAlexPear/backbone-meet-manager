function mountFolder( connect, dir ){
    return connect.static( require( "path" ).resolve( dir ) );
}

module.exports = function getConnectConfig( grunt, options ){
    var lrSnippet = require( "connect-livereload" )( {
        "port": options.vars.livereloadport
    } );

    return {
        "options": {
            "port": grunt.option( "port" ) || options.vars.serverport,
            "hostname": "localhost"
        },
        "livereload": {
            "options": {
                "middleware": function connectMiddleware( connect ){
                    return [
                        lrSnippet,
                        mountFolder( connect, ".tmp" ),
                        mountFolder( connect, options.yeoman.app )
                    ];
                }
            }
        },
        "dist": {
            "options": {
                "middleware": function connectMiddleware( connect ){
                    return [
                        mountFolder( connect, options.yeoman.dist )
                    ];
                }
            }
        }
    };
};
