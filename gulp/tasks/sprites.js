var gulp 		= 	require("gulp"),
	svgSprite 	=	require("gulp-svg-sprite"),
	rename 		= 	require("gulp-rename"), 
	del 		= 	require("del"),
	svg2png		= 	require("gulp-svg2png");


var spriteConfig =  {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function(){
					return function(sprite, render){
						return render(sprite).split(".svg").join(".png");
					}
				}
			},
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
		.pipe(gulp.dest("./app/tmp/sprite/")); //the css folder is created through config and should not be specified in the path

});

gulp.task("createPngCopy", ["createSprite"], function(){
	return gulp.src("./app/tmp/sprite/css/*.svg")
		.pipe(svg2png())
		.pipe(gulp.dest("./app/tmp/sprite/css"));
});

gulp.task("copySpriteGraphic", ["createPngCopy"], function(){
	return gulp.src("./app/tmp/sprite/css/**/*.{svg,png}")
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

gulp.task("icons", ["beginClean", "createSprite", "createPngCopy","copySpriteCSS", "copySpriteGraphic", "endClean"]);
