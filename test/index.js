import Chai from 'Chai';
const assert = Chai.assert;

describe('Something high-level', function() {
    describe('Something low-level', function() {
        assert.equal(1, 1);
    });
});