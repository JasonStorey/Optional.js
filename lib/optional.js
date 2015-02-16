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
				throw new Error('NullPointerException : consumer is not defined');
			} 
			consumer(this._value);
		}
	}
};

function isNull(value) {
	return value === undefined || value === null ? true : false;
}

module.exports = Optional;
