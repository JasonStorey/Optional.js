function Optional(value) {
	this._value = value;
}

Optional.prototype = {
	get: function get() {
		if(isNull(this._value)) {
			throw new Error('NoSuchElementException : Optional is empty');
		}
		return this._value;
	},
	isPresent: function isPresent() {
		return isNull(this._value) ? false : true;
	},
	ifPresent: function ifPresent(consumer) {
		if(!isNull(this._value)) {
			if(typeof consumer !== 'function') {
				throw new Error('NullPointerException : consumer is not a function');
			}
			consumer(this._value);
		}
	},
	filter: function filter(predicate) {
		if(typeof predicate !== 'function') {
			throw new Error('NullPointerException : predicate is not a function');
		}
		if(predicate(this._value)) {
			return new Optional(this._value);
		}
		return new Optional();
	}
};

function isNull(value) {
	return value === undefined || value === null ? true : false;
}

module.exports = Optional;
