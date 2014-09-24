describe('User', function () {

    beforeEach(function (done) {
        helper.cleanDb(db, done);
    });

    describe('when create a user with a role', function () {
        var userName = 'user';

        //FAIL...
        //sails/waterline bug??
        it('should be possible to update the populated user via rest api', function (done) {

            //create a fresh user with a role
            createUserWithRole(function (userId) {

                //fetch the user and populate all relationships
                User.findOne(userId)
                    .populateAll()
                    .exec(function (err, user) {
                        validateSavedData(err, user);

                        //now change the user name
                        user.name = 'new name';

                        //and update user
                        request(getApp()).put('/api/user/' + user.id)
                            .send(user)
                            .expect(200)
                            .set('Accept', 'application/json').expect('Content-Type', /json/)
                            .end(function (err, res) {
                                expect(err).to.not.exist;
                                res.body.name.should.eql('new name');
                                done()
                            });
                    })
            });
        });

        //PASS
        it('should be possible to update the user without populate via rest api', function (done) {

            //create a fresh user with a role
            createUserWithRole(function (userId) {

                //fetch the user without populateAll
                User.findOne(userId)
                    .exec(function (err, user) {
                        validateSavedData(err, user);
                        //now change the user name
                        user.name = 'new name';

                        //and update user
                        request(getApp()).put('/api/user/' + user.id)
                            .send(user)
                            .expect(200)
                            .set('Accept', 'application/json').expect('Content-Type', /json/)
                            .end(function (err, res) {
                                expect(err).to.not.exist;
                                res.body.name.should.eql('new name');
                                done()
                            });
                    })
            });
        });

        function createUserWithRole(fnExecuteTest) {
            Role.create({name: 'admin'}).exec(function (err, role) {
                validateSavedData(err, role);

                User.create({name: userName, role: role.id }).exec(function (err, user) {
                    validateSavedData(err, user);

                    fnExecuteTest(user.id);
                })
            });
        }

        function validateSavedData(err, data) {
            expect(err).to.not.exist;
            expect(data).to.exist;
        }
    })
});