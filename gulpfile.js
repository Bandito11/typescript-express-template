let gulp = require("gulp");
let ts = require("gulp-typescript");
let nodemon = require('gulp-nodemon');
let del = require('del');

gulp.task('clean', function (done) {
    return del(['libs', 'assets', 'styles', 'pages', 'build:www', 'build:server'], done);
});

/**
 * If using github Pages
 */
// gulp.task('gitPages', function () {     gulp.src('dist/www/**/*')
// .pipe(gulp.dest('docs'));     });

/**
 * TODO: Build for the front end
 * WIP :(
//  */

gulp.task('build:www', function () {
    let tsProject = ts.createProject('src/www/tsconfig.json');
    console.log('Compiling www!');
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("dist/www/js"));
});

gulp.task('assets', function () {
    gulp.src('src/www/assets/**/*')
        .pipe(gulp.dest('dist/www/assets'));
});

gulp.task('styles', function () {
    gulp.src('src/www/**/*.css')
        .pipe(gulp.dest('dist/www'));
});

gulp.task('pages', function () {
    gulp.src('src/www/**/*.html')
        .pipe(gulp.dest('dist/www'));
});

gulp.task('watch', function () {
    gulp.watch('src/www/assets/**/*', ['assets']);
    gulp.watch('src/www/**/*.css', ['styles']);
    gulp.watch('src/www/**/*.html', ['pages']);
    gulp.watch('src/www/**/*.ts', ['build:www']);
    gulp.watch('src/server/**/*.ts', ['build:server']);
});

gulp.task('heroku-watch', function () {
    gulp.watch('src/www/assets/**/*', ['assets']);
    gulp.watch('src/www/**/*.css', ['styles']);
    gulp.watch('src/www/**/*.html', ['pages']);
    gulp.watch('src/www/**/*.ts', ['build:www']);
    gulp.watch('src/server/**/*.ts', ['build:server']);
});
/**
 * Import front end libs from node_modules
 */

gulp.task('libs', function () {
    gulp
        .src('node_modules/lokijs/build/lokijs.min.js')
        .pipe(gulp.dest('dist/www/libs'));

    gulp
        .src('src/www/**/*.js')
        .pipe(gulp.dest('dist/www'));
});

/**
* Build for the server side.
*/
gulp.task('build:server', function () {
    let tsProject = ts.createProject('src/server/tsconfig.json');
    console.log('Compiling server!');
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("dist"));
});

/**
*Start the node app
*/
gulp.task('start', ['clean', 'watch'], function () {
    let stream = nodemon({
        script: 'dist/server.js',
        ext: 'ts',
        watch: 'src/server'
    });
    return stream;
});

gulp.task('default', ['start']);
