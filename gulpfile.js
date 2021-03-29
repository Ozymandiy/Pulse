const gulp        = require('gulp'),
			browserSync = require('browser-sync'),
			sass        = require('gulp-sass'),
			cleanCSS = require('gulp-clean-css'),
			autoprefixer = require('gulp-autoprefixer'),
			rename = require("gulp-rename"),
			concat = require("gulp-concat");

// Local Server
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Sass|Scss Styles
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
		'src/libs/bootstrap/js/bootstrap.bundle.min.js',
		'src/libs/jQuery/jquery-3.6.0.min.js',
		'src/libs/fontawesome/js/all.min.js',
		'src/libs/slick/slick.min.js',
		'src/libs/prognroll/prognroll.js',
		'src/js/common.js',
	], {allowEmpty: true})
	.pipe(concat('common.min.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
		gulp.watch(['src/libs/**/*.js', 'src/js/common.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts'));