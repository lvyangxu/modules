'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jwt = function () {
    function jwt(json) {
        _classCallCheck(this, jwt);

        var header = json.header,
            payload = json.payload,
            signature = json.signature;

        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }

    _createClass(jwt, [{
        key: 'encrypt',
        value: function encrypt(text, secret, algorithm) {
            if (algorithm == undefined) {
                algorithm = 'aes192';
            }
            var cipher = _crypto2.default.createCipher(algorithm, secret);
            var encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
    }, {
        key: 'decrypt',
        value: function decrypt(text, secret, algorithm) {
            if (algorithm == undefined) {
                algorithm = 'aes192';
            }
            var decipher = _crypto2.default.createDecipher(algorithm, secret);
            var decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
    }]);

    return jwt;
}();

module.exports = jwt;
