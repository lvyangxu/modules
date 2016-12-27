let j = {a:1};
require("karl-extend");
let str = JSON.stringify(j);
console.log(JSON.parse(str));
console.log(str.toJson());