module.exports = function getCopyConfig( grunt, options ){
    return {
        "dist": {
            "files": [
                {
                    "expand": true,
                    "dot": true,
                    "cwd": options.yeoman.app,
                    "dest": options.yeoman.dist,
                    "src": [
                        "*.{ico,txt}",
                        "images/{,*/}*.{webp,gif}",
                        "styles/fonts/{,*/}*.*",
                    ]
                },
                {
                    "src": `${options.yeoman.app}/index.js`,
                    "dest": `${options.yeoman.dist}/index.js`
                },
                {
                    "src": "node_modules/apache-server-configs/dist/.htaccess",
                    "dest": `${options.yeoman.dist}/.htaccess`
                },
                {
                    "src": "node_modules/requirejs/require.js",
                    "dest": `${options.yeoman.dist}/vendor/require.js`
                },
                {
                    "src": "node_modules/milligram/dist/milligram.css",
                    "dest": `${options.yeoman.dist}/vendor/milligram.css`
                }
            ]
        }
    };
};
