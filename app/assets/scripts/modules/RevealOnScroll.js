import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints"; //.modules/.. (scripts)/.. (assets)/.. (app)/.. (travel-site)

class RevealOnScroll{

	constructor(itemsToReveal, offset){
		this.itemsToReveal = itemsToReveal;
		this.offset = offset;

		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially(){
		this.itemsToReveal.addClass("reveal-item");
		this.itemsToReveal.removeClass("reveal-item--is-visible");
	}

	createWaypoints(){

		var offset = this.offset; 
		this.itemsToReveal.each(function(){
			
			var currentItem = this;

			new Waypoint({
				element: currentItem,
				handler: function(){
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: offset
			});
		});
	}
}

export default RevealOnScroll;