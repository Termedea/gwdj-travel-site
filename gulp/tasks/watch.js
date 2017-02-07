var gulp 			= require("gulp"),
	watch 			= require("gulp-watch"),
	browserSync		= require("browser-sync").create();


gulp.task("watch", function(){
	
	browserSync.init({
		server:{
			baseDir: "app"
		},
		notify: false; 
	});

	watch("./app/index.html", function(){
		browserSync.reload();
	}); //Two arguments 1. file to monitor for changes, 2. function with what we want to do, i.e. run a task. 

	watch("./app/assets/styles/**/*.css", function(){
		gulp.start("cssInject");

	}); //the directory notation '**' matches 0 or many directories, which makes it watch any future folders, if any.
});

gulp.task("cssInject", ['styles'], function(){ //styles is a dependecy of the cssInject task. The cssInject task will not start before styles is complete. 
	return gulp.src("./app/tmp/styles/styles.css")
			.pipe(browserSync.stream());

});