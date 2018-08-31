var gulp = require('gulp'), 
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify');

browserSync = require('browser-sync').create();
// Use to preview build version. Make sure Gulp Watch has compiled latest HTML, CSS and JS
gulp.task('previewProd', function(){

    browserSync.init({
        notify: false, // this removes notifications from top in sync
        server:{
            baseDir: "dist" 
        }
    });

});
// Deletes folder to replace with a fresh build.
gulp.task('deleteDistFolder', function(){
    return del('./dist');
});
// copy files to dist folder 
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]

    return gulp.src(pathsToCopy).pipe(gulp.dest('./dist'));
})
// takes files from image folder minimises and places them in the dist folder
gulp.task('optimiseImages',['deleteDistFolder'], function() {
    return gulp.src(['./app/assets/images/**/*'])
        .pipe(imageMin({
            progressive: true,
            interlaced: true,
            multipass:true,
        }))
        .pipe(gulp.dest('./dist/assets/images'))
})
// Minimizes css and html
// rev - returns a revision file number to ensure beats any caches
// cssnano and uglify - minimises css and js respectively.
gulp.task('usemin', ['deleteDistFolder'], function() {
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [function(){return rev()}, 
            function(){return cssnano()}], 
        js: [function(){return rev()},
            function(){return uglify()}]
    }))
    .pipe(gulp.dest('./dist'));
})

gulp.task('build', ['deleteDistFolder', 'optimiseImages', 'usemin', 'copyGeneralFiles']);