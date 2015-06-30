"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Formato = (function () {
    function Formato() {
        _classCallCheck(this, Formato);

        // the default configuration
        this.defaultConfig = {
            precision: 2,
            thousand: ",",
            decimal: "."
        };
    }

    _createClass(Formato, {
        toFixed: {

            /**
             * Rounds the given value using the given precision
             * @param value
             * @param precision
             * @returns {string}
             */

            value: function toFixed(value, precision) {
                precision = precision ? precision : this.defaultConfig.precision;
                var power = Math.pow(10, precision);
                return (Math.round(value * power) / power).toFixed(precision);
            }
        },
        format: {
            value: function format(number, precision, thousand, decimal) {

                // config
                precision = precision ? precision : this.defaultConfig.precision;
                thousand = thousand ? thousand : this.defaultConfig.thousand;
                decimal = decimal ? decimal : this.defaultConfig.decimal;

                // calculations
                var negativeSign = number < 0 ? "-" : "";
                var absNumber = Math.abs(number);

                // whether the passed number is a floating point.
                var isFloat = absNumber % 1 != 0;

                // integer part. If the number is 3,000.23, the integerPart is 3000
                var integerPart = isFloat ? parseInt(this.toFixed(absNumber, precision), 10) + "" : absNumber + "";

                // the size of the greates thousand group
                // example: For 12,345,00, the value is 12.
                // the size will vary from 0 to 2
                var greatestThousandGroupSize = integerPart.length > 3 ? integerPart.length % 3 : 0;

                // format
                return negativeSign + (greatestThousandGroupSize ? integerPart.substr(0, greatestThousandGroupSize) + thousand : "") + integerPart.substr(greatestThousandGroupSize).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (isFloat ? decimal + this.toFixed(absNumber, precision).split(".")[1] : "");
            }
        }
    });

    return Formato;
})();

module.exports = new Formato();