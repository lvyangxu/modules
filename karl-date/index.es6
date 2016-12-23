
class date {
    /**
     * 判断是否是闰年
     * @param year
     * @returns {boolean}
     */
    static isLeapYear(year) {
        if (year % 4 != 0) {
            return false;
        }
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * 根据年和月获取当月的天数
     * @param year
     * @param month
     * @returns {number}
     */
    static getDaysOfMonth(year, month) {
        let days = 30;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                days = 31;
                break;
            case 2:
                if (this.isLeapYear(year)) {
                    days = 29;
                } else {
                    days = 28;
                }
                break;
        }
        return days;
    }

    /**
     * 根据年和月获取上个月的天数
     * @param year
     * @param month
     * @returns {number}
     */
    static getDaysOfLastMonth(year, month) {
        if (month == 1) {
            year--;
            month = 12;
        } else {
            year = year;
            month--;
        }
        let days = this.getDaysOfMonth(year, month);
        return days;
    }
}

module.exports = date;