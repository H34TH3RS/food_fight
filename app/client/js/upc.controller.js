(function() {
  'use strict';

  angular.module('game').controller('UpcController', UpcController);

  UpcController.$inject = ['$state', 'UpcService'];

  function UpcController($state, UpcService) {
    console.log('inside UpcController');

    let vm = this;

    vm.upcCode = {};

    function sendUpcData(upcCode) {
      console.log('inside upc controller sendUpcData');
      UpcService.sendUpcData(upcCode.upc)
      .then(function goToCards() {
        $state.go('cards');
      })
      .catch(function handleError(err) {
        console.log('what the actual fuck is going on?', err);
      });
    }
  }


}());
