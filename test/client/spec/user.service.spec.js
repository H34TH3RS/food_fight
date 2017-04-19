(function() {
  'use strict';


  let expect = chai.expect;

  describe('user service', function(){

    let UserService;

    beforeEach(module('game'));

    beforeEach(inject(function(_UserService_){
      UserService = _UserService_;
    }));

    it('should expect the functions to be function', function() {
      expect(UserService.createUser).to.be.a('function');
    });

    it('should return a promise is passed object', function(){
      expect(UserService.createUser()).to.be.a('promise');
    });

    



  });

}());
