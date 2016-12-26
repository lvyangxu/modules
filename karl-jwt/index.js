"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jwt = function () {
    function jwt(json) {
        _classCallCheck(this, jwt);

        var algorithm = json.algorithm,
            secret = json.secret;

        this.algorithm = algorithm == undefined ? "aes192" : algorithm;
        this.secret = secret;
    }

    _createClass(jwt, [{
        key: "encrypt",
        value: function encrypt(text) {
            var cipher = _crypto2.default.createCipher(this.algorithm, this.secret);
            var encrypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
    }, {
        key: "decrypt",
        value: function decrypt(text) {
            var decipher = _crypto2.default.createDecipher(this.algorithm, this.secret);
            var decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
    }, {
        key: "encryptJWT",
        value: function encryptJWT(header, payload, signature) {
            header = this.encrypt(JSON.stringify(header));
            payload = this.encrypt(JSON.stringify(payload));
            signature = this.encrypt(JSON.stringify(signature));
            var jwtString = header + "." + payload + "." + signature;
            return jwtString;
        }
    }, {
        key: "decryptJWT",
        value: function decryptJWT(encrypted) {
            var json = {};
            var arr = encrypted.split(".");
            if (arr.length != 2) {
                return json;
            }
            json = {
                header: this.decrypt(arr[0]),
                payload: this.decrypt(arr[1]),
                signature: this.decrypt(arr[2])
            };
            return json;
        }
    }]);

    return jwt;
}();

module.exports = jwt;
