var gulp = require('gulp'),
webpack = require('webpack');

// Using webpack compiles new ES6 into ES5

gulp.task('scripts', function(callback){
    webpack(require('../../webpack.config.js'), function(err, stats){
        if(err){
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    })
})