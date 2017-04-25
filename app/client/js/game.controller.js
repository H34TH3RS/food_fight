(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state'];

  function GameController($state){



    //this will be replaced with data from elsewhere. This is just for  testing
    /*********************************************************************************/
    let player = [
      { name: 'Taco Mac',
      health: 20,
      strength: 8,
      defense: 20,
      items:2
      }
    ];
    let bots = [
      { enemy:'Deadly Daikon Dan',
      health: 10,
      strength: 2,
      defense:1,
      image:'https://blocksworld-production.s3.amazonaws.com/user_model_c4c20a13-d296-487b-a734-315449712234_image-768x768.png'},
      { enemy:'Crazy Carrotina',
      health: 12,
      strength: 4,
      defense:1,
      image:'http://piq.codeus.net/static/media/userpics/piq_80344_400x400.png'},
      { enemy:'Eggploding Eggbert',
      health: 14,
      strength: 6,
      defense:1,
      image:'http://orig03.deviantart.net/1039/f/2012/008/7/5/8bit_egg_by_xxx515xxx-d4ls0ll.png'}
    ];
    let treasures = [
      {treasure:'a Golden Egg',
      image:'http://freepngimages.com/wp-content/uploads/2014/04/EasterGold_Egg_1.png'},
      {treasure:'some Cool Beans',
      image:'http://waycoolbeans.com/wp-content/uploads/2016/06/Way-Cool-Beans-Logo-Small.png'},
      {treasure:'some Salt',
      image:'http://vignette4.wikia.nocookie.net/battlefordreamislandfanfiction/images/7/77/Salt.png/revision/latest?cb=20140331153921'}
    ];
    let nothings = [
      {nothing:'Nothing here but some boneless chickens...',
      image:'https://hydra-media.cursecdn.com/zelda.gamepedia.com/thumb/1/14/HW_Cucco.png/200px-HW_Cucco.png?version=dfa0439718d5e856ae8f416812d3d858'},
      {nothing:'You can hear crickets in the background.',
      image:'http://www.pngmart.com/files/3/Grasshopper-Transparent-PNG.png'},
      {nothing:'You encounter a some wilted lettuce.',
      image:'http://greensaver.oxo.com/wp-content/uploads/2015/02/lettuce_rotten.png'}
    ];
  /*********************************************************************************/

    let vm = this;

    //these need to be cleaned
    let botPick;
    let chance = 100;
    let treasureChance = 10;
    let nothing = 30;
    let battleBool = false;
    let playerTurn = true;
    let atkClick = 0;
    let basicPlayerHealth = player[0].health;
    let basicPlayerItems =  player[0].items;
    let basicBotHealth;
    let botBtlStr = 0;
    let botBtlDef = 0;
    let battleRate = 30;
    let playerDef =  player[0].defense;
    let playerStr =  player[0].strength;
    let playerDefendBool = false;
    const HitChance = 40;
    const itemSmall = 3;

    vm.boardSize = 25;
    vm.roll = 0;
    vm.status = '';
    vm.botHealth = 0;
    vm.playerHealth = localStorage.getItem('playerHealthLocal') || null;
    vm.playerItems = localStorage.getItem('playerItemsLocal') || null;
    vm.message = '';
    vm.messageArray =[];
    vm.botName ='';
    vm.image = 'https://thoughtuncommon.files.wordpress.com/2013/09/the-necronomicon23.jpg';


    vm.fullHealth = function fullHealth() {
      let healthMod = 100/basicPlayerHealth;
      console.log(vm.playerHealth);
      return vm.playerHealth*healthMod;
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
    * @return {Void}
    */
    vm.rollCtrl = function rollCtrl(){
      vm.rollRNG();
      vm.boardSize = vm.boardSize - vm.roll;

      if (vm.boardSize > 0){
        randomEncounter();
      }else{
        $state.go('end');
      }
      return vm.roll, vm.boardSize;
    };

    /**
    * Add and item to the players inventory if the item count is less than 3
    */
    function addItem(){
      if (player[0].items < 3){
        player[0].items =    player[0].items + 1;
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
        unshiftMessages('You find ' + treasures[treasurePick].treasure + '! Neato....');
        addItem();
      }else if(encounter < nothing && encounter > treasureChance ) {
        vm.status = ' ';
        battleBool = false;
        let nothingPick = Math.floor(Math.random()* nothings.length);
        vm.image = nothings[nothingPick].image;
        unshiftMessages(nothings[nothingPick].nothing + ' I guess you should move on...');
      }else{
        vm.status = ' ';
        battleBool = true; //this is set to true so that the fight menu can be displayed
        botPick = Math.floor(Math.random()* bots.length);
        vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
        basicBotHealth = bots[botPick].health;
        botBtlStr= bots[botPick].strength;
        vm.image = bots[botPick].image;
        vm.botName = bots[botPick].enemy;
      unshiftMessages( 'You fight ' + bots[botPick].enemy + ' !');
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
        unshiftMessages(' Make your move...');
        bots[botPick].health = vm.botHealth;
        if(vm.botHealth <=0){
          unshiftMessages('You destroyed ' + vm.botName);
          battleBool = !battleBool;
          bots[botPick].health = basicBotHealth;
        }
      }else{
        unshiftMessages('Enemy makes it\'s move...');
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
      vm.botHealth = vm.botHealth - playerStr;
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
        vm.playerHealth = vm.playerHealth - botBtlStr;
        playerHealthUpdate();
        unshiftMessages('The enemy does ' +  botBtlStr + ' damage');
        playerDeathCheck();
        playerTurn = true;
      }else if (botMiss >= HitChance && playerDefendBool === true){
        playerDefendBool = false;
        vm.playerHealth = vm.playerHealth - (botBtlStr*0.5);
        playerHealthUpdate();
        unshiftMessages('The enemy does ' +  (botBtlStr*0.5) + ' damage');
        playerDeathCheck();
        playerTurn = true;
      }else{
        unshiftMessages('The enemy misses');
        playerTurn = true;
      }
      fightFunc();
    }


    /**
     * Sets the playerDefendBool to true and returns to the fightFunc
     * @return {Function} [description]
     */
    vm.playerDef = function playerDef(){
      unshiftMessages('You defend!');
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
        unshiftMessages('You recovered ' + itemSmall + ' hp');
        player[0].items = player[0].items - 1;
        vm.playerHealth = player[0].health + itemSmall;
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
