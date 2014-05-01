module.exports = {

	attributes: {

		name: { type: 'string', required: true },

		role: {
			model: 'Role'
		},

		address: {
			model: 'Address'
		},

		preferences: {
			collection: 'Preference',
			via: 'people',
			dominant: true
		}
	}
};

