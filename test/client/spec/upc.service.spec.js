(function() {
  'use strict';


    let expect = chai.expect;

    describe('upc service', function(){

      let UpcService;
      let mockUpcService = {};

      beforeEach(module('game'));

      beforeEach(inject(function(_UpcService_){
        UpcService = _UpcService_;
      }));

      it('should expect the function to be function', function() {
        expect(UpcService.sendUpcData).to.be.a('function');
      });

      // it('should return a promise if passed object', function(){
      //   expect(UpcService.sendUpcData()).to.be.a('promise');
      // });
      // 


    });


}());
