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


      mockUserService.createUser = function createUser(user) {
        mockUserService.createUser.numTimesCalled++;
      };

      mockUserService.createUser.numTimesCalled = 0;
      UserController = $controller('UserController');

    }));

    it('should be a funciton', function() {
      expect(UserController.createUser).to.be.a('function');
      expect(UserController.login).to.be.a('function');
      expect(UserController.logout).to.be.a('function');
    });

  });

}());
