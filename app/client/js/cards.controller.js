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

    let cards = [];
    vm.card = {};
    vm.message = null;

   /**
    * Retrieves all character cards in an array
    * @param  {Object} card Must contain {name: xxx}
    * @return {Promise}
    */
    vm.getAllCards = function getAllCards() {

      CardsService.getAllCards()
        .then(function handleResponse(response) {
          vm.card = response;
          return response.data;
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;

      });
    };

    vm.getOneCard = function getOneCard(card) {

      CardsService.getOneCard(cards.card)
        .then(function goToCreateCard() {
          $state.go('cards');
        })
        .catch(function handleError(err) {
          vm.message = 'Something went wrong. Error ' + err.status;
        });
      };
  }

}());
