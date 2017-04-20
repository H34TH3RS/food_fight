(function() {
  'use strict';

  let expect = chai.expect;
  let user1 = {
    email: 'test@email',
    username: 'username',
    password: 'password',
    password_confirmation: 'password'
  };

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
      mockUserService.login.numTimesCalled = 0;
      mockUserService.logout.numTimesCalled = 0;
      UserController = $controller('UserController');

    }));

    // it('should expect createUser be a function', function() {
    //   expect(UserController.createUser).to.be.a('function');
    // });
    // it('should expect login be a function', function() {
    //   expect(UserController.login).to.be.a('function');
    // });
    // it('should expect logout be a function', function() {
    //   expect(UserController.logout).to.be.a('function');
    // });
    //
    // it('should call createUser when adding a new user', function(){
    //   expect(mockUserService.createUser.numTimesCalled).to.equal(0);
    //   // UserController.createUser(user1);
    //   // expect(mockUserService.createUser.numTimesCalled).to.equal(1);
    //
    // });


  });

}());
