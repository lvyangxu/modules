require("karl-extend");

class cookie{

    /**
     * get cookie
     * @param cookieName
     * @returns {string}
     */
    static get(cookieName) {
        let result = "";
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(cookieName + "=");
            if (c_start != -1) {
                c_start = c_start + cookieName.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                result = document.cookie.substring(c_start, c_end);
            }
        }
        return result;
    }

    /**
     * set cookie
     * @param cookieName
     * @param cookieValue
     * @param expiredays default 30 days
     */
    static set(cookieName, cookieValue, expiredays) {
        let exdate = new Date();
        expiredays = expiredays || 30;
        exdate.setDate(exdate.getDate() + expiredays);
        let exdateStr = (expiredays == null) ? "" : ";expires=" + exdate.toGMTString();
        cookieValue = cookieValue.md5Encode();
        document.cookie = cookieName + "=" + cookieValue + exdateStr+";path=/";
    }

}

module.exports = cookie;