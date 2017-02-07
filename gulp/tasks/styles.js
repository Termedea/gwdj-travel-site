var gulp 			= require("gulp"),
	postCSS 		= require("gulp-postcss"),
	autoprefixer 	= require("autoprefixer"),
	cssVars			= require("postcss-simple-vars"),
	cssNested		= require("postcss-nested"),
	cssImport		= require("postcss-import"),
	cssMixins		= require("postcss-mixins"),
	cssHexRGBA		= require("postcss-hexrgba");


gulp.task("styles", function(){
	//convert dev css-structure to styles.css via PostCss-plugins
	return gulp.src("./app/assets/styles/styles.css")
				.pipe(postCSS([cssImport, cssMixins, cssVars, cssNested, cssHexRGBA, autoprefixer]))
				.on("error", function(err){
					console.log("An error occured \n" +err.toString());
					this.emit("end");
				})
				.pipe(gulp.dest("./app/tmp/styles"));
});