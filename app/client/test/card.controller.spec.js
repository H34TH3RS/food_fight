(function() {
  'use strict';

  let expect = chai.expect;

  describe('CardController', function() {

    let CardController;
    let mockCardService = {};
    let card = {};

    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('CardService', mockCardService);
    }));

    beforeEach(inject(function($controller) {
      mockCardService.getAllCards = function getAllCards() {
        return [
          {stats: 'testing'}
        ];
      };

      CardController = $controller('CardController');

    }));

    it('should return an array', function() {
      expect(CardController.getAllCards).to.be.an('array');
    });

  });

}());
