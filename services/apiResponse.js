const apiResponse = (payload = {}) => {
	const DataSymbol = Symbol('data');
	const ErrorSymbol = Symbol('error');
	const MessageSymbol = Symbol('message');
	class ApiResponse {
		constructor({ data = {}, error = false, message = '' }) {
			this.data = data;
			this.error = error;
			this.message = message;
		}

		get data() {
			return this[DataSymbol];
		}

		set data(data) {
			if (typeof data === 'undefined') { throw new Error('Data must be defined'); }
			this[DataSymbol] = data;
		}

		get error() {
			return this[ErrorSymbol];
		}

		set error(error) {
			this[ErrorSymbol] = error;
		}

		get message() {
			return this[MessageSymbol];
		}

		set message(message) {
			if (typeof message !== 'string') { throw new Error('Message must be a string'); }
			this[MessageSymbol] = message;
		}

		toJSON() {
			if (this.error) {
				return {
					error: this.error,
					message: this.message,
				};
			}
			else {
				return {
					data: this.data,
					error: this.error,
				};
			}
		}
	}
	return new ApiResponse(payload);
};
module.exports = apiResponse;