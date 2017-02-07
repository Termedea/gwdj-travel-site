var gulp 		= 	require("gulp"),
	svgSprite 	=	require("gulp-svg-sprite"),
	rename 		= 	require("gulp-rename"), 
	del 		= 	require("del");


var spriteConfig =  {
	mode: {
		css: {
			sprite: "sprite.svg",
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task("beginClean", function(){
	return del(["./app/tmp/sprite", "./app/assets/images/sprites"]);

});

gulp.task("createSprite", ["beginClean"], function(){

	return gulp.src("./app/assets/images/icons/**/*") /*everything, including current and future subfolders within the icons folder.*/
		.pipe(svgSprite(spriteConfig))
		.pipe(gulp.dest("./app/tmp/sprite/"));

});

gulp.task("copySpriteGraphic", ["createSprite"], function(){
	return gulp.src("./app/tmp/sprite/css/**/*.svg")
		.pipe(gulp.dest("./app/assets/images/sprites"));
});

gulp.task("copySpriteCSS", ["createSprite"], function(){
	return gulp.src("./app/tmp/sprite/css/*.css")
		.pipe(rename("_sprite.css"))
		.pipe(gulp.dest("./app/assets/styles/base"));
});

gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], function(){
	return del(["./app/tmp/sprite"]);
});

gulp.task("icons", ["beginClean", "createSprite", "copySpriteCSS", "copySpriteGraphic", "endClean"]);
