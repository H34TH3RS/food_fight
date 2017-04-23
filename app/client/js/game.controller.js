(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state'];

  function GameController($state){

    let vm = this;
    vm.board = 30;
    vm.roll = 0;
    vm.status = '';
    vm.botHealth = 0;
    vm.playerHealth = localStorage.getItem('playerHealthLocal');
    vm.message = '';
    vm.botName ='';

    //this will be replaced with data from elsewhere. This is just for  testing
    let player = [
      { name: 'Taco Mac',
      health: 20,
      strength: 8,
      defense: 20,
    }
  ];
  let enemies = [
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
  let enemyPick;
  let chance = 100;
  let treasureChance = 5;
  let nothing = 30;
  let battleBool = false;
  let clickCount = 0;
  let basicPlayerHealth = player[0].health;
  let basicBotHealth;
  let botBtlStr = 0;
  let botBtlDef = 0;
  let battleRate = 20;
  let playerDef =  player[0].defense;
  let playerStr =  player[0].strength;

  vm.image = 'https://thoughtuncommon.files.wordpress.com/2013/09/the-necronomicon23.jpg';


  vm.checkBattleBool = function checkBattleBool(){
    console.log(battleBool);
    vm.playerHealth = localStorage.getItem('playerHealthLocal');
    vm.botHealth = localStorage.getItem('botHealthLocal');
    return battleBool;
  };


  vm.rollRNG = function rollRNG(){
    vm.roll = Math.floor(Math.random()*6)+1;
    vm.board = vm.board - vm.roll;
    vm.message = '';

    if(vm.board <=0){
      $state.go('end');
    }

    let encounter = Math.floor(Math.random()*chance)+1;
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
      battleBool = true;
      console.log(battleBool);
      enemyPick = Math.floor(Math.random()* enemies.length);
      vm.botHealth = localStorage.setItem('botHealthLocal', enemies[enemyPick].health);
      basicBotHealth = enemies[enemyPick].health;
      botBtlStr= enemies[enemyPick].strength;
      vm.image = enemies[enemyPick].image;
      vm.botName = enemies[enemyPick].enemy;
      vm.status = 'You fight ' + enemies[enemyPick].enemy + ' !';
    }

    vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
    console.log(battleBool);


    return vm.roll, vm.board, vm.status;
  };





  //if an enemy is encountered, i need to open up the battle panel.
  vm.battle = function battle(){
    clickCount = clickCount ++;

    if (battleBool === true){
      vm.playerHealth = localStorage.getItem('playerHealthLocal');
      vm.botHealth = localStorage.getItem('botHealthLocal');

      vm.battleRoll = Math.floor(Math.random()*100)+1;

      if(vm.battleRoll < battleRate){
        vm.playerHealth = vm.playerHealth - botBtlStr;
      }else{
        vm.botHealth = vm.botHealth - playerStr;
      }

      enemies[enemyPick].health = vm.botHealth;
      player[0].health = vm.playerHealth;
      console.log('player health', vm.playerHealth);
      console.log('bot health', vm.botHealth);

      if(player[0].health <= 0){
        player[0].health = basicPlayerHealth;
        $state.go('lost');
      }
      if(vm.botHealth <= 0){
        console.log('You destroyed ' + vm.botName);
        vm.message = 'You destroyed ' + vm.botName;
        battleBool = !battleBool;
        enemies[enemyPick].health = basicBotHealth;
      }

      //updates the health of either
      vm.botHealth = localStorage.setItem('botHealthLocal', enemies[enemyPick].health);
      vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
    }

    if(clickCount === 1){
      battleBool = !battleBool;//this changes on every click of atk
      console.log(battleBool);
    }
    return;
  };


}

}());
