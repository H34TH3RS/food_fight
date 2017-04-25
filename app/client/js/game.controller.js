(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state'];

  function GameController($state){

    let vm = this;
    vm.boardSize = 1000;
    vm.roll = 0;
    vm.status = '';
    vm.botHealth = 0;
    vm.playerHealth = localStorage.getItem('playerHealthLocal') || null;
    vm.playerItems = localStorage.getItem('playerItemsLocal') || null;
    vm.message = '';
    vm.messageArray =[];
    vm.botName ='';
    vm.image = 'https://thoughtuncommon.files.wordpress.com/2013/09/the-necronomicon23.jpg';

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
    console.log('rollRNG');
    vm.roll = Math.floor(Math.random()*6)+1;
    return vm.roll;
  };


  /**
  * Handles the dice rolls and subtracts the number from the boardSize
  * @return {Void} [description]
  */
  vm.rollCtrl = function rollCtrl(){
    console.log('rollctrl');
    vm.rollRNG();
    vm.boardSize = vm.boardSize - vm.roll; //subtracts the roll from board
    // unshiftMessages(''); // clears the last message displayed
    if (vm.boardSize > 0){
      randomEncounter();
    }else{
      $state.go('end');
    }
    return vm.roll, vm.boardSize;
  };


  function addItem(){
    if (player[0].items < 3){
      player[0].items =    player[0].items + 1;
    }else{
      unshiftMessages('You have too many items');
    }

  }

  function randomEncounter(){
    console.log('in random encounter');
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
    return vm.status;
  }

  /**
  * This handles the battle mechanics.
  * @return {VOID} [description]
  */
  function battle(){
    playerDeathCheck();
    console.log('in battle');
    vm.canRollCheck = true;
    vm.battleRoll = Math.floor(Math.random()*100)+1;
    const BattleRoll = vm.battleRoll;
    if(vm.battleRoll < battleRate){
      playerTurn = false;
      // fightFunc();
    }else{
      playerTurn = true;
      // fightFunc();
    }
  }

  function fightFunc(){
    vm.playerHealth = localStorage.getItem('playerHealthLocal');
    vm.botHealth = localStorage.getItem('botHealthLocal');
    console.log('Current playerTurn bool is ', playerTurn);
    console.log('fightFunc loop');
    if(playerTurn === true){
      unshiftMessages(' Make your move...');
      bots[botPick].health = vm.botHealth;
      console.log('player turn');
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

  function playerDeathCheck(){
    if(player[0].health <= 0){
      $state.go('lost');
    }
  }


  vm.playerAtk = function playerAtk(){
    playerTurn = false;
    console.log('inside the player atk button');
    vm.botHealth = vm.botHealth - playerStr;
    bots[botPick].health = vm.botHealth;
    vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
    fightFunc();
  };

  function botAtk(){
    let botMiss = rngEncounter();
    console.log('Bot turn');
    console.log(botMiss);

    if(botMiss >= 50 && playerDefendBool === false){
      console.log(playerDefendBool);
      vm.playerHealth = vm.playerHealth - botBtlStr;
      playerHealthReturn();
      unshiftMessages('The enemy does ' +  botBtlStr + ' damage');
      playerDeathCheck();
      playerTurn = true;
    }else if (botMiss >= 50 && playerDefendBool === true){
      playerDefendBool = false;
      vm.playerHealth = vm.playerHealth - (botBtlStr*0.5);
      playerHealthReturn();
      unshiftMessages('The enemy does ' +  (botBtlStr*0.5) + ' damage');
      playerDeathCheck();
      playerTurn = true;
    }else{
      unshiftMessages('The enemy misses');
      playerTurn = true;
    }

    console.log('In botatk', player[0].health);
    fightFunc();
  }


  //this is working but the timing makes it not appear so
  vm.playerDef = function playerDef(){
    unshiftMessages('You defend!');
    playerDefendBool = true;
    playerTurn = false;
    fightFunc();
  };


  vm.playerItems = function playerItems(){
    vm.message = ' ';
    if(player[0].items === 0){
      console.log('You have no items');
      unshiftMessages('You are out of items');
    }else{
      unshiftMessages('You used an item');
      player[0].items = player[0].items - 1;
      vm.playerHealth = player[0].health + 3;
      playerHealthReturn();
      playerTurn = false;
    }
    console.log(player[0].items);
    fightFunc();
  };

function playerHealthReturn(){
  player[0].health = vm.playerHealth;
  vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
  vm.playerHealth = localStorage.getItem('playerHealthLocal');
}

function unshiftMessages(string){
  if(playerTurn === true){
    vm.messageArray.unshift('PLAYER: ' + string);
  }else{
    vm.messageArray.unshift('ENEMY: '+ string);
  }
}


}
}());
