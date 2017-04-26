(function() {
  'use strict';

  let expect = chai.expect;

  describe('CardsController', function() {

    let CardsController;
    let mockCardsService = {};
    let cards = [];
    let card = {};

    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('CardsService', mockCardsService);
    }));

    beforeEach(inject(function($controller) {
      mockCardsService.getAllCards = function getAllCards() {
        return [
          {stats: 'testing'}
        ];
      };

      CardsController = $controller('CardsController');

    }));

    it('should be a function', function() {
      expect(CardsController.getAllCards).to.be.a('function');
      expect(CardsController.getOneCard).to.be.a('function');
    });

    it('should reject an argument that is not an object', function() {
      let result = CardsController.getAllCards(1);
      expect(result.length).to.equal(undefined);
    });

  });

}());
