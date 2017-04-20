(function() {
  'use strict';

  angular.module('game').controller('UpcController', UpcController);

  UpcController.$inject = ['$state', 'UpcService'];

  function UpcController($state, UpcService) {

    let vm = this;

    vm.upcCode = {};

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
