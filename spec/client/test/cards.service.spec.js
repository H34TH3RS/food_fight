(function() {
  'use strict';

  let expect = chai.expect;

  describe('cards service', function() {

    let CardsService;

    beforeEach(module('game'));

    beforeEach(inject(function(_CardsService_) {
      CardsService = _CardsService_;
    }));

  });

}());
