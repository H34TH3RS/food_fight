(function() {
  'use strict';

  let expect = chai.expect;

  describe('user controller', function() {

    let UserController;
    let mockUserService = {};
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

    it('should be the correct types', function() {
      expect(UserController.createUser).to.be.a('function');
    });

});

}());
