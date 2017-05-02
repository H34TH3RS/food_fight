(function() {
  'use strict';

  angular.module('game').controller('CardsController', CardsController);

  CardsController.$inject = ['$state', 'CardsService'];

  /**
  * Creates Card Controllers
  * @param {Function} $state      Service that allows view routing
  * @param {Function} CardsController Service that contains character card functions
  */
  function CardsController($state, CardsService) {

    let vm = this;
    vm.cards = [];
    vm.card = {};
    vm.message = null;
    vm.lastCard = {};

    vm.getAllCards = function getAllCards() {

      CardsService.getAllCards()
        .then(function handleResponse(cards) {
          vm.cards  = cards;
          console.log(vm.cards);
          return vm.cards;
      }).then(function gotoCard(){
          $state.go('cards');
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;
      });
    };
    vm.getAllCards();

    /**
     * Get the array from getLastCard from CardsService
     * @return {Object} [description]
     */
    vm.getLastCard = function getLastCard(){
      CardsService.getAllCards()
      .then(function lastMath(card) {
        let last = (card.length);
        vm.lastCard = card[last];
        return card[last];
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;
      });
    };

    vm.getLastCard();

  }

}());
