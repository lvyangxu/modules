import crypto from "crypto";

class jwt {

    constructor(json) {
        let {algorithm, secret} = json;
        this.algorithm = (algorithm == undefined) ? "aes192" : algorithm;
        this.secret = secret;
    }

    encrypt(text) {
        let cipher = crypto.createCipher(this.algorithm, this.secret);
        let encrypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(text) {
        let decipher = crypto.createDecipher(this.algorithm, this.secret);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    encryptJWT(header, payload, signature) {
        header = this.encrypt(JSON.stringify(header));
        payload = this.encrypt(JSON.stringify(payload));
        signature = this.encrypt(JSON.stringify(signature));
        let jwtString = header + "." + payload + "." + signature;
        return jwtString;
    }

    decryptJWT(encrypted) {
        let json = {};
        let arr = encrypted.split(".");
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

}

module.exports = jwt;


