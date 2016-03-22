var assert = require('assert'),
    Optional = require('../.'),
    OptionalConstructor = require('../lib/optional.js');

describe('Optional.js', function () {
    var nonNullValue,
        nullValue,
        undefinedValue;

    beforeEach(function () {
        nonNullValue = 100;
        nullValue = null;
        undefinedValue = undefined;
    });

    describe('implements static methods', function () {

        it('.empty() returns an empty Optional instance with no set value', function () {
            var emptyOptional = Optional.empty();

            assert(emptyOptional instanceof OptionalConstructor);
            assert.strictEqual(emptyOptional._value, undefined);
        });

        it('.of() returns an Optional describing the specified non-null value', function () {
            var optional = Optional.of(nonNullValue);

            assert(optional instanceof OptionalConstructor);
            assert.strictEqual(optional._value, nonNullValue);
        });

        it('.of() throws an exception if value is not defined', function () {
            assert.throws(function () {
                Optional.of(undefinedValue);
            }, /NullPointerException : value is not defined/);
        });

        it('.of() throws an exception if value is null', function () {
            assert.throws(function () {
                Optional.of(nullValue);
            }, /NullPointerException : value is not defined/);
        });

        it('.ofNullable() returns an Optional describing the specified non-null value', function () {
            var optional = Optional.ofNullable(nonNullValue);

            assert(optional instanceof OptionalConstructor);
            assert.strictEqual(optional._value, nonNullValue);
        });

        it('.ofNullable() returns an empty Optional when value is not defined', function () {
            var optional = Optional.ofNullable(undefinedValue);

            assert(optional instanceof OptionalConstructor);
            assert.strictEqual(optional._value, undefined);
        });
    });

    describe('implements instance methods', function () {
        var emptyOptional,
            nonNullOptional;

        beforeEach(function () {
            emptyOptional = Optional.empty();
            nonNullOptional = Optional.of(nonNullValue);
        });

        it('.get() returns value if present in Optional', function () {
            assert.strictEqual(nonNullOptional.get(), nonNullValue);
        });

        it('.get() throws an exception if Optional is empty', function () {
            assert.throws(function () {
                emptyOptional.get();
            }, /NoSuchElementException : Optional is empty/);
        });

        it('.isPresent() returns true if Optional contains value', function () {
            assert(nonNullOptional.isPresent());
        });

        it('.isPresent() returns false if Optional is empty', function () {
            assert(!emptyOptional.isPresent());
        });

        it('.ifPresent() executes consumer with value if Optional contains value', function () {
            var consumerCalled = false,
                passedValue;

            nonNullOptional.ifPresent(function consumer(value) {
                consumerCalled = true;
                passedValue = value;
            });

            assert(consumerCalled);
            assert.strictEqual(passedValue, nonNullValue);
        });

        it('.ifPresent() does not execute consumer if Optional is empty', function () {
            var consumerCalled = false;

            emptyOptional.ifPresent(function consumer(value) {
                consumerCalled = true;
            });

            assert(!consumerCalled);
        });

        it('.ifPresent() throws an exception if Optional contains a value and consumer is not a function', function () {
            assert.throws(function () {
                nonNullOptional.ifPresent('not a function');
            }, /NullPointerException : consumer is not a function/);
        });

        it('.filter() returns a new Optional describing the value if predicate returns true', function () {
            var filteredOptional = nonNullOptional.filter(function predicate(value) {
                return value === nonNullValue;
            });

            assert(filteredOptional !== nonNullOptional);
            assert.strictEqual(filteredOptional.get(), nonNullValue);
        });

        it('.filter() returns an empty Optional if predicate returns false', function () {
            var anotherEmptyOptional = nonNullOptional.filter(function predicate(value) {
                return value !== nonNullValue;
            });

            assert(anotherEmptyOptional !== nonNullOptional);
            assert(anotherEmptyOptional instanceof OptionalConstructor);
            assert.strictEqual(anotherEmptyOptional._value, undefined);
        });

        it('.filter() throws an exception if predicate is not a function', function () {
            assert.throws(function () {
                nonNullOptional.filter('not a function');
            }, /NullPointerException : predicate is not a function/);
        });

        it('.filter() should not regard predicate if Optional is empty', function () {
            emptyOptional.filter(function predicate(value) {
                throw new Error('Predicate was invoked on empty Optional');
            });
        });

        it('.map() on non empty Optional, returns a new Optional describing the mapped value, if mapper returns non-null value', function () {
            var expectedValue = nonNullValue + 100,
                mappedOptional = nonNullOptional.map(function (value) {
                    return value += 100;
                });

            assert(mappedOptional !== nonNullOptional);
            assert.strictEqual(mappedOptional.get(), expectedValue);
        });

        it('.map() on non empty Optional, returns an empty Optional, if mapper returns null value', function () {
            var mappedEmptyOptional = nonNullOptional.map(function (value) {
                return null;
            });

            assert(mappedEmptyOptional instanceof OptionalConstructor);
            assert(mappedEmptyOptional instanceof OptionalConstructor);
            assert.strictEqual(mappedEmptyOptional._value, undefined);
        });

        it('.map() on an empty Optional, returns an empty Optional', function () {
            var mappedEmptyOptional = emptyOptional.map(function (value) {
                return 'any value';
            });

            assert(mappedEmptyOptional !== emptyOptional);
            assert(mappedEmptyOptional instanceof OptionalConstructor);
            assert.strictEqual(mappedEmptyOptional._value, undefined);
        });

        it('.map() throws an exception if mapper is not a function', function () {
            assert.throws(function () {
                nonNullOptional.map('not a function');
            }, /NullPointerException : mapper is not a function/);
        });

        it('.flatMap() on non empty Optional, returns result of mapper', function () {
            var expectedValue = nonNullValue + 100,
                result = nonNullOptional.flatMap(function (value) {
                    return Optional.of(value + 100);
                });

            assert.strictEqual(result.get(), expectedValue);
        });

        it('.flatMap() on an empty Optional, returns an empty Optional', function () {
            var flatMappedEmptyOptional = emptyOptional.flatMap(function (value) {
                return nonNullOptional;
            });

            assert(flatMappedEmptyOptional !== emptyOptional);
            assert(flatMappedEmptyOptional instanceof OptionalConstructor);
            assert.strictEqual(flatMappedEmptyOptional._value, undefined);
        });

        it('.flatMap() throws an exception if mapper is not a function', function () {
            assert.throws(function () {
                nonNullOptional.flatMap('not a function');
            }, /NullPointerException : mapper is not a function/);
        });

        it('.flatMap() throws an exception if mapper does not return an Optional', function () {
            assert.throws(function () {
                nonNullOptional.flatMap(function mapper(value) {
                    return 'not an optional';
                });
            }, /NullPointerException : mapper does not return an Optional/);
        });

        it('.orElse() on non empty Optional, returns the value', function () {
            var result = nonNullOptional.orElse('an orElse value');

            assert.strictEqual(result, nonNullOptional.get());
        });

        it('.orElse() on empty Optional, returns the orElse value', function () {
            var expectedResult = 'an orElse value',
                result = emptyOptional.orElse(expectedResult);

            assert.strictEqual(result, expectedResult);
        });

        it('.orElseGet() on non empty Optional, returns the value when provided an object that implements .get()', function () {
            var result = nonNullOptional.orElseGet(Optional.of('some other value'));

            assert.strictEqual(result, nonNullOptional.get());
        });

        it('.orElseGet() on non empty Optional, returns the value when provided a supplier function', function () {
            var result = nonNullOptional.orElseGet(function supplier() { return 'some other value'; });

            assert.strictEqual(result, nonNullOptional.get());
        });

        it('.orElseGet() on empty Optional, returns the result of calling .get() on the provided object', function () {
            var expectedResult = 'some other value',
                result = emptyOptional.orElseGet(Optional.of('some other value'));

            assert.strictEqual(result, expectedResult);
        });

        it('.orElseGet() on empty Optional, returns the result of calling the provided supplier function', function () {
            var expectedResult = 'some other value',
                result = emptyOptional.orElseGet(function supplier() { return 'some other value'; });

            assert.strictEqual(result, expectedResult);
        });

        it('.orElseGet() throws an exception if Optional is empty and provided supplier does not implement .get()', function () {
            assert.throws(function () {
                emptyOptional.orElseGet({get:'not a supplier function'});
            }, /NullPointerException : provided supplier does not implement \.get\(\)/);
        });

        it('.orElseGet() throws an exception if Optional is empty and provided supplier is not a function', function () {
            assert.throws(function () {
                emptyOptional.orElseGet('not a supplier function');
            }, /NullPointerException : provided supplier does not implement \.get\(\)/);
        });

        it('.orElseGet() throws an exception if Optional is empty and provided supplier is undefined', function () {
            assert.throws(function () {
                emptyOptional.orElseGet(undefinedValue);
            }, /NullPointerException : provided supplier does not implement \.get\(\)/);
        });

        it('.orElseThrow() on non empty Optional, returns the value', function () {
            var result = nonNullOptional.orElseThrow(function () {
                return new Error('an error to throw');
            });
            assert.strictEqual(result, nonNullOptional.get());
        });

        it('.orElseThrow() on empty Optional, throws exception returned by provided function', function () {
            var expectedErrorMessage = 'an error to throw';

            assert.throws(function () {
                emptyOptional.orElseThrow(function () {
                    return new Error(expectedErrorMessage);
                });
            }, expectedErrorMessage);
        });

        it('.orElseThrow() on empty Optional, throws an exception if exception provider is not a function', function () {
            assert.throws(function () {
                emptyOptional.orElseThrow('not a function');
            }, /NullPointerException : exception provider is not a function/);
        });

        it('.hashCode() returns -1', function () {
            // Here to complete the Java Optional API. Completely useless.
            assert.strictEqual(nonNullOptional.hashCode(), -1);
        });
    });
});
