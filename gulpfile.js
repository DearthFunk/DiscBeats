let gulp = require('gulp');
let del = require('del');
let concat = require('gulp-concat');
let templateCache = require('gulp-angular-templatecache');
let concatCss = require('gulp-concat-css');
let path = require('path');

let fp = {
    resources: [
      'favicon.gif',
      'favicon.ico',
      'background.png'
    ],
    lib: [
        './node_modules/tunajs/tuna-min.js',
        './node_modules/angular/angular.min.js'
    ],
    samples: [
        './samples/**/*.mp3',
        './node_modules/tunajs/impulses/*.wav'
    ],
    main_js: [
        './js/**/*.js',
        './directives/**/*.js',
        './elements/**/*.js'
    ],
    main_templates: [
        './directives/**/*.html',
        './elements/**/*.html'
    ],
    main_styles: [
        './css/**/*.css',
        './directives/**/*.css',
        './elements/**/*.css'
    ],
};

//////////////////////////////////////////////////////////////////////////////

function main_js(){
    return gulp
        .src(fp.main_js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
}
function main_templates(){
    return gulp
        .src(fp.main_templates, {base: path.join(__dirname, './')})
        .pipe(templateCache('partials.js',{
            module: 'discBeats',
            root: 'CACHE/'
        }))
        .pipe(gulp.dest('dist'));
}
function main_styles(){
    return gulp
        .src(fp.main_styles)
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest('dist'));
}

///////////////////////////////////////////////////////////////////////////////

function clean(){
    return del('./dist/**/*');
}
function samples(){
    return gulp
        .src(fp.samples)
        .pipe(gulp.dest('./dist/samples'));
}
function libs(){
    return gulp
        .src(fp.lib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist'));
}
function resources(){
    return gulp
        .src(fp.resources)
        .pipe(gulp.dest('./dist'));
}
function watch_all(){
    gulp.watch(fp.main_js, gulp.parallel('main_js'));
    gulp.watch(fp.main_templates, gulp.parallel('main_templates'));
    gulp.watch(fp.main_styles, gulp.parallel('main_styles'));
}

//////////////////////////////////////////////////////////////////////////////

const main = gulp.series(main_js, main_templates, main_styles);
const build = gulp.series(clean, samples, libs, resources, main);

exports.main_js = main_js;
exports.main_styles = main_styles;
exports.main_templates = main_templates;

exports.clean = clean;
exports.main = main;
exports.build = build;
exports.default = build;
exports.watch = gulp.series(main, watch_all);