(function() {
  'use strict';

  let expect = chai.expect;

  describe('CardController', function() {

    let CardController;
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

      CardController = $controller('CardController');

    }));

    it('should be a function', function() {
      expect(CardController.getAllCards).to.be.a('function');
      expect(CardController.getOneCard).to.be.a('function');
    });

    it('should reject an argument that is not an object', function() {
      let result = CardController.getAllCards(1);
      expect(result.length).to.equal(undefined);
    });

  });

}());
