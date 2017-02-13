import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints"; //.modules/.. (scripts)/.. (assets)/.. (app)/.. (travel-site)
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader{

	constructor(){

		this.lazyImages = $(".lazyload");
		this.siteHeader = $(".site-header");
		this.headerTriggerElement = $(".large-hero__title");
		this.pageSections = $(".page-section");
		this.headerLinks = $(".primary-nav a");
		this.resetPageSectionWaypoints();
		this.createHeaderWaypoint();
		this.createPageSectionWaypoints("down", "18%");
		this.createPageSectionWaypoints("up", "-40%");		
		this.addSmoothScrolling();
		this.refreshWaypoints();
	}

	refreshWaypoints(){
		this.lazyImages.load(function(){
			Waypoint.refreshAll();
		});
	}

	addSmoothScrolling(){
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint(){		
		var obj = this; 
		new Waypoint({
			element: obj.headerTriggerElement[0],
			handler: function(direction){
				if(direction == "down"){
					obj.siteHeader.addClass("site-header--dark");
				}else{
					obj.siteHeader.removeClass("site-header--dark");
				}
			}
		});
	}

	resetPageSectionWaypoints(){
		this.headerLinks.removeClass("is-current-link");
		var obj = this; 
		new Waypoint({
			element: obj.headerTriggerElement[0],
			handler: function(direction){
				if(direction == "up"){
					obj.headerLinks.removeClass("is-current-link");
				}
			},
			offset: "-30%"
		});

	}

	createPageSectionWaypoints(dir, offset){

		var obj = this;

		this.pageSections.each(function(){
			var pageSection = this;
			new Waypoint({
				element: pageSection,
				handler: function(direction){

					if(direction == dir){
						var matchingHeaderLink = pageSection.getAttribute("data-link");
						obj.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");						
					}
				},
				offset: offset
			});
		});		
	}
}
export default StickyHeader