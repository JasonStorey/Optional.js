function Optional(value) {
	this._value = value;
}

Optional.prototype = {
	get: function get() {
		if(isNull(this._value)) {
			throw new Error('NoSuchElementException : Optional is empty');
		}
		return this._value;
	}
};

function isNull(value) {
	return value === undefined || value === null ? true : false;
}

module.exports = Optional;
