(function() {
  'use strict';

  let expect = chai.expect;

  describe ('GameController', function(){

    let GameController;
    let mockGameService = {};


    beforeEach(module('game'));

    beforeEach(module(function($provide) {
      $provide.value('GameService', mockGameService);
    }));

    beforeEach(inject(function($controller) {

      mockGameService.getUserCard = function getUserCard() {
        let playerCard =[{
          name: 'test',
          health: 20,
          strength: 10,
          defense: 10,
          items: 2,
          image:'src'
          }];
        return playerCard;

      };
      mockGameService.getBots = function getBots() {
        let bots = [{
          enemy:'thing',
          strength:1,
          defense:1,
          image:'src'
        }];
        return bots;
      };
      mockGameService.getTreasures = function getTreasures() {
        let treasures = [{
          treasure:'thing',
          image:'ssdg'
          }];
        return treasures;
      };
      mockGameService.getEvents= function getEvents() {
        let nothings = [{
          nothing:'thing',
          image:'ssdg'
          }];
        return nothings;
      };
      // Add stubbed functions here for line 41 and 49 spec
      GameController = $controller('GameController');

    }));




    it('should be a function', function() {
      expect(GameController.fullHealth).to.be.a('function');
      expect(GameController.fullBotHealth).to.be.a('function');
      // expect(GameController.rngEncounter).to.be.a('function');
      expect(GameController.checkBattleBool).to.be.a('function');
      expect(GameController.rollRNG).to.be.a('function');
      expect(GameController.rollCtrl).to.be.a('function');
      // expect(GameController.addItem).to.be.a('function');
      // expect(GameController.randomEncounter).to.be.a('function');
      // expect(GameController.battle).to.be.a('function');
      // expect(GameController.fightFunc).to.be.a('function');
      // expect(GameController.playerDeathCheck).to.be.a('function');
      // expect(GameController.botAtk).to.be.a('function');
      expect(GameController.playerDef).to.be.a('function');
      expect(GameController.playerItems).to.be.a('function');
      // expect(GameController.playerHealthUpdate).to.be.a('function');
      // expect(GameController.unshiftMessages).to.be.a('function');
    });

    it('should return a number', function() {
      expect(GameController.fullHealth(100)).to.be.a('number');
      expect(GameController.fullBotHealth(100)).to.be.a('number');
      // expect(GameController.rngEncounter(100)).to.be.a('number');
      expect(GameController.rollCtrl(1)).to.be.a('number');
      // expect(GameController.addItem(1)).to.be.a('number');
      // expect(GameController.fightFunc(100)).to.be.a('number');
      // expect(GameController.playerDeathCheck(100)).to.be.a('number');
      // expect(GameController.playerHealthUpdate(100)).to.be.a('number');

    });

    // it('should return a boolean', function() {
    //   expect(GameController.checkBattleBool(true)).to.be.a('boolean');
    //   expect(GameController.battle(true)).to.be.a('boolean');
    // });

    // it('should return a string', function() {
    //   expect(GameController.unshiftMessages('test')).to.be.a('string');
    // });
  });
}());
