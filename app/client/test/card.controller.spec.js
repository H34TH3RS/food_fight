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
        return [];
      };
    }));

  });

}());
