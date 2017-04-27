(function() {
  'use strict';

  angular.module('game').controller('CardsController', CardsController);

  CardsController.$inject = ['$state', 'CardsController'];

  /**
   * Creates Card Controllers
   * @param {Function} $state      Service that allows view routing
   * @param {Function} CardsController Service that contains character card functions
   */
  function CardsController($state, CardsController) {

    let vm = this;

    let cards = [];
    vm.card = {};

   /**
    * Retrieves all character cards in an array
    * @param  {Object} card Must contain {name: xxx}
    * @return {Promise}
    */
    vm.getAllCards = function getAllCards(card) {

      CardsService.getAllCards(cards.card)
        .then(function handleResponse(response) {
          vm.card = response;
          return response.data;
      });
    };
    vm.getAllCards();

    vm.getOneCard = function getOneCard(card) {

      CardsService.getOneCard(cards.card)
        .then(function handleResponse(response) {
          return response.data;
        });
    };
    vm.getOneCard();

  }

}());
