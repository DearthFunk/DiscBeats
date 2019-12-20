let gulp = require('gulp');
let del = require('del');
let concat = require('gulp-concat');
let templateCache = require('gulp-angular-templatecache');
let concatCss = require('gulp-concat-css');
let path = require('path');

const interval_time = 500;

let fp = {
    resources: [
      'favicon.gif',
      'favicon.icon',
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

gulp.task('main_js', function(){
    return gulp
        .src(fp.main_js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});
gulp.task('main_templates', function(){
    return gulp
        .src(fp.main_templates, {base: path.join(__dirname, './')})
        .pipe(templateCache('partials.js',{
            module: 'discBeats',
            root: 'CACHE/'
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('main_styles', function(){
    return gulp
        .src(fp.main_styles)
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest('dist'));
});
gulp.task('main', gulp.series('main_js', 'main_templates', 'main_styles'));

///////////////////////////////////////////////////////////////////////////////

gulp.task('clear', function(){
    return del('./dist/**/*');
});

gulp.task('samples', function(){
    return gulp
        .src(fp.samples)
        .pipe(gulp.dest('dist/samples'));
});

gulp.task('libs', function(){
    return gulp
        .src(fp.lib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist'));
});

///////////////////////////////////////////////////////////////
gulp.task('build', gulp.parallel(
    'main',
    'samples',
    'libs'
));

gulp.task('default', gulp.series('clear', 'build'));

gulp.task('watch', gulp.series('default'), function(){
    console.log('WATCHING!!!!!!');
    gulp.watch(fp.main_js, {interval: interval_time}, gulp.parallel('main_js'));
    gulp.watch(fp.main_templates, {interval: interval_time}, gulp.parallel('main_templates'));
    gulp.watch(fp.main_styles, {interval: interval_time}, gulp.parallel('main_styles'));
});

//////////////////////////////////////////////////////////////////////////////
