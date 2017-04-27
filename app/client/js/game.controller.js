(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state', 'GameService'];

  function GameController($state, GameService){

    let vm = this;
    let player =[GameService.getUserCard()];
    let bots = GameService.getBots();
    let treasures = GameService.getTreasures();
    let events = GameService.getEvents();
    let botPick;
    let chance = 100;
    let treasureChance = 10;
    let nothing = 30;
    let atkClick = 0;
    vm.basicPlayerItems =  player[0].items;
    vm.basicBotHealth = 0;
    vm.botBtlStr = 0;
    vm.botBtlDef = 0;
    let battleRate = 30;
    vm.playerDefense =  player[0].defense;
    vm.playerStr =  player[0].strength;
    let playerDefendBool = false;
    let battleBool = false;
    let playerTurn = true;
    vm.currentEventName = '';

    vm.basicPlayerHealth = player[0].health;
    const HitChance = 40;
    const itemSmallHP = 3;

    vm.playerName = player[0].name;
    vm.boardSize = 25;
    vm.roll = 0;
    vm.status = '';
    vm.botHealth = localStorage.getItem('healthLocal') || null;
    vm.playerHealth = localStorage.getItem('playerHealthLocal') || null;
    vm.playerItems = localStorage.getItem('playerItemsLocal') || null;
    vm.message = '';
    vm.messageArray =[];
    vm.botName= ' ';
    vm.image = 'https://thoughtuncommon.files.wordpress.com/2013/09/the-necronomicon23.jpg';
    vm.playerImage = player[0].image;


    vm.fullHealth = function fullHealth() {
      let healthMod = 100/vm.basicPlayerHealth;
      return Math.ceil(vm.playerHealth*healthMod);
    };

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
      let counter = 0;//resets the counter evertime the fn is called
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
        player[0].health = vm.basicPlayerHealth;
        $state.go('end');
      }
      return vm.roll, vm.boardSize;
    };

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
      if ( encounter < treasureChance){
        battleBool = false;
        vm.status = ' ';
        let treasurePick = Math.floor(Math.random()* treasures.length);
        vm.image = treasures[treasurePick].image;
        vm.currentEventName = treasures[treasurePick].treasure;
        unshiftMessages(player[0].name +' finds' + treasures[treasurePick].treasure + '! Neato....');
        addItem();
      }else if(encounter < nothing && encounter > treasureChance ) {
        vm.status = ' ';
        battleBool = false;
        let eventPick = Math.floor(Math.random()* events.length);
        vm.currentEventName = events[eventPick].nothing;
        vm.image = events[eventPick].image;
        unshiftMessages(events[eventPick].nothing + ' I guess you should move on...');
      }else{
        vm.status = ' ';
        battleBool = true; //this is set to true so that the fight menu can be displayed
        botPick = Math.floor(Math.random()* bots.length);
        vm.currentEventName = bots[botPick].enemy;
        vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
        vm.basicBotHealth = bots[botPick].health;
        vm.botBtlStr= bots[botPick].strength;
        vm.image = bots[botPick].image;
        vm.botName = bots[botPick].enemy;
      unshiftMessages( player[0].name + ' fights ' + bots[botPick].enemy + ' !');
        battle();
      }
      vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
      return;
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
     * Check is the players HP isat or below 0. If it is, sends the use to the
     * 'view'.
     * @return {Void}
     */
    function playerDeathCheck(){
      if(player[0].health <= 0){
        player[0].health = vm.basicPlayerHealth;
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
        vm.playerHealth = vm.playerHealth - (vm.botBtlStr*0.5);
        playerHealthUpdate();
        unshiftMessages(vm.botName + ' does ' +  (vm.botBtlStr*0.5) + ' damage');
        playerDeathCheck();
        playerTurn = true;
      }else{
        unshiftMessages(vm.botName + ' misses the attack ');
        playerTurn = true;
      }
      fightFunc();
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
        vm.playerHealth = player[0].health + itemSmallHP;
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

  }

}());
