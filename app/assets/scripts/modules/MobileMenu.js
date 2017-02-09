import $ from "jquery";

class MobileMenu{

	constructor(){
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");

		this.events();
	}

	events(){
		//needs to bind 'this' to the toggle menu so that the callback know that 'this' refers to this object. 
		this.menuIcon.click(this.toggleMenu.bind(this));
		
	}

	toggleMenu(){
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}

}


export default MobileMenu;