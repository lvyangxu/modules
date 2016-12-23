"use strict";

var _index = require("../karl-jwt/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h = _index2.default.encrypt("I love cupcakes", "abcdefg");
console.log(h);

var d = _index2.default.decrypt(h, "abcdefg");
console.log(d);
