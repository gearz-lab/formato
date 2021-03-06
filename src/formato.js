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
     * Validates the options object
     * @param options
     * @returns {boolean}
     * @private
     */
    _validateOptions(options) {
        if(!options) {
            return true;
        }
        if((options.thousand && !options.decimal) || (!options.thousand && options.decimal)) {
            return false;
        }
        if (options.thousand && options.thousand === options.decimal) {
            return false;
        }
        if (options.thousand && !isNaN(options.thousand) || options.decimal && !isNaN(options.decimal)) {
            return false;
        }
        return true;
    }

    /**
     * Returns whether a number is float
     * @param number
     * @returns {boolean}
     * @private
     */
    _isFloat(number) {
        return number===Number(number)  && number%1!==0;
    }

    toFixed(value, precision) {
        var power = Math.pow(10, precision);
        return (Math.round(value * power) / power).toFixed(precision);
    }

    /**
     * Converts the given number string to a number. If the string is not a number,
     * return NaN
     * @param value
     * @param options
     * @returns {*}
     */
    unformat(value, options) {

        if(!this._validateOptions(options)) {
            throw new Error('Options passed to unformat are not valid. When specifing thousand, decimal should also be specified. Thousand cannot be equal to decimal. Thousand and decimal should not be numbers');
        }

        if(value === undefined || value === null) {
            return NaN;
        }

        let decimal = options && options.decimal ? options.decimal : this.defaultConfig.decimal;
        let thousand = options && options.thousand ? options.thousand : this.defaultConfig.thousand;

        // function that scapes a string to be used as regular expression
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        decimal = escapeRegExp(decimal);
        thousand = escapeRegExp(thousand);

        let processedValue = value.replace(new RegExp(thousand, 'g'), '');
        processedValue = processedValue.replace(decimal, '.');

        // this is important because parseFloat will convert '3a' to 3. Sigh :|
        if(isNaN(processedValue)) {
            return NaN;
        }

        return parseFloat(processedValue);
    }

    /**
     * Formats the given number to string
     * @param number
     * @param precision
     * @param thousand
     * @param decimal
     * @returns {string}
     */
    format(number, options) {

        // config
        let precision = options && (options.precision != undefined && options.precision != null ) ? options.precision : this.defaultConfig.precision;
        let thousand = options && options.thousand ? options.thousand : this.defaultConfig.thousand;
        let decimal = options && options.decimal ? options.decimal : this.defaultConfig.decimal;

        // calculations
        let negativeSign = number < 0 ? "-" : "";
        let absNumber = Math.abs(number);

        // whether the passed number is a floating point.
        let hasDecimalPart = precision > 0;

        // integer part. If the number is 3,000.23, the integerPart is 3000
        let integerPart = hasDecimalPart || this._isFloat(number) ? (parseInt(this.toFixed(absNumber, precision), 10) + "") : (absNumber + "");

        // the size of the greates thousand group
        // example: For 12,345,00, the value is 12.
        // the size will vary from 0 to 2
        let greatestThousandGroupSize = integerPart.length > 3 ? integerPart.length % 3 : 0;

        // format
        let result = negativeSign;
        result += (greatestThousandGroupSize ? integerPart.substr(0, greatestThousandGroupSize) + thousand : "");
        result += integerPart.substr(greatestThousandGroupSize).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
        result += (hasDecimalPart ? decimal + this.toFixed(absNumber, precision).split('.')[1] : "");

        return result;
    }
}

export default new Formato();