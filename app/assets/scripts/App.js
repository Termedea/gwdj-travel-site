var Person = require("./Modules/Person");
var $ = require('jquery');

var john = new Person ("John", "blue");
var jane = new Person ("Jane", "green");

john.greet();
jane.greet();

