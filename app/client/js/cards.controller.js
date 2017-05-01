(function() {
  'use strict';

  angular.module('game').controller('CardsController', CardsController);

  CardsController.$inject = ['$state', 'CardsService', 'UpcService'];

  /**
   * Creates Card Controllers
   * @param {Function} $state      Service that allows view routing
   * @param {Function} CardsController Service that contains character card functions
   */
  function CardsController($state, CardsService, UpcService) {

    let vm = this;
    vm.last = {};
    vm.cards = [];
    vm.card = {};
    vm.message = null;
    vm.storedData = UpcService.storedData();
    // console.log(vm.storedData);

   /**
    * Retrieves all character cards in an array
    * @param  {Object} card Must contain {name: xxx}
    * @return {Promise}
    */
    vm.getAllCards = function getAllCards() {

      CardsService.getAllCards()
        .then(function handleResponse(response) {
          vm.card = response;
          console.log(vm.card);
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



    vm.getLastCard = function getLastCard(){

    CardsService.getLastCard()
        .then(function lastMath(card) {
        console.log(card[0]);
        let last = (card.length - 1);
        console.log(card[last]);
        return card[last];
        })

        .catch(function handleError(err) {
          vm.message = 'Something went wrong. Error ' + err.status;
        });
    };

    vm.last = vm.getLastCard();
    console.log(vm.last);

  }

}());
