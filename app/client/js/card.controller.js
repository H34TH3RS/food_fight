(function() {
  'use strict';

  angular.module('game').controller('CardController', CardController);

  CardController.$inject = ['$state', 'CardService'];

  function CardController($state, CardService) {

    let vm = this;

    let cards = [];
    let card = {
      stats: 'testing stats'
    };

    vm.getAllCards = function getAllCards(card) {
      CardService.getAllCards(cards.card)
      .then(function handleResponse(response) {
        return response.data;
      });
    };
    vm.getAllCards();

  }

}());
