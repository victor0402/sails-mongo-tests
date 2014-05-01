module.exports = {

	attributes: {

		name: { type: 'string', required: true },

		people: {
			collection: 'User',
			via: 'preferences'
		}
	}
};

