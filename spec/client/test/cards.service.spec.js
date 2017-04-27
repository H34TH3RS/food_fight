(function() {
  'use strict';

  let expect = chai.expect;

  describe('cards service', function() {

    let CardsService;
    let mockCardsService = {};
    let upc =[{}];
    let cards = {name:'Test'};

    beforeEach(module('game'));

    beforeEach(inject(function(_CardsService_) {
      CardsService = _CardsService_;
      let card = [cards];

    }));

    afterEach(inject(function(_CardsService_) {

    }));


    describe('getAllCards tests', function() {

      it('should return an Object', function() {
        let result = CardsService.getAllCards();
        expect(result).to.be.an('Object');
      });

    });

    describe('getOneCard tests', function() {


      it('should return an array with only one object', function() {
        let result = CardsService.getOneCard();
        expect(result).to.be.an('Object');
      });

      it('should return an an array with a length of 1', function(){
        let result = CardsService.getOneCard;
        expect(result.length).to.be.equal(1);
      });

      
    });
  });

}());
