(function() {
  'use strict';

  let expect = chai.expect;

  describe('user controller', function() {

    let UserController, $http, $state;
    let mockUserService = {};
    let $httpBackend;
    let users = [];
    let user = {};
    let token = 'token';
    let data = true;

    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('UserService', mockUserService);
    }));

    beforeEach(inject(function(_$http_, _$httpBackend_,_$state_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;

      $httpBackend.whenPOST('/api/users')
        .respond([{
          data:{
            user: {
            email: user.email,
            username: user.username,
            password: user.password,
            password_confirmation: user.password_confirmation
          }
        }
      }]);

    }));
    beforeEach(inject(function($controller) {
      mockUserService.createUser = function createUser(user) {
        // Promise.resolve();
        mockUserService.createUser.numTimesCalled++;
      };

      mockUserService.createUser.numTimesCalled = 0;
      UserController = $controller('UserController');

    }));

    it('should be a function', function() {
      expect(UserController.createUser).to.be.a('function');
      expect(UserController.login).to.be.a('function');
      expect(UserController.logout).to.be.a('function');
    });

  });

}());
