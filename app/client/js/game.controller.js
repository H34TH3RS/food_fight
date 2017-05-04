(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state', 'GameService'];

  function GameController($state, GameService){

    let vm = this;
    let player, botPick;


    const HitChance = 40;
    const itemSmallHP = 0.20;
    const chance = 100;
    const treasureChance = 15;
    const nothing = 30;
    const atkClick = 0;
    const battleRate = 30;
    const NUMBER_OF_MOVES_IN_GAME = 25;
    const DEFENSE_VAR = 0.7;


    GameService.getUserCard().then(function(playerCards) {

      player = playerCards;
      vm.playerDefense =  player[0].defense;
      vm.basicPlayerItems =  player[0].items;
      vm.playerStr =  player[0].strength;
      vm.currentEventName = 'Prepare for Battle!';
      vm.basicPlayerHealth = player[0].health;
      vm.playerName = player[0].name;
      vm.playerImage = player[0].image;
      vm.playerClass = player[0].klass;

    });

    let bots = GameService.getBots();
    let bossCounter = 0;
    let treasures = GameService.getTreasures();
    let events = GameService.getEvents();
    let bosses = GameService.getBosses();
    let KevinBaconHealthInitial = bosses[0].health;
    let playerDefendBool = false;
    let battleBool = false;
    let playerTurn = true;

    vm.basicBotHealth = 0;
    vm.botBtlStr = 0;
    vm.botBtlDef = 0;
    vm.boardSize = NUMBER_OF_MOVES_IN_GAME;
    vm.roll = 0;
    vm.status = '';
    vm.botHealth = localStorage.getItem('healthLocal') || null;
    vm.playerHealth = localStorage.getItem('playerHealthLocal') || null;
    vm.playerItems = localStorage.getItem('playerItemsLocal') || null;
    vm.message = '';
    vm.messageArray =[];
    vm.botName= ' ';
    vm.image = 'http://24.media.tumblr.com/2b614d23b694e6a843b3f59d7e1cda41/tumblr_mn1ytcEZS81s84p5fo1_500.gif';

    /**
    * [Resets the boss health and removes it from the array of enemies
    * after winning or losing.
    * @return {VOID}
    */
    function bossReset(){
      bossCounter = 0;
      bots = GameService.getBots();
      bosses = GameService.getBosses();
      bosses[0].health = KevinBaconHealthInitial;
      if(bots.length > 4){
        bots.shift();
      }
    }

    /**
    * Changes the current health of the player to number out of 100
    * @return {Number} [description]
    */
    vm.fullHealth = function fullHealth() {
      let healthMod = 100/vm.basicPlayerHealth;
      return Math.ceil(vm.playerHealth*healthMod);
    };

    /**
    * Changes the current health of the bot to anumber out of 100
    * @return {Number} [description]
    */
    vm.fullBotHealth = function fullBotHealth() {
      let healthBotMod = 100/vm.basicBotHealth;
      return Math.ceil(vm.botHealth*healthBotMod);
    };

    /**
    * Generates a random number based on the chance variable
    * @return {Number} [description]
    */
    function rngEncounter(){
      return  Math.floor(Math.random()*chance)+1;
    }

    /**
    * checks whether the battlebool var is true or not. Also retrieves the current
    * health of the player and enemy obj
    * @return {Boolean}
    */
    vm.checkBattleBool = function checkBattleBool(){
      vm.canRollCheck = true;
      let counter = 0;
      counter = counter ++;
      vm.playerHealth = localStorage.getItem('playerHealthLocal');
      vm.botHealth = localStorage.getItem('botHealthLocal');
      return battleBool;
    };

    /**
    * Generates a random number between 1 and 6
    * @return {Number}
    */
    vm.rollRNG = function rollRNG(){
      vm.roll = Math.floor(Math.random()*6)+1;
      return vm.roll;
    };

    /**
    * Handles the dice rolls and subtracts the number from the boardSize
    * @return {Number}
    */
    vm.rollCtrl = function rollCtrl(){
      vm.rollRNG();
      vm.boardSize = vm.boardSize - vm.roll;

      if (vm.boardSize > 0){
        randomEncounter();
      }else{
        battleBoss();
      }
      return vm.roll, vm.boardSize;
    };


    /**
    * Checks the players health and the against the boss if a boss battle has
    * been initiated. Sets the boss to the current bot to use the same battle
    * logic.
    * @return {Void}
    */
    function battleBoss(){
      if(player[0].health <= 0){
        playerHealthUpdate();
        $state.go('lost');
      }else{
        bossCounter ++;
        botPick = 0;
        bots.unshift(bosses[0]);
        battleBool = true;
        vm.status = ' ';
        vm.currentEventName = bots[botPick].enemy;
        vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
        vm.basicBotHealth = bots[botPick].health;
        vm.botBtlStr= bots[botPick].strength;
        vm.botClass = bots[botPick].klass;
        vm.image = bots[botPick].image;
        vm.botName = bots[botPick].enemy;
        unshiftMessages( player[0].name + ' fights ' + bots[botPick].enemy + ' !');
        battle();
      }
    }

    /**
    * Checks the health of the boss. If zero, goes to the end game view.
    * @return {Void} [description]
    */
    function bossHealthCheck(){
      if (bosses[0].health <=0){
        bossReset();
        playerHealthUpdate();
        $state.go('end');
      }
    }

    /**
    * This handles the battle mechanics based on the value returned from the const
    * var battleRoll
    * @return {VOID}
    */
    function battle(){
      playerDeathCheck();
      vm.canRollCheck = true;
      vm.battleRoll = Math.floor(Math.random()*100)+1;
      const BattleRoll = vm.battleRoll;
      if(vm.battleRoll < battleRate){
        playerTurn = false;
      }else{
        playerTurn = true;
      }
    }

    /**
    * Handles whether enemy or player goes first depending on the playerTurn
    * value.
    * @return {Void}
    */
    function fightFunc(){
      bossHealthCheck();
      vm.playerHealth = localStorage.getItem('playerHealthLocal');
      vm.botHealth = localStorage.getItem('botHealthLocal');
      if(playerTurn === true){
        unshiftMessages('Make your move...');
        bots[botPick].health = vm.botHealth;
        if(vm.botHealth <=0){
          unshiftMessages(player[0].name + ' destroyed ' + vm.botName);
          battleBool = !battleBool;
          bots[botPick].health = vm.basicBotHealth;
        }
      }else{
        unshiftMessages('It\'s ' + vm.botName + '\s turn...');
        botAtk();
      }
    }

    /**
    * Add and item to the players inventory if the item count is less than 3
    */
    function addItem(){
      if (player[0].items < 3){
        player[0].items = player[0].items + 1;
      }else{
        unshiftMessages('You have too many items');
      }
    }

    /**
    * Will determine what type of encounter the player comes across depending
    * on the generated number
    * @return {Void}
    */
    function randomEncounter(){
      let encounter = rngEncounter();

      if (encounter < treasureChance){
        battleBool = false;
        vm.status = ' ';
        let treasurePick = Math.floor(Math.random()* treasures.length);
        vm.image = treasures[treasurePick].image;
        vm.currentEventName = treasures[treasurePick].treasure;
        clearBotData();
        unshiftMessages(player[0].name +' finds' + treasures[treasurePick].treasure + '! Neato....');
        addItem();
      }else if(encounter < nothing && encounter > treasureChance ) {
        vm.status = ' ';
        battleBool = false;
        let eventPick = Math.floor(Math.random()* events.length);
        vm.currentEventName = events[eventPick].nothing;
        vm.image = events[eventPick].image;
        clearBotData();
        unshiftMessages(events[eventPick].nothing + ' I guess you should move on...');
      }else{
        vm.status = ' ';
        battleBool = true;
        rngBotPick();
        vm.currentEventName = bots[botPick].enemy;
        vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
        vm.basicBotHealth = bots[botPick].health;
        vm.botBtlStr= bots[botPick].strength;
        vm.image = bots[botPick].image;
        vm.botName = bots[botPick].enemy;
        vm.botClass = bots[botPick].klass;
        unshiftMessages( player[0].name + ' fights ' + bots[botPick].enemy + ' !');
        battle();
      }
      vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
      return;
    }

    /**
    * Returns a number greater between from 1 and the length of the bot array;
    * @return {Number} Will never be zero
    */
    function rngBotPick(){
      botPick = Math.floor(Math.random()* bots.length);
      if (botPick === 0){
        botPick = Math.floor(Math.random()* bots.length);
      }else{
        return botPick;
      }
      return botPick;
    }

    /**
    * Check is the players HP isat or below 0. If it is, sends the use to the
    * 'view'.
    * @return {Void}
    */
    function playerDeathCheck(){
      if(player[0].health <= 0){
        bossCounter = 0;
        bossReset();
        playerHealthUpdate();
        $state.go('lost');
      }
    }

    /**
    * Handles the player atk click on the view. Goes back to the fight function
    * after turn.
    * @return {Function} [description]
    */
    vm.playerAtk = function playerAtk(){
      playerTurn = false;
      vm.botHealth = vm.botHealth - vm.playerStr;
      bots[botPick].health = vm.botHealth;
      vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
      return fightFunc();
    };

    /**
    * Handles the bots attack. Will determine if the bot misses or hits based on
    * hitChance var.
    * @return {Function} [description]
    */
    function botAtk(){
      let botMiss = rngEncounter();
      if(botMiss >= HitChance && playerDefendBool === false){
        vm.playerHealth = vm.playerHealth - vm.botBtlStr;
        playerHealthUpdate();
        unshiftMessages(vm.botName + ' does ' +  vm.botBtlStr + ' damage');
        playerDeathCheck();
        playerTurn = true;
      }else if (botMiss >= HitChance && playerDefendBool === true){
        playerDefendBool = false;
        playerDefendTrue();
        playerHealthUpdate();
        unshiftMessages(vm.botName + ' does ' +  (vm.botBtlStr*DEFENSE_VAR) + ' damage');
        playerDeathCheck();
        playerTurn = true;
      }else{
        unshiftMessages(vm.botName + ' misses the attack ');
        playerTurn = true;
      }
      fightFunc();
    }

    function playerDefendTrue(){
      vm.playerHealth = vm.playerHealth - (vm.botBtlStr*DEFENSE_VAR);
    }

    /**
    * Sets the playerDefendBool to true and returns to the fightFunc
    * @return {Function} [description]
    */
    vm.playerDef = function playerDef(){
      unshiftMessages(player[0].name + ' defends!');
      playerDefendBool = true;
      playerTurn = false;
      return fightFunc();
    };

    /**
    * Adds an item if you encounter a treasure and your item invetory is not full.
    * @return {Function}
    */
    vm.playerItems = function playerItems(){
      if(player[0].items === 0){
        unshiftMessages('You are out of items');
      }else{
        unshiftMessages(player[0].name + ' uses an item and recovers ' + itemSmallHP + ' hp');
        player[0].items = player[0].items - 1;
        vm.playerHealth = player[0].health + (vm.basicPlayerHealth * itemSmallHP);
        playerHealthUpdate();
        playerTurn = false;
      }
      fightFunc();
    };

    /**
    * Updtates the player's health  in localStorage
    * @return {Void} [description]
    */
    function playerHealthUpdate(){
      player[0].health = vm.playerHealth;
      vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
      vm.playerHealth = localStorage.getItem('playerHealthLocal');
    }

    /**
    * Adds a string to the array.
    * @param  {String} string message string
    * @return {Void}
    */
    function unshiftMessages(string){
      if(playerTurn === true){
        vm.messageArray.unshift('PLAYER: ' + string);
      }else{
        vm.messageArray.unshift('ENEMY: '+ string);
      }
    }

    /**
    * Sets bot data to 0
    * @return {Void} [used for clearing the data on non-bot encounters]
    */
    function clearBotData(){
      if (battleBool === false){
        vm.basicBotHealth = 0;
        vm.botBtlStr = 0;
        vm.botBtlDef = 0;
      }
    }

  }

}());
