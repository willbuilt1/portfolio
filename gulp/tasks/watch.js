var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();
// Main task for development purposes
gulp.task('watch', function(){
// sets up browsersync
    browserSync.init({
        server:{
            baseDir: "app"
        }
    });
 // reloads on any change to HTML
    watch('./app/index.html', function() {
        browserSync.reload();
    })
 //injects new CSS without reloading on any change to CSS
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject');
    })
// refreshes cripts on any change to JS
    watch('./app/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    })
 });
// injects new CSS without reloading on any change to CSS
 gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
            .pipe(browserSync.stream())
});
// refreshes cripts on any change to JS
gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
});