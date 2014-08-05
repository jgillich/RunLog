var gulp        = require('gulp'),
    browserify  = require('gulp-browserify'),
    rework      = require('gulp-rework'),
    rename      = require('gulp-rename'),
    livereload  = require('gulp-livereload'),
    svg2png     = require('gulp-svg2png'),
    rimraf      = require('rimraf'),
    connect     = require('connect'),
    serveStatic = require('serve-static'),
    runSequence = require('run-sequence'),
    myth        = require('myth'),
    reworkUrl   = require('rework-plugin-url'),
    reworkImport = require('rework-import');

gulp.task('js', function () {
    return gulp.src('app.js')
        .pipe(browserify({
            transform: ['es6ify'],
            debug : true
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('css', function () {
    return gulp.src('app.css')
        .pipe(
            rework(
                reworkImport(),
                myth(),
                reworkUrl(function (url) { return url.replace('../fonts/ratchicons', './fonts/ratchicons'); })
            )
        )
        .pipe(gulp.dest('build/'));
});

gulp.task('html', function () {
    return gulp.src('app.html').pipe(rename('index.html')).pipe(gulp.dest('build/'));
});

gulp.task('icon', function () {
    return gulp.src('icon.svg').pipe(svg2png()).pipe(gulp.dest('build/'));
});

gulp.task('fonts', function () {
    return gulp.src('./node_modules/ratchet/dist/fonts/*').pipe(gulp.dest('build/fonts/'));
});

gulp.task('rimraf', function (callback) {
    rimraf('build/', callback);
});

gulp.task('build', function (callback) {
    runSequence('rimraf', ['js', 'css', 'html', 'fonts', 'icon'], callback);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('build/**').on('change', livereload.changed);
    gulp.watch('lib/**', ['js']);
    gulp.watch('app.*', ['build']);
});

gulp.task('dev', ['watch', 'build'], function(callback) {
    connect().use(serveStatic('build/')).listen(process.env.PORT || 8080, callback);
});
