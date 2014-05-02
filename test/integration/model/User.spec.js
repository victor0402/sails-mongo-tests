describe('User', function () {

	before(function (done) {
		helper.cleanDb(db, done);
	});

	describe('when create a user with all attributes', function () {

		before(function (done) {
			createData(isDone(done))
		});

		var userName = 'user';

		it('should be possible get the user with all properties populated', function (done) {
			User.findOne({name: userName})
				.populate('preferences')
				.populate('address')
				.populate('role')
				.exec(function (err, user) {

					expect(user).to.have.property('preferences').
						and.to.be.a('array').
						and.to.have.length(2);

					expect(user).to.have.property('role');

					expect(user).to.have.property('address');

					done()
				})
		});

		function createData(fnExecuteTest) {
			Preference.create({name: 'pref 1'}).exec(function (err, pref1) {
				validateSavedData(err, pref1);

				Preference.create({name: 'pref 2'}).exec(function (err, pref2) {
					validateSavedData(err, pref2);

					Role.create({name: 'admin'}).exec(function (err, role) {
						validateSavedData(err, role);

						User.create({name: userName, role: role.id }).exec(function (err, user) {
							validateSavedData(err, user);

							//add preferences
							user.preferences.add(pref1.id);
							user.preferences.add(pref2.id);
							user.save(function (err, data) {
								validateSavedData(err, data);

								Address.create({street: 'foo street', user: user.id}).exec(function (err, address) {
									validateSavedData(err, address);

									user.address = address.id;
									user.save(function (err, userUpdated) {
										validateSavedData(err, userUpdated);
										fnExecuteTest(user.id)
									})
								})
							});
						})
					});
				})
			});
		}

		function validateSavedData(err, data) {
			expect(err).to.not.exist;
			expect(data).to.exist;
		}
	})
});