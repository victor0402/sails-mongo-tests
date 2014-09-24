module.exports = {

	attributes: {

		name: { type: 'string', required: true },

		role: {
			model: 'Role',
            required: true
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

