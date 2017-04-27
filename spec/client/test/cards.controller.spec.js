(function() {
  'use strict';

  let expect = chai.expect;

  describe('CardsController', function() {

    let CardsController;
    let mockCardsService = {};
    // let cards = [{}, {}];


    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('CardsService', mockCardsService);
    }));


    beforeEach(inject(function($controller) {

      mockCardsService.getAllCards = function getAllCards(cards){
           cards =[{card:1},{card:2}];
           console.error(cards.length);
          return Promise.resolve(
            [{card:1},{card:2}]
          );
      };

      mockCardsService.getOneCard = function getOneCars(){
          return Promise.resolve(
            [{card:1}]
          );
      };

      CardsController = $controller('CardsController');
    }));



    describe('getAllCards', function() {

        it('should be a function', function(){
        expect(CardsController.getAllCards).to.be.a('Function');
      });

      // it('should return an array', function() {
      //   console.error(CardsController.getAllCards.cards);
      //   expect(CardsController.getAllCards.cards.length).to.equal(2);
      // });

  });


    // it('should reject an argument that is not an object', function() {
    //   let result = CardsController.getAllCards(1);
    //   expect(result.length).to.equal('undefined');
    // });

  });

}());
