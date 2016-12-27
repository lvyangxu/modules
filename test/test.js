"use strict";

var j = { a: 1 };
require("karl-extend");
var str = JSON.stringify(j);
console.log(JSON.parse(str));
console.log(str.toJson());
