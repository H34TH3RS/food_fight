(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state'];

  function GameController($state){

    let vm = this;
    vm.board = 1000;
    vm.roll = 0;
    vm.status = '';

    //this will be replaced with data from elsewhere. This is just for  testing
    let enemies = [
      {enemy:'Deadly Daikon Dan',
      image:'https://blocksworld-production.s3.amazonaws.com/user_model_c4c20a13-d296-487b-a734-315449712234_image-768x768.png'},
      {enemy:'Crazy Carrotina',
      image:'http://piq.codeus.net/static/media/userpics/piq_80344_400x400.png'},
      {enemy:'Eggploding Eggbert',
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


    vm.rollRNG = function rollRNG(){

      vm.roll = Math.floor(Math.random()*6)+1;

      vm.board = vm.board - vm.roll;
      if (vm.board <= 0){
        $state.go('end');
      }
      let encounter = Math.floor(Math.random()*chance)+1;
      if ( encounter < treasureChance){
        vm.status = ' ';
        let treasurePick = Math.floor(Math.random()* treasures.length);
        vm.status = 'You find ' + treasures[treasurePick].treasure + '! Neato....';

      }else if(encounter < nothing && encounter > treasureChance ) {
        vm.status = ' ';
        let nothingPick = Math.floor(Math.random()* nothings.length);
        vm.status = (nothings[nothingPick].nothing + ' I guess you should move on...');

        }else{
          vm.status = ' ';
          let enemyPick = Math.floor(Math.random()* enemies.length);
          vm.image = enemies[enemyPick].image;
          vm.status = 'You fight ' + enemies[enemyPick].enemy + ' !';
        }

        return vm.roll, vm.board, vm.status;
    };

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
