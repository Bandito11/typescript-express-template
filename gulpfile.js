
const { series, src, dest, parallel } = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const del = require('del');


const paths = {
    assets: {
        src: 'src/www/assets/**/*',
        dest: 'dist/www/assets'
    },
    styles: {
        src: 'src/www/**/*.css',
        dest: 'dist/www'
    },
    pages: {
        src: 'src/www/**/*.html',
        dest: 'dist/www'
    }
}

function assets() {
    return src(paths.assets.src)
        .pipe(dest(paths.assets.dest));
}

function styles() {
    return src(paths.styles.src)
        .pipe(dest(paths.styles.dest));
}

function pages() {
    return src(paths.pages.src)
        .pipe(dest(paths.pages.dest));
}


function clean() {
    return del(['dist']);
}

function buildWWW() {
    const tsProject = ts.createProject('src/www/tsconfig.json');
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(dest("dist/www/js"));
}

/**
 * Build for the server side.
 */
function buildServer() {
    const tsProject = ts.createProject('src/server/tsconfig.json');
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(dest('dist'));
}

// function watch() {
//     gulp.watch(paths.server.src, buildServer);
// }


/**
 *Start the node app
 */
async function debug() {
    return nodemon({
        script: 'dist/server.js',
        ext: 'ts',
        watch: 'src/server',
        tasks: ['build']
    });
}

exports.build = series(clean, parallel(pages, styles, assets), parallel(buildWWW, buildServer));
exports.default = series(clean, parallel(pages, styles, assets), parallel(buildWWW, buildServer), debug);