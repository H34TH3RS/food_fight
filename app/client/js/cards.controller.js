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
    vm.last = {};
    vm.cards = [];
    vm.card = {};
    vm.message = null;
    vm.lastsCard = {};


    /**
    * Retrieves all character cards in an array
    * @param  {Object} card Must contain {name: xxx}
    * @return {Promise}
    */
    vm.getAllCards = function getAllCards() {

      CardsService.getAllCards()
      .then(function handleResponse(response) {
        vm.cards = response;
        return response;
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;

      });
    };
    vm.getAllCards();

    /**
     * Need to re-evalute if we need this
     * @param  {[type]} card [description]
     * @return {[type]}      [description]
     */
    vm.getOneCard = function getOneCard(card) {
      // TODO what is cards.card?
      console.log("cards.card",cards.card);
      CardsService.getOneCard(cards.card)
      .then(function goToCreateCard() {
        $state.go('cards');
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;
      });
    };

    /**
     * Get the array from getLastCard from CardsService
     * @return {Object} [description]
     */
    vm.getLastCard = function getLastCard(){

      CardsService.getAllCards()
      .then(function lastMath(card) {
        let last = (card.length - 1);
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
