class Formato {

    constructor() {
        // the default configuration
        this.defaultConfig = {
            precision: 2,
            thousand: ',',
            decimal: '.'
        }
    }

    /**
     * Rounds the given value
     * @param value
     * @param precision
     * @returns {string}
     */
    toFixed(value, precision) {
        precision = precision ? precision : this.defaultConfig.precision;
        var power = Math.pow(10, precision);
        return (Math.round(value * power) / power).toFixed(precision);
    }

    /**
     * Formats the given number to string
     * @param number
     * @param precision
     * @param thousand
     * @param decimal
     * @returns {string}
     */
    format(number, precision, thousand, decimal) {

        // config
        precision = precision ? precision : this.defaultConfig.precision;
        thousand = thousand ? thousand : this.defaultConfig.thousand;
        decimal = decimal ? decimal : this.defaultConfig.decimal;

        // calculations
        let negativeSign = number < 0 ? "-" : "";
        let absNumber = Math.abs(number);

        // whether the passed number is a floating point.
        let isFloat = absNumber % 1 != 0;

        // integer part. If the number is 3,000.23, the integerPart is 3000
        let integerPart = isFloat ? (parseInt(this.toFixed(absNumber, precision), 10) + "") : (absNumber + "");

        // the size of the greates thousand group
        // example: For 12,345,00, the value is 12.
        // the size will vary from 0 to 2
        let greatestThousandGroupSize = integerPart.length > 3 ? integerPart.length % 3 : 0;

        // format
        return negativeSign
            + (greatestThousandGroupSize ? integerPart.substr(0, greatestThousandGroupSize) + thousand : "")
            + integerPart.substr(greatestThousandGroupSize).replace(/(\d{3})(?=\d)/g, "$1" + thousand)
            + (isFloat ? decimal + this.toFixed(absNumber, precision).split('.')[1] : "");
    }
}

export default new Formato();