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
    vm.botName ='';
    vm.image = 'https://thoughtuncommon.files.wordpress.com/2013/09/the-necronomicon23.jpg';

    //this will be replaced with data from elsewhere. This is just for  testing
    /*********************************************************************************/
    let player = [
      { name: 'Taco Mac',
      health: 20,
      strength: 8,
      defense: 20,
      items:0
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
    strength: 3,
    defense:1,
    image:'http://piq.codeus.net/static/media/userpics/piq_80344_400x400.png'},
    { enemy:'Eggploding Eggbert',
    health: 14,
    strength: 3,
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
  let treasureChance = 29;
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
    vm.message = ''; // clears the last message displayed
    if (vm.boardSize > 0){
      randomEncounter();
    }else{
      $state.go('end');
    }
    return vm.roll, vm.boardSize;
  };

  function randomEncounter(){
    console.log('in random encounter');
    let encounter = rngEncounter();
    if ( encounter < treasureChance){
      battleBool = false;
      vm.status = ' ';
      let treasurePick = Math.floor(Math.random()* treasures.length);
      vm.image = treasures[treasurePick].image;
      vm.status = 'You find ' + treasures[treasurePick].treasure + '! Neato....';
    }else if(encounter < nothing && encounter > treasureChance ) {
      vm.status = ' ';
      battleBool = false;
      let nothingPick = Math.floor(Math.random()* nothings.length);
      vm.image = nothings[nothingPick].image;
      vm.status = (nothings[nothingPick].nothing + ' I guess you should move on...');
    }else{
      vm.status = ' ';
      battleBool = true; //this is set to true so that the fight menu can be displayed
      botPick = Math.floor(Math.random()* bots.length);
      vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
      basicBotHealth = bots[botPick].health;
      botBtlStr= bots[botPick].strength;
      vm.image = bots[botPick].image;
      vm.botName = bots[botPick].enemy;
      vm.status = 'You fight ' + bots[botPick].enemy + ' !';
      vm.battle();
    }
    //this resets the players health to base health if a new game is started
    vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
    //is it bad paractice to return multiple variables
    return vm.status;
  }

  /**
  * This handles the battle mechanics.
  * @return {VOID} [description]
  */
  vm.battle = function battle(){
    console.log('in battle');
    vm.canRollCheck = true;
    atkClick = atkClick ++;
    vm.battleRoll = Math.floor(Math.random()*100)+1;
    const BattleRoll = vm.battleRoll;
    if(vm.battleRoll < battleRate){
      playerTurn = false;
    }

    if(atkClick === 1){
      //the disallows batle bool to be changes while inside this function
      battleBool = !battleBool;//this changes on every click of atk
    }
    return;
  };

  function fightFunc(){
    vm.botHealth = localStorage.getItem('botHealthLocal');
    console.log('Current playerTurn bool is ', playerTurn);
    console.log('fightFunc loop');

    if(playerTurn === true){
      bots[botPick].health = vm.botHealth;
      console.log('player turn');
      if(vm.botHealth <=0){
        vm.message = 'You destroyed ' + vm.botName;
        battleBool = !battleBool;
        bots[botPick].health = basicBotHealth;
        return;
      }
      return;
    }else{
      botAtk();
      if(player[0].health <= 0){
        $state.go('lost');
      }
      return;
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

//add the setTimeout method
  function botAtk(){
    console.log('Bot turn');
    playerTurn = true;
    console.log('inside the bot');
    vm.playerHealth = vm.playerHealth - botBtlStr;
    player[0].health = vm.playerHealth;
    vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
    fightFunc();
  }



}
}());



//serperate everything into more manageable blocks
