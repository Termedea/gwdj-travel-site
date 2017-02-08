class Person {

	constructor(name, favColor){
		this.name = name;
		this.favColor = favColor;
	}
	
	greet(){
		console.log("Hi there, my name is " +this.name+ " and my favorite color is " +this.favColor);
	}
};

module.exports = Person;
