/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Formato = (function () {
	    function Formato() {
	        _classCallCheck(this, Formato);

	        // the default configuration
	        this.defaultConfig = {
	            precision: 2,
	            thousand: ',',
	            decimal: '.'
	        };
	    }

	    _createClass(Formato, [{
	        key: 'toFixed',

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
	    }, {
	        key: 'format',
	        value: function format(number, precision, thousand, decimal) {

	            // config
	            precision = precision ? precision : this.defaultConfig.precision;
	            thousand = thousand ? thousand : this.defaultConfig.thousand;
	            decimal = decimal ? decimal : this.defaultConfig.decimal;

	            // calculations
	            var negativeSign = number < 0 ? '-' : '';
	            var absNumber = Math.abs(number);

	            // whether the passed number is a floating point.
	            var isFloat = absNumber % 1 != 0;

	            // integer part. If the number is 3,000.23, the integerPart is 3000
	            var integerPart = isFloat ? parseInt(this.toFixed(absNumber, precision), 10) + '' : absNumber + '';

	            // the size of the greates thousand group
	            // example: For 12,345,00, the value is 12.
	            // the size will vary from 0 to 2
	            var greatestThousandGroupSize = integerPart.length > 3 ? integerPart.length % 3 : 0;

	            // format
	            return negativeSign + (greatestThousandGroupSize ? integerPart.substr(0, greatestThousandGroupSize) + thousand : '') + integerPart.substr(greatestThousandGroupSize).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (isFloat ? decimal + this.toFixed(absNumber, precision).split('.')[1] : '');
	        }
	    }]);

	    return Formato;
	})();

	exports['default'] = new Formato();
	module.exports = exports['default'];

/***/ }
/******/ ]);