(function() {
  'use strict';

  let expect = chai.expect;

  describe('user controller', function() {

    let UserController, $http, $state;
    let mockUserService = {};
    let homeState = {};


    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('UserService', mockUserService);
      $provide.value('$state', homeState);
    }));

    beforeEach(inject(function(_$http_,_$state_) {
      $http = _$http_;
      $state = _$state_;
    }));

    beforeEach(inject(function($controller) {
      mockUserService.createUser = function createUser(user) {
        return Promise.resolve();

      };

      homeState.go = function go(){
      homeState.go.numTimesCalled++;
      };

      homeState.go.numTimesCalled = 0;

      UserController = $controller('UserController');

    }));


    it('should be a function', function() {
      expect(UserController.createUser).to.be.a('function');
      expect(UserController.login).to.be.a('function');
      expect(UserController.logout).to.be.a('function');
    });

    it('should return an object', function() {
      console.info(UserController.login());//why is this undefined?????
      expect(UserController.login()).to.be.an('object');
      expect(UserController.createUser()).to.be.an('object');
    });




  });

}());
