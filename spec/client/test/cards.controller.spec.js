(function() {
  'use strict';

  let expect = chai.expect;

  describe('CardsController', function() {

    let CardsController;
    let mockCardsService = {};

    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('CardsService', mockCardsService);
    }));

    beforeEach(inject(function($controller) {
      mockCardsService.getAllCards = function getAllCards() {
        return Promise.resolve(
          [
            {
              accuracy:2,
              accuracy_buff:1,
              attack_buff:1,
              cleanse:1,
              defense:20,
              energy:10,
              energy_debuff:2,
              food_name:'Ravioli',
              health:25,
              health_buff:0,
              id:1,
              klass:'Salty',
              physical_resistance_debuff:2,
              salt:10,
              strength:7
            }
          ]
        );
      };

      mockCardsService.getOneCard = function getOneCard() {
        return Promise.resolve();
      };

      CardsController = $controller('CardsController');

    }));

    it('should be a function', function() {
      expect(CardsController.getAllCards).to.be.a('function');
      expect(CardsController.getOneCard).to.be.a('function');
    });

    it('should reject an argument that is not an object', function() {
      expect(CardsController.getAllCards(1)).to.equal(undefined);
    });

  });

}());
