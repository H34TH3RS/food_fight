(function() {
  'use strict';

  let expect = chai.expect;

  describe('card service', function() {

    let CardsService;
    let mockCardsService = {};

    beforeEach(module('game'));
    beforeEach(inject(function(_CardsService_) {
      CardsService = _CardsService_;
    }));

  });

}());
