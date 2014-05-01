module.exports = {

	attributes: {

		street: { type: 'string', required: true },

		user: {
			model: 'User'
		}
	}
};

