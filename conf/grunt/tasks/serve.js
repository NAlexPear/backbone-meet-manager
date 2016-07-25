module.exports = function gruntServe( grunt ){
    "use strict";

    grunt.registerTask( "serve", function serveApplication(){
        grunt.task.run( [
            "build",
            "open:server",
            "connect:dist:keepalive"
        ] );

        grunt.task.run( [
            "clean:server",
            "connect:livereload",
            "open:server",
            "watch"
        ] );
    } );
};
