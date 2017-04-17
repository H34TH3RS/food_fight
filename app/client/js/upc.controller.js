(function() {
  'use strict';

  angular.module('game').controller('UpcController', UpcController);

  UpcController.$inject = ['$state', 'UpcService'];

  function UpcController($state, UpcService) {

    let vm = this.;

    vm.users = [];
    vm.user = {};

    vm.createUser = function createUser(user) {
      return UpcService.createUser(user)
      .then(function goHome() {
        $state.go('home');
      })
      .catch();
    };


  }


}());
