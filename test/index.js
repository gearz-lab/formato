//import Chai from 'Chai';
//const assert = Chai.assert;

import formato from '../src/formato.js';
import Chai from 'Chai';
let assert = Chai.assert;

describe('toFixed', function() {
    it('Something', function() {
        assert.equal(2.23, formato.toFixed(2.234));
    })
});

describe('Format', function() {
    it('Integer', function() {
        assert.equal('1,000', formato.format(1000));
    });
    it('Float, not passing precision', function() {
        assert.equal('1,000.20', formato.format(1000.2));
    });
    it('Float, passing precision', function() {
        assert.equal('1,000.200', formato.format(1000.2, 3));
    })
});