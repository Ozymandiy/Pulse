const gulp        = require('gulp'),
			browserSync = require('browser-sync'),
			sass        = require('gulp-sass'),
			cleanCSS = require('gulp-clean-css'),
			autoprefixer = require('gulp-autoprefixer'),
			rename = require("gulp-rename"),
			concat = require("gulp-concat"),
			imagemin = require('gulp-imagemin'),
			htmlmin = require('gulp-htmlmin');

// Local Server
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
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

// all CSS in one file
gulp.task('stylecss', function() {
	return gulp.src([
		'src/libs/animate/animate.min.css',
		'src/css/bootstrap-reboot.min.css',
		'src/libs/bootstrap/css/bootstrap.min.css',
		'src/css/fonts.css',
		'src/libs/fontawesome/css/all.min.css',
		'src/css/slick.css',
		'src/css/main.min.css'
	], {allowEmpty: true})
	.pipe(concat('common.min.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
		'src/libs/bootstrap/js/bootstrap.min.js',
		'src/libs/jQuery/jquery-3.6.0.min.js',
		'src/libs/jquery-validation/jquery.validate.min.js',
		'src/libs/maskedinput/jquery.maskedinput.min.js',
		'src/libs/fontawesome/js/all.min.js',
		'src/libs/slick/slick.min.js',
		'src/libs/prognroll/prognroll.js',
		'src/libs/wow/wow.min.js',
		'src/js/common.js',
	], {allowEmpty: true})
	.pipe(concat('common.min.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});

// HTML
gulp.task('html', function(){
	return gulp.src("src/*.html")
	.pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist/'));
});

// fonts
gulp.task('fonts', function() {
	return gulp.src("src/fonts/**/*")
	.pipe(gulp.dest('dist/fonts'))
});

// icons
gulp.task('icons', function() {
	return gulp.src("src/icons/**/*")
	.pipe(gulp.dest('dist/icons'))
});

// mailer
gulp.task('mailer', function() {
	return gulp.src("src/mailer/**/*")
	.pipe(gulp.dest('dist/mailer'))
});

// compress images
gulp.task('images', function() {
	return gulp.src("src/img/**/*")
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
		gulp.watch("src/*.html").on('change', gulp.parallel('html'));
		gulp.watch(['src/libs/**/*.js', 'src/js/common.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'html', 'fonts', 'icons', 'mailer', 'images'));