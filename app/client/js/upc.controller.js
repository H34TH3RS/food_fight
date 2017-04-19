(function() {
  'use strict';

  angular.module('game').controller('UpcController', UpcController);

  UpcController.$inject = ['$state', 'UpcService'];


  function UpcController($state, UpcService) {

    let vm = this;

    vm.upcCode = {};

    function sendUpcData() {
      return UpcService.sendUpcData(upcCode.upc);

    }

  }


}());
