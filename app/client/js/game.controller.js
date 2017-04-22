(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state'];

  function GameController($state){

    let vm = this;
    vm.board = 200;
    vm.roll = 0;
    vm.status = '';
    vm.botHealth = 0;
    vm.playerHealth = localStorage.getItem('playerHealthLocal');
    //this will be replaced with data from elsewhere. This is just for  testing
    let player = [
      { name: 'Taco Mac',
      health: 10,
      strength: 10
      }
    ];
    let enemies = [
      { enemy:'Deadly Daikon Dan',
      health: 1,
      image:'https://blocksworld-production.s3.amazonaws.com/user_model_c4c20a13-d296-487b-a734-315449712234_image-768x768.png'},
      { enemy:'Crazy Carrotina',
      health: 2,
      image:'http://piq.codeus.net/static/media/userpics/piq_80344_400x400.png'},
      { enemy:'Eggploding Eggbert',
      health: 3,
      image:'http://orig03.deviantart.net/1039/f/2012/008/7/5/8bit_egg_by_xxx515xxx-d4ls0ll.png'}
    ];
    let treasures = [
      {treasure:'a Golden Egg'},
      {treasure:'some Cool Beans'},
      {treasure:'some Salt'}
    ];
    let nothings = [
      {nothing:'Nothing here but some boneless chickens...'},
      {nothing:'You can hear crickets in the background.'},
      {nothing:'You encounter a some wilted lettuce.'}
    ];

    let chance = 100;
    let treasureChance = 5;
    let nothing = 30;
    let battleBool = false;
    let clickCount = 0;
    let basicPlayerHealth = player[0].health;


  vm.rollRNG = function rollRNG(){
    vm.roll = Math.floor(Math.random()*6)+1;

    vm.board = vm.board - vm.roll;
    if (vm.board <= 0){
      $state.go('end');
    }
    let encounter = Math.floor(Math.random()*chance)+1;
    if ( encounter < treasureChance){
      battleBool = false;
      vm.status = ' ';
      let treasurePick = Math.floor(Math.random()* treasures.length);
      vm.status = 'You find ' + treasures[treasurePick].treasure + '! Neato....';

    }else if(encounter < nothing && encounter > treasureChance ) {
      vm.status = ' ';
      battleBool = false;
      let nothingPick = Math.floor(Math.random()* nothings.length);
      vm.status = (nothings[nothingPick].nothing + ' I guess you should move on...');

    }else{
      vm.status = ' ';
      battleBool = true;
      console.log(battleBool);
      let enemyPick = Math.floor(Math.random()* enemies.length);
      vm.botHealth = localStorage.setItem('botHealthLocal', enemies[enemyPick].health);
      vm.image = enemies[enemyPick].image;
      vm.status = 'You fight ' + enemies[enemyPick].enemy + ' !';
    }

    vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
    console.log(battleBool);
    return vm.roll, vm.board, vm.status;
  };


  vm.checkBattleBool = function checkBattleBool(){
    console.log(battleBool);
    if (battleBool === false){
    vm.image = '';
    }
    return battleBool;
  };

  //if an enemy is encountered, i need to open up the battle panel.
  vm.battle = function battle(){

    clickCount = clickCount ++;

    if (battleBool === true){
      vm.playerHealth = localStorage.getItem('playerHealthLocal');
      console.log(vm.playerHealth);
      console.log(battleBool);
      vm.botHealth = localStorage.getItem('botHealthLocal');
      console.log(vm.botHealth);
      vm.playerHealth = vm.playerHealth - vm.botHealth;
      player[0].health = vm.playerHealth;
      console.log('player health', vm.playerHealth);
      if(player[0].health <= 0){
        player[0].health = basicPlayerHealth; // need to set it so that the
        //playerhealth Object is what the health get's reset to and not a
        //pre made variabel;
        vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
        $state.go('end');
      }
      vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
    }
  };

  if(clickCount === 1){
    battleBool = !battleBool;//this changes on every click of atk
    console.log(battleBool);
  }




  //TODO
  //Flesh out the game mechanincs a bit more.
  //Need to make some fake stats for the enemies
  //Need to make a fake character
  //
  //Need to make the char roll the the game and actually
  //battle an enemey and persist the HP in local storage after each battle
  //will need to get some actual fight commands. Items can wait



}

}());
