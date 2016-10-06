function Optional(value) {
    this._value = value;
}

Optional.prototype = {
    get: function get() {
        if (isNull(this._value)) {
            throw new Error('NoSuchElementException : Optional is empty');
        }
        return this._value;
    },
    isPresent: function isPresent() {
        return isNull(this._value) ? false : true;
    },
    ifPresent: function ifPresent(consumer) {
        if (!isNull(this._value)) {
            if (!isFunction(consumer)) {
                throw new Error('NullPointerException : consumer is not a function');
            }
            consumer(this._value);
        }
    },
    filter: function filter(predicate) {
        if (!isFunction(predicate)) {
            throw new Error('NullPointerException : predicate is not a function');
        }
        if (!isNull(this._value) && predicate(this._value)) {
            return new Optional(this._value);
        }
        return new Optional();
    },
    map: function map(mapper) {
        var mappedValue;

        if (!isFunction(mapper)) {
            throw new Error('NullPointerException : mapper is not a function');
        }

        if (isNull(this._value)) {
            return new Optional();
        }

        mappedValue = mapper(this._value);

        return isNull(mappedValue) ? new Optional() : new Optional(mappedValue);
    },
    flatMap: function flatMap(mapper) {
        var flatMappedValue;

        if (!isFunction(mapper)) {
            throw new Error('NullPointerException : mapper is not a function');
        }

        if (isNull(this._value)) {
            return new Optional();
        }

        flatMappedValue = mapper(this._value);

        if (isNull(flatMappedValue) || isNull(flatMappedValue.get)) {
            throw new Error('NullPointerException : mapper does not return an Optional');
        }

        return flatMappedValue;
    },
    peek: function peek(peeker) {
        if (!isFunction(peeker)) {
            throw new Error('NullPointerException : peeker is not a function');
        }

        if (isNull(this._value)) {
            return new Optional();
        }

        peeker(this._value);

        return isNull(this._value) ? new Optional() : new Optional(this._value);
    },
    orElse: function orElse(other) {
        return isNull(this._value) ? other : this._value;
    },
    orElseGet: function orElseGet(supplier) {
        var supplierIsInvalid = isNull(supplier) || (!isFunction(supplier.get) && !isFunction(supplier));

        if (isNull(this._value) && supplierIsInvalid) {
            throw new Error('NullPointerException : provided supplier does not implement .get()');
        }

        if(isNull(this._value)) {
            return isFunction(supplier.get) ? supplier.get() : supplier();
        } else {
            return this._value;
        }
    },
    orElseThrow: function orElseThrow(exceptionSupplier) {
        if (isNull(this._value)) {
            if (!isFunction(exceptionSupplier)) {
                throw new Error('NullPointerException : exception provider is not a function');
            }

            throw exceptionSupplier();
        }
        return this._value;
    },
    hashCode: function hashMap() {
        // Here just to complete the Java Optional API.
        return -1;
    }
};

function isNull(value) {
    return !!(value === undefined || value === null);
}

function isFunction(value) {
    return typeof value === 'function';
}

module.exports = Optional;
