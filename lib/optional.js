function Optional(value) {
    this._value = value;
}

Optional.prototype = {
    get: function get() {
        if (!this.isPresent()) {
            throw new Error('NoSuchElementException : Optional is empty');
        }
        return this.getValue();
    },
    getValue: function(){
        var value = this._value;
        return isFunction(value) ? value() : value;
    },
    isPresent: function isPresent() {
        return !isNull(this.getValue());
    },
    ifPresent: function ifPresent(consumer) {
        if (this.isPresent()) {
            if (!isFunction(consumer)) {
                throw new Error('NullPointerException : consumer is not a function');
            }
            consumer(this.getValue());
        }
    },
    filter: function filter(predicate) {
        var value;
        if (!isFunction(predicate)) {
            throw new Error('NullPointerException : predicate is not a function');
        }
        value = this.getValue();
        if (this.isPresent() && predicate(value)) {
            return new Optional(value);
        }
        return new Optional();
    },
    map: function map(mapper) {
        var mappedValue;

        if (!isFunction(mapper)) {
            throw new Error('NullPointerException : mapper is not a function');
        }

        if (!this.isPresent()) {
            return new Optional();
        }

        mappedValue = mapper(this.getValue());

        return isNull(mappedValue) ? new Optional() : new Optional(mappedValue);
    },
    flatMap: function flatMap(mapper) {
        var flatMappedValue;

        if (!isFunction(mapper)) {
            throw new Error('NullPointerException : mapper is not a function');
        }

        if (!this.isPresent()) {
            return new Optional();
        }

        flatMappedValue = mapper(this.getValue());

        if (isNull(flatMappedValue) || isNull(flatMappedValue.get)) {
            throw new Error('NullPointerException : mapper does not return an Optional');
        }

        return flatMappedValue;
    },
    peek: function peek(peeker) {
        var value;
        if (!isFunction(peeker)) {
            throw new Error('NullPointerException : peeker is not a function');
        }

        if (!this.isPresent()) {
            return new Optional();
        }

        value = this.getValue();
        peeker(value);

        return new Optional(value);
    },
    orElse: function orElse(other) {
        return !this.isPresent() ? other : this.getValue();
    },
    orElseGet: function orElseGet(supplier) {
        var supplierIsInvalid = isNull(supplier) || (!isFunction(supplier.get) && !isFunction(supplier));

        if (!this.isPresent() && supplierIsInvalid) {
            throw new Error('NullPointerException : provided supplier does not implement .get()');
        }

        if(!this.isPresent()) {
            return isFunction(supplier.get) ? supplier.get() : supplier();
        } else {
            return this.getValue();
        }
    },
    orElseThrow: function orElseThrow(exceptionSupplier) {
        if (!this.isPresent()) {
            if (!isFunction(exceptionSupplier)) {
                throw new Error('NullPointerException : exception provider is not a function');
            }

            throw exceptionSupplier();
        }
        return this.getValue();
    },
    hashCode: function hashMap() {
        // Here just to complete the Java Optional API.
        return -1;
    }
};

function isNull(value) {
    return typeof value === 'undefined' || value === null;
}

function isFunction(value) {
    return typeof value === 'function';
}

module.exports = Optional;
