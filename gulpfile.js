var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require('gulp-nodemon');

/**
* Compile the .ts files to .js and send all the files to a folder 
* ready for production build
*/
gulp.task('build', function () {
    var tsProject = ts.createProject('tsconfig.json');
    console.log('Compiling!');
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('www', function () { 
gulp.src('src/www/**/*')
.pipe(gulp.dest('dist/www'));
});

/**
*Start the node app
*/
gulp.task('start', ['www', 'build'], function () {
    var stream = nodemon({
        script: 'dist/server.js',
        ext: '*',
        watch: 'src',
        tasks: ['build', 'www'],
    });
    return stream;
});


gulp.task('default', ['start']);

