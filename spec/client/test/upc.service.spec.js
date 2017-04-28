(function() {
  'use strict';

  let expect = chai.expect;

  describe('upc service', function(){

    let UpcService;


    beforeEach(module('game'));

    beforeEach(inject(function(_UpcService_){
      UpcService = _UpcService_;
    }));

    afterEach(inject(function(_UpcService_){

    }));


    it('should expect the function to be function', function() {
      console.info(UpcService.sendUpcData());
      expect(UpcService.sendUpcData).to.be.a('function');
    });

    it('should expect sendUpcData to return and object', function() {
      expect(UpcService.sendUpcData()).to.be.an('Object');
    });

  });

}());
