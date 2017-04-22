(function() {
  'use strict';

  angular.module('game').controller('GameController', GameController);

  GameController.$inject =['$state'];

  function GameController($state){

    let vm = this;
    vm.board = 1000;
    vm.roll = 0;
    // vm.enemy =' ';
    // vm.treasure =' ';
    vm.status = '';

    let enemies = [
      {enemy:'Deadly Daikon Dan'},
      {enemy:'Crazy Carrotina'},
      {enemy:'Eggploding Eggbert'}
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
      // vm.enemy =' ';
      // vm.treasure = ' ';
      console.log(vm.roll);

      vm.board = vm.board - vm.roll;
      if (vm.board <= 0){
        console.log(vm.endMessage);
        $state.go('end');
      }
      let encounter = Math.floor(Math.random()*chance)+1;
      if ( encounter < treasureChance){
        vm.status = ' ';
        let treasurePick = Math.floor(Math.random()* treasures.length);
        console.log(treasures[treasurePick]);
        vm.status = 'You find ' + treasures[treasurePick].treasure + '! Neato....';
        // return vm.status;
        //
      }else if(encounter < nothing && encounter > treasureChance ) {
        vm.status = ' ';
        let nothingPick = Math.floor(Math.random()* nothings.length);
        console.log(nothings[nothingPick]);
        vm.status = (nothings[nothingPick].nothing + ' I guess you should move on...');
        // return vm.status;
        }else{
          vm.status = ' ';
          let enemyPick = Math.floor(Math.random()* enemies.length);
          console.log(enemies[enemyPick]);
          vm.status = 'You fight ' + enemies[enemyPick].enemy + ' !';
        }




      return vm.roll, vm.board, vm.status;
    };



    //TODO
    // Make an array of enemy and treasure objects that will be selected at random







  }

}());
