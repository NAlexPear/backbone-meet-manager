module.exports = function gruntServe( grunt ){
    "use strict";

    grunt.registerTask( "build", [
        "clean:dist",
        "useminPrepare",
        "imagemin",
        "htmlmin",
        "cssmin",
        "babel:build",
        "requirejs",
        "concat",
        "uglify",
        "copy",
        "usemin"
    ] );
};
