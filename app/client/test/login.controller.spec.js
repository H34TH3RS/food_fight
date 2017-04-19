(function() {
    'use strict';

    let expect = chai.expect;

    let now = Date.now();
    let obj1 = {
        name: 'Test',
        time: now
    };

    describe('login controller', function() {

      let LoginController;
      let mockLoginService = {};

      beforeEach(module('game'));

      beforeEach(module(function($provide) {
        $provide.value('LoginService', mockLoginService);
      }));

      beforeEach(inject(function($controller) {

        mockLoginService.login = function login() {
          mockLoginService.login.numTimesCalled++;
            return [obj1];
        };

        mockLoginService.logout = function logout() {
          mockLoginService.logout.numTimesCalled++;
            return;
        };

        mockLoginService.login.numTimesCalled = 0;
        mockLoginService.logout.numTimesCalled = 0;
        LoginController = $controller('LoginController');

    }));

      it('should be the correct types', function() {
        expect(LoginController.login).to.be.a('function');
        expect(LoginController.logout).to.be.a('function');
      });

      // it('should call login when adding a user', function() {
      //   expect(mockLoginService.login.numTimesCalled).to.equal(0);
      //   LoginController.login(obj1);
      //   expect(mockLoginService.login.numTimesCalled).to.equal(1);
      // });

    });

}());
