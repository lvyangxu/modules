import jwt from "../karl-jwt/index";

let h = jwt.encrypt("I love cupcakes","abcdefg");
console.log(h);

let d = jwt.decrypt(h,"abcdefg");
console.log(d);
