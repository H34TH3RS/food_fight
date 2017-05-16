(function() {
  'use strict';

  angular.module('game').controller('CardsController', CardsController);

  CardsController.$inject = ['$state', 'CardsService'];

  /**
  * Creates Cards Controllers.
  * @param {Function} $state          The service that allows view routing.
  * @param {Function} CardsController The service that contains character card functions.
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
      }).then(function gotoCard() {
        $state.go('cards');
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;
      });
    };
    vm.getAllCards();

    /**
    * Gets the array containing the last card created from CardsService.
    * @return {Object}
    */
    vm.getLastCard = function getLastCard() {
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

    /**
    * Gets one card from CardsService.
    * @return {Promise}
    */
    vm.getOneCard = function getOneCard() {
      CardsService.getOneCard()
      .then(function showCards() {
      });
    };
    vm.getOneCard();

  }

}());
