(function() {
  'use strict';

  let expect = chai.expect;

  describe('user service', function(){

    let UserService;

    beforeEach(module('game'));

    beforeEach(inject(function(_UserService_){
      UserService = _UserService_;
      }));


    it('should expect createUser to be function', function() {
      expect(UserService.createUser).to.be.a('function');
      expect(UserService.login).to.be.a('function');
      expect(UserService.logout).to.be.a('function');
      expect(UserService.getToken).to.be.a('function');
    });


    describe('create user', function(){

      it('should expect createUserto return an object when passed user strings', function(){
        let newUser = UserService.createUser('test@test.com');
        expect(newUser).to.be.an('object');
      });
      it('should expect login return an object when passed user strings', function(){
        let userLogin = UserService.login('test@test.com');
        expect(userLogin).to.be.an('object');
      });
    });


  });

}());
