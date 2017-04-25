(function() {
  'use strict';

  let expect = chai.expect;

  describe('cards service', function() {

    let CardsService;
    let mockCardsService = {};

    beforeEach(module('game'));

    beforeEach(inject(function(_CardsService_) {
      CardsService = _CardsService_;
    }));

    describe('getAllCards tests', function() {

      it('should return an array', function() {
        let result = CardsService.getAllCards();
        expect(result).to.be.an('array');
      });

    });


    describe('getOneCard tests', function() {

      it('should return an array with only one object', function() {
        let result = CardsService.getOneCard();
        expect(result.length).to.equal(1);
      });

      //I don't know how to mimic this not being in the database
      it('should handle trying to find a upc that is not in the database', function() {
        let result = CardsService.getOneCard({upc: '00000'});
        expect(result).to.equal('undefined');
      });

    });
  });

}());
