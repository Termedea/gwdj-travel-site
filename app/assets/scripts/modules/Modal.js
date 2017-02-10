import $ from "jquery";

class Modal{

	constructor(){
		this.openModalButtons = $(".open-modal");
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");
		this.events();
	}

	events(){

		var obj = this;
		//Clicking any open modal button
		
		this.openModalButtons.click(this.openModal.bind(this));

		//Clicking the X-close modal button
		this.closeModalButton.click(this.closeModal.bind(this));

		//pushes any key
		$(document).keyup(this.keyPressHandler.bind(this));

	}

	keyPressHandler(e){
		if(e.keyCode == 27){
			this.closeModal();
		}
	}

	openModal(){
		this.modal.addClass("modal--is-visible");
		return false;

	}

	closeModal(){
		this.modal.removeClass("modal--is-visible");
		return false;
	}
}

export default Modal;