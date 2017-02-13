var gulp 			= 	require("gulp"),
	imagemin 		=	require("gulp-imagemin"),
	del 			= 	require("del"),
	usemin 			= 	require("gulp-usemin"),
	rev 			= 	require("gulp-rev"),
	cssnano 		= 	require("gulp-cssnano"),
	uglify			= 	require("gulp-uglify"),
	browserSync		=	require("browser-sync").create();


gulp.task("previewBuild", function(){
	browserSync.init({
		server:{
			baseDir: "docs"
		},
		notify: false
	});

});

gulp.task("deleteDistFolder", ["icons"], function(){
	return del("./docs");
});

gulp.task("copyGeneralFiles", ["deleteDistFolder"], function(){
	var pathsToCopy = [
		"./app/**/*",
		"!./app/index.html",
		"!./app/images/**/*",
		"!./app/assets/images/**",
		"!./app/assets/styles/**",
		"!./app/assets/scripts/**",
		"!./app/tmp/",
		"!./app/tmp/**",
	];

	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages", ["deleteDistFolder"], function(){
	return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"]) /*array for more than one source. Exclamation point means exclusion of certain path*/
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("useminTrigger", ["deleteDistFolder"], function(){
	gulp.start("usemin");
});

gulp.task("usemin", ["styles", "scripts"], function(){
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [/*rev*/function(){return rev();}, /*compression*/function(){return cssnano();}],
			js: [/*rev*/function(){return rev();}, /*compression*/function(){return uglify();}]
		}))
		.pipe(gulp.dest("./docs"));
});

//group tasks for all the build-tasks
gulp.task("build", ["deleteDistFolder", "copyGeneralFiles", "optimizeImages", "useminTrigger"]);