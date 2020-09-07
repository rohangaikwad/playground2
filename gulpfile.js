const gulp = require('gulp');
//const babel = require('gulp-babel');
const rename = require('gulp-rename');
//const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('compile', (done) => {
    gulp.src('src/js/main.js')
        //.pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
    done();
})

gulp.task('style', (done) => {
    gulp.src(['src/scss/styles.scss'])
        //.pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('dist/css/'))        
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'));
        //.pipe(sourcemaps.write('.'))
    done();
});

gulp.task("default", () => {
    gulp.watch('src/js/main.js', gulp.parallel('compile'))
    gulp.watch('src/scss/styles.scss', gulp.series('style'))
});