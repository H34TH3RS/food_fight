(function() {
  'use strict';

  angular.module('game').controller('UpcController', UpcController);

  UpcController.$inject = ['$state', 'UpcService'];


  /**
   * Creates UPC Controllers
   * @param {Function} $state     Allows view routing
   * @param {Function} UpcService The UPC Service functions
   */
  function UpcController($state, UpcService) {

    let vm = this;

    vm.upcCode = {};

   /**
    * Retrieves UPC data from the api
    * @param  {Object} upcCode Must have {upc: 999}
    * @return {Promise}
    */
    vm.sendUpcData = function sendUpcData(upcCode) {
      UpcService.sendUpcData(upcCode.upc)
      .then(function goToCards() {
        $state.go('cards');
      })
      .catch(function handleError(err) {
      });
    };

  }


}());
