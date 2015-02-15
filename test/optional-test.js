var assert = require('assert'),
	Optional = require('../.'),
	OptionalConstructor = require('../lib/optional.js');

describe('Optional.js', function() {
	describe('implements static methods', function() {

		it('.empty() returns an empty Optional instance with no set value', function() {
			var emptyOptional = Optional.empty();
        	
        	assert(emptyOptional instanceof OptionalConstructor);
        	assert.strictEqual(emptyOptional._value, undefined);
    	});

		it('.of() returns an Optional describing the specified non-null value', function() {
			var nonNullValue = 'this is a non-null value',
				optional = Optional.of(nonNullValue);

        	assert(optional instanceof OptionalConstructor);
        	assert.strictEqual(optional._value, nonNullValue);
    	});

		it('.of() throws an exception if value is not defined', function() {
			var undefinedValue;

        	assert.throws(function() { Optional.of(undefinedValue); }, /NullPointerException : value is not defined/);
    	});

		it('.of() throws an exception if value is null', function() {
			var nullValue = null;

        	assert.throws(function() { Optional.of(nullValue); }, /NullPointerException : value is not defined/);
    	});

    	it('.ofNullable() returns an Optional describing the specified non-null value', function() {
			var nonNullValue = 'this is a non-null value',
				optional = Optional.ofNullable(nonNullValue);
        	
        	assert(optional instanceof OptionalConstructor);
        	assert.strictEqual(optional._value, nonNullValue);
    	});

    	it('.ofNullable() returns an empty Optional when value is not defined', function() {
			var undefinedValue,
				optional = Optional.ofNullable(undefinedValue);

        	assert(optional instanceof OptionalConstructor);
        	assert.strictEqual(optional._value, undefined);
    	});
	});

    describe('implements instance methods', function() {

        it('.get() returns value if present in Optional', function() {
            var nonNullValue = 'a non-null value',
                optional = Optional.of(nonNullValue);

            assert.strictEqual(optional.get(), nonNullValue);
        });

        it('.get() throws an exception if Optional is empty', function() {
            var emptyOptional = Optional.empty();

            assert.throws(function() { emptyOptional.get(); }, /NoSuchElementException : Optional is empty/);
        });

    });
});
