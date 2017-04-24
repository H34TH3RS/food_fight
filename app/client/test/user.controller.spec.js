(function() {
  'use strict';

  let expect = chai.expect;

  describe('user controller', function() {

    let UserController;
    let mockUserService = {};
    let users = [];
    let user = {};

    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('UserService', mockUserService);
    }));

    beforeEach(inject(function($controller) {
      UserController = $controller('UserController');
    }));

    describe('createUser tests', function() {
      it('should be a function', function() {
        expect(UserController.createUser).to.be.a('function');
      });

      it('should accept an object with the correct information', function() {
        let result = UserController.createUser({
          email: 'user.email',
          username: 'user.username',
          password: 'user.password',
          password_confirmation: 'user.password_confirmation'
        });
        expect(result.email).to.equal('user.email');
      });

    });

    describe('login tests', function() {
      it('should be a function', function() {
        expect(UserController.login).to.be.a('function');
      });
    });

    describe('logout tests', function() {
      it('should be a function', function() {
        expect(UserController.logout).to.be.a('function');
      });

    });

  });

}());
