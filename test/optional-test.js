var assert = require('assert'),
	Optional = require('../.'),
	OptionalConstructor = require('../lib/optional.js');

describe('Optional.js', function() {
    var nonNullValue,
        nullValue,
        undefinedValue;

    beforeEach(function() {
        nonNullValue = 100;
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
        var emptyOptional,
            nonNullOptional;

        beforeEach(function() {
            emptyOptional = Optional.empty();
            nonNullOptional = Optional.of(nonNullValue);
        });

        it('.get() returns value if present in Optional', function() {
            assert.strictEqual(nonNullOptional.get(), nonNullValue);
        });

        it('.get() throws an exception if Optional is empty', function() {
            assert.throws(function() { emptyOptional.get(); }, /NoSuchElementException : Optional is empty/);
        });

        it('.isPresent() returns true if Optional contains value', function() {
            assert(nonNullOptional.isPresent());
        });

        it('.isPresent() returns false if Optional is empty', function() {
            assert(!emptyOptional.isPresent());
        });

        it('.ifPresent() executes consumer with value if Optional contains value', function() {
            var consumerCalled = false,
                passedValue;

            nonNullOptional.ifPresent(function consumer(value) { 
                consumerCalled = true;
                passedValue = value;
            });

            assert(consumerCalled);
            assert.strictEqual(passedValue, nonNullValue);
        });

        it('.ifPresent() does not execute consumer if Optional is empty', function() {
            var consumerCalled = false;

            emptyOptional.ifPresent(function consumer(value) { 
                consumerCalled = true;
            });

            assert(!consumerCalled);
        });

        it('.ifPresent() throws an exception if Optional contains a value and consumer is not a function', function() {
            assert.throws(function() { nonNullOptional.ifPresent('not a function'); }, /NullPointerException : consumer is not a function/);
        });

        it('.filter() returns a new Optional describing the value if predicate returns true', function() {
            var filteredOptional = nonNullOptional.filter(function predicate(value) { 
                return value === nonNullValue;
            });

            assert(filteredOptional !== nonNullOptional);
            assert.strictEqual(filteredOptional.get(), nonNullValue);
        });

        it('.filter() returns an empty Optional if predicate returns false', function() {
            var anotherEmptyOptional = nonNullOptional.filter(function predicate(value) { 
                return value !== nonNullValue;
            });

            assert.strictEqual(anotherEmptyOptional._value, undefined);
        });

        it('.filter() throws an excpetion if predicate is not a function', function() {
            assert.throws(function() { nonNullOptional.filter('not a function'); }, /NullPointerException : predicate is not a function/);
        });

        it('.map() on non empty Optional, returns a new Optional describing the mapped value, if mapper returns non-null value', function() {
            var expectedValue = nonNullValue + 100,
                mappedOptional = nonNullOptional.map(function(value) {
                    return value += 100;
                });

            assert(mappedOptional !== nonNullOptional);
            assert.strictEqual(mappedOptional.get(), expectedValue);
        });

        it('.map() on non empty Optional, returns an empty Optional, if mapper returns null value', function() {
            var mappedEmptyOptional = nonNullOptional.map(function(value) {
                    return null;
                });

            assert(mappedEmptyOptional instanceof OptionalConstructor);
            assert.strictEqual(mappedEmptyOptional._value, undefined);
        });

        it('.map() on an empty Optional, returns an empty Optional', function() {
            var mappedEmptyOptional = emptyOptional.map(function(value) {
                    return 'any value';
                });

            assert(mappedEmptyOptional !== emptyOptional);
            assert.strictEqual(mappedEmptyOptional._value, undefined);
        });

        it('.map() throws an excpetion if mapper is not a function', function() {
            assert.throws(function() { nonNullOptional.map('not a function'); }, /NullPointerException : mapper is not a function/);
        });
    });
});
