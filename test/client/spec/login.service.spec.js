(function() {
  'use strict';

  let expect = chai.expect;

  describe('login service', function(){

    let LoginService;

    beforeEach(module('game'));

    beforeEach(inject(function(_LoginService_){
      LoginService = _LoginService_;
    }));

    // afterEach(inject(function(_LoginService_) {
    //   localStorage.removeItem('loginData');
    // }));


    it('should expect the functions to be functions', function() {
      expect(LoginService.logout).to.be.a('function');
      expect(LoginService.sendLogin).to.be.a('function');
      expect(LoginService.getToken).to.be.a('function');
    });
    




  });

}());
