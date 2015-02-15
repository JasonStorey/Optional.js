var assert = require('assert'),
	Optional = require('../.'),
	OptionalConstructor = require('../lib/optional.js');

describe('Optional.js', function() {
    var nonNullValue,
        nullValue,
        undefinedValue;

    beforeEach(function() {
        nonNullValue = 'a non-null value';
        nullValue = null;
        undefinedValue = undefined;
    });

	describe('implements static methods', function() {

		it('.empty() returns an empty Optional instance with no set value', function() {
			var emptyOptional = Optional.empty();
        	
        	assert(emptyOptional instanceof OptionalConstructor);
        	assert.strictEqual(emptyOptional._value, undefined);
    	});

		it('.of() returns an Optional describing the specified non-null value', function() {
			var optional = Optional.of(nonNullValue);

        	assert(optional instanceof OptionalConstructor);
        	assert.strictEqual(optional._value, nonNullValue);
    	});

		it('.of() throws an exception if value is not defined', function() {
        	assert.throws(function() { Optional.of(undefinedValue); }, /NullPointerException : value is not defined/);
    	});

		it('.of() throws an exception if value is null', function() {
        	assert.throws(function() { Optional.of(nullValue); }, /NullPointerException : value is not defined/);
    	});

    	it('.ofNullable() returns an Optional describing the specified non-null value', function() {
			var optional = Optional.ofNullable(nonNullValue);
        	
        	assert(optional instanceof OptionalConstructor);
        	assert.strictEqual(optional._value, nonNullValue);
    	});

    	it('.ofNullable() returns an empty Optional when value is not defined', function() {
			var optional = Optional.ofNullable(undefinedValue);

        	assert(optional instanceof OptionalConstructor);
        	assert.strictEqual(optional._value, undefined);
    	});
	});

    describe('implements instance methods', function() {
        var emptyOptional;

        beforeEach(function() {
            emptyOptional = Optional.empty();
        });

        it('.get() returns value if present in Optional', function() {
            var nonNullOptional = Optional.of(nonNullValue);

            assert.strictEqual(nonNullOptional.get(), nonNullValue);
        });

        it('.get() throws an exception if Optional is empty', function() {
            assert.throws(function() { emptyOptional.get(); }, /NoSuchElementException : Optional is empty/);
        });

        it('.isPresent() returns true if Optional contains value', function() {
            var nonNullOptional = Optional.of(nonNullValue);

            assert(nonNullOptional.isPresent());
        });

        it('.isPresent() returns false if Optional is empty', function() {
            assert(!emptyOptional.isPresent());
        });
    });
});
