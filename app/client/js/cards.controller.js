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
      if(cards.length <=0 || !cards.card) {
        return Promise.reject();
      }
      if(!Array.isArray(cards)) {
        return;
      }
      CardsService.getAllCards()
        .then(function handleResponse(response) {
          vm.card = response;
          return response.data;
      })
      .catch(function handleError(err) {
        vm.message = 'Something went wrong. Error ' + err.status;

      });
    };
    vm.getAllCards();

    // What does this do?
    vm.getOneCard = function getOneCard(card) {
      if(typeof(card) !== 'object') {
        return;
      }
      if(!card.food_name) {
        return Promise.reject();
      }
      CardsService.getOneCard(cards.card)
        .then(function handleResponse(response) {
          return response.data;
        })
        .catch(function handleError(err) {
          vm.message = 'Something went wrong. Error ' + err.status;
        });
      };
  }

}());
