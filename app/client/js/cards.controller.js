(function() {
  'use strict';

  angular.module('game').controller('CardsController', CardsController);

  CardsController.$inject = ['$state', 'CardsService'];

  /**
   * Creates Card Controllers
   * @param {Function} $state      Service that allows view routing
   * @param {Function} CardsService Service that contains character card functions
   */
  function CardsController($state, CardsService) {

    let vm = this;

    let cards = [];
    let card = {};

   /**
    * Retrieves all character cards in an array
    * @param  {Object} card Must contain {name: xxx}
    * @return {Promise}
    */
    vm.getAllCards = function getAllCards(card) {
      if (!Array.isArray('cards') || typeof('card') !== 'object' || cards.length === 0) {
        return Promise.reject();
      }
      CardsService.getAllCards(cards.card)
        .then(function handleResponse(response) {
          return response.data;
      });
    };
    vm.getAllCards();

    vm.getOneCard = function getOneCard(card) {
      if(typeof('card') !== 'object' || cards.length === 0) {
        return Promise.reject();
      }
      CardsService.getOneCard(cards.card)
        .then(function handleResponse(response) {
          return response.data;

        });
    };
    vm.getOneCard();

  }

}());
