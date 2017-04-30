(function() {
  'use strict';

  let expect = chai.expect;

  describe('user controller', function() {

    let UserController, $http, $state;
    let mockUserService = {};
    let homeState = {};
    let user = {};
    let userLogin = {
      email:'string',
      password:'string'
    };

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

      mockUserService.login = function login (userLogin){
        if (userLogin === 'object'){
          return Promise.resolve();
        }else {
          return Promise.reject();
        }
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
      expect(UserController.loggedIn).to.be.a('function');
    });

    it('should return an promise', function() {
      // console.info(UserController.login());//why is this undefined?????
      expect(UserController.login()).to.be.an('Promise');
      console.info(UserController.createUser());
      expect(UserController.createUser()).to.be.an('Promise');

    });

    it('should return 1 ', function() {
      console.info(homeState.go.numTimesCalled);
      UserController.createUser().then( function goHome(){
        console.info(homeState.go.numTimesCalled);
        expect(homeState.go.numTimesCalled).to.equal(1);
        done();
      });
    });




  });

}());
