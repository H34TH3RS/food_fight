(function() {
  'use strict';

angular.module('game').controller('GameController', GameController);

GameController.$inject =['$state'];

  function GameController($state){

    let vm = this;
    let board = 25;

  //TODO
  //Basic 'movement'
  //2. The roll will be the number of moves the character makes on the board.
  //    --the board is jsut a set number of spaces that the char must get through.
  //3. After every roll, the board space count (BSC) will subtract the roll. When
  //    the BSC reaches 0, the board is complete.
  //


  vm.rollRNG =  function rollRNG(){
    let roll = 0;
    roll = Math.floor(Math.random()*6)+1;
    return roll;
  };

  




  //TODO
  //Board mechanics
  //1. After every roll, there will be another roll that determines if the player
  //    enters into a battle or gets and item. If a battle is entered, then the
  //    controller will make a call to the backend for an enemey card. Maybe it would
  //    be better to pre-load an array o enemy objects and pick one randomly?









  }

}());
