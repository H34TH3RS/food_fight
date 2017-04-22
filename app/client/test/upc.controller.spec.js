(function() {
  'use strict';

  describe ('UpcController', function() {

    let UpcController;
    let mockUpcService = {};
    let upcCode = {};

    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('UpcService', mockUpcService);
    }));

    beforeEach($inject(function($controller) {
      mockUpcService.sendUpcData = function sendUpcData() {
        return [
          {upc: upcCode.upc}
        ];
      };
      
    UpcController = $controller('UpcController');

    }));
  });


}());
