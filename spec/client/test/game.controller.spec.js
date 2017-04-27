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
      mockGameService.fullHealth = function fullHealth() {
        return Promise.resolve();
      };
      mockGameService.fullBotHealth = function fullBotHealth() {
        return Promise.resolve();
      };
      mockGameService.rngEncounter = function rngEncounter() {
        return Promise.resolve();
      };
      mockGameService.rollCtrl = function rollCtrl() {
        return Promise.resolve();
      };
      mockGameService.checkBattleBool = function checkBattleBool() {
        return Promise.resolve();
      };
      // Add stubbed functions here for line 41 and 49 spec
      GameController = $controller('GameController');
    }));

    it('should be a function', function() {
      expect(GameController.fullHealth).to.be.a('function');
      expect(GameController.fullBotHealth).to.be.a('function');
      expect(GameController.rngEncounter).to.be.a('function');
      expect(GameController.checkBattleBool).to.be.a('function');
      expect(GameController.rollRNG).to.be.a('function');
      expect(GameController.rollCtrl).to.be.a('function');
      expect(GameController.addItem).to.be.a('function');
      expect(GameController.randomEncounter).to.be.a('function');
      expect(GameController.battle).to.be.a('function');
      expect(GameController.fightFunc).to.be.a('function');
      expect(GameController.playerDeathCheck).to.be.a('function');
      expect(GameController.botAtk).to.be.a('function');
      expect(GameController.playerDef).to.be.a('function');
      expect(GameController.playerItems).to.be.a('function');
      expect(GameController.playerHealthUpdate).to.be.a('function');
      expect(GameController.unshiftMessages).to.be.a('function');
    });

    it('should return a number', function() {
      expect(GameController.fullHealth(100)).to.be.a('number');
      expect(GameController.fullBotHealth(100)).to.be.a('number');
      expect(GameController.rngEncounter(100)).to.be.a('number');
      expect(GameController.rollCtrl(1)).to.be.a('number');
      expect(GameController.addItem(1)).to.be.a('number');
      expect(GameController.fightFunc(100)).to.be.a('number');
      expect(GameController.playerDeathCheck(100)).to.be.a('number');
      expect(GameController.playerHealthUpdate(100)).to.be.a('number');

    });

    it('should return a boolean', function() {
      expect(GameController.checkBattleBool(true)).to.be.a('boolean');
      expect(GameController.battle(true)).to.be.a('boolean');
    });

    it('should return a string', function() {
      expect(GameController.unshiftMessages('test')).to.be.a('string');
    });
  });
}());
