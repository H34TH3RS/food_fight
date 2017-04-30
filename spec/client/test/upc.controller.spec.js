(function() {
  'use strict';

  let expect = chai.expect;

  describe ('UpcController', function() {

    let UpcController,$http, $state;
    let CardsState = {};
    let mockUpcService = {};
    let upcCode = {};


    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('UpcService', mockUpcService);
      $provide.value('$state', CardsState);
    }));

    beforeEach(inject(function(_$http_ ,_$state_) {
      $http = _$http_;
      $state = _$state_;
    }));

    beforeEach(inject(function($controller) {
      mockUpcService.sendUpcData = function sendUpcData() {
        return Promise.resolve();
      };

      CardsState.go = function go(){
        CardsState.go.numTimesCalled++;
      };

      CardsState.go.numTimesCalled = 0;

      UpcController = $controller('UpcController');
    }));

    describe('sendUpcData', function(){

      it('should expect the function to be function', function() {
        expect(UpcController.sendUpcData).to.be.a('function');
      });

      it('should return an object', function() {
        console.info(UpcController.sendUpcData(upcCode));//why is this undefined?????
        expect(UpcController.sendUpcData()).to.be.an('object');
      });

      it('should return 1 ', function() {
        UpcController.sendUpcData(upcCode).then(function goToCards(){
          expect(CardsState.go.numTimesCalled).to.equal(1);
          done();//testing need sto know that asynch stuff is done
        });
      });


      // it('should reject an argument that is not a string', function() {
      //   let result = UpcController.sendUpcData(1);
      //   expect(result).to.equal(undefined); //I dont think this is an good test
      // });
      //
      //
      // it('should handle an empty object', function() {
      //   let result = UpcController.sendUpcData();
      //   expect(result).to.equal(undefined);
      // });

    });

  });




}());
