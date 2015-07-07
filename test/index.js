//import Chai from 'Chai';
//const assert = Chai.assert;

import formato from '../src/formato.js';
import Chai from 'Chai';
let assert = Chai.assert;

describe('toFixed', function() {
    it('int - normal precision', function() {
        assert.equal(formato.toFixed(2, 2), '2.00');
    });
    it('int - zero precision', function() {
        assert.equal(formato.toFixed(2, 0), '2');
    });
    it('float - normal precision', function() {
        assert.equal(formato.toFixed(2.2, 2), '2.20');
    });
    it('float - zero precision', function() {
        assert.equal(formato.toFixed(2.2, 0), '2');
    })
})

describe('unformat', function() {
    it('int', function() {
       assert.equal(formato.unformat('1,000,000'),1000000 );
    });
    it('int with precision', function() {
        assert.equal(formato.unformat('1,000,000.000', { precision: 3}),1000000 );
    });
    it('float', function() {
        assert.equal(formato.unformat('2.33'), 2.33);
    });
    it('float with thousand', function() {
        assert.equal(formato.unformat('2,000.23'), 2000.23);
    });
    it('float with thousand used incorrectly', function() {
        assert.equal(formato.unformat('2,33'), 233);
    });
    it('float with thousand used incorrectly with decimal and thousand inverted', function() {
        assert.equal(formato.unformat('2.33', { decimal: ',', thousand: '.'}), 233);
    });
    it('float with custom decimal point', function() {
        assert.equal(formato.unformat('2,33', { decimal: ',', thousand: '.'}), 2.33);
    });
    it('Returns NaN whe not a number - string', function() {
        assert.ok(isNaN(formato.unformat('andre')));
    });
    it('Returns NaN whe not a number - number containing a character', function() {
        assert.ok(isNaN(formato.unformat('238a2')));
    });
    it('Returns NaN whe not a number - space', function() {
        assert.ok(isNaN(formato.unformat(' ')));
    });
    it('Returns NaN whe not a number - empty string', function() {
        assert.ok(isNaN(formato.unformat('')));
    });
    it('Returns NaN whe not a number - undefined', function() {
        assert.ok(isNaN(formato.unformat(undefined)));
    });
    it('Returns NaN whe not a number - null', function() {
        assert.ok(isNaN(formato.unformat(undefined)));
    });


});

describe('format', function() {
    it('int', function() {
        assert.equal(formato.format(1000), '1,000.00');
    });
    it('int without precision', function() {
        assert.equal(formato.format(1000, { precision: 0 }), '1,000');
    });
    it('int with precision', function() {
        assert.equal(formato.format(200, {precision: 2}), '200.00');
    });
    it('float, not passing precision', function() {
        assert.equal(formato.format(1000.2), '1,000.20');
    });
    it('float, passing precision', function() {
        assert.equal(formato.format(1000.2, { precision: 3 }), '1,000.200');
    });
    it('float, zero precision', function() {
        assert.equal(formato.format(1000.2, { precision: 0 }), '1,000');
    });
});