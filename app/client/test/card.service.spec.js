(function() {
  'use strict';

  let expect = chai.expect;

  describe('card service', function() {

    let CardService;
    let mockCardService = {};

    beforeEach(module('game'));
    beforeEach(inject(function(_CardService_) {
      CardService = _CardService_;
    }));

    
  });

}());
