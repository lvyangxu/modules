import crypto from "crypto";

class jwt {

    constructor(json) {
        let {header, payload, signature} = json;
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }

    encrypt(text, secret, algorithm) {
        if (algorithm == undefined) {
            algorithm = 'aes192';
        }
        let cipher = crypto.createCipher(algorithm, secret);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(text, secret, algorithm) {
        if (algorithm == undefined) {
            algorithm = 'aes192';
        }
        let decipher = crypto.createDecipher(algorithm, secret);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}

module.exports = jwt;


