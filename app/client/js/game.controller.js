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
    let battleTurn = true;
    let clickCount = 0;
    let basicPlayerHealth = player[0].health;
    let basicPlayerItems =  player[0].items;
    let basicBotHealth;
    let botBtlStr = 0;
    let botBtlDef = 0;
    let battleRate = 20;
    let playerDef =  player[0].defense;
    let playerStr =  player[0].strength;




    /**
     * checks whether the battlebool var is true or not. Also retrieves the current
     * health of the player and enemy obj
     * @return {Boolean}
     */
    vm.checkBattleBool = function checkBattleBool(){
      let counter = 0;
      counter = counter ++;
      console.log(counter);
      console.log(battleBool);
      vm.playerHealth = localStorage.getItem('playerHealthLocal');
      vm.botHealth = localStorage.getItem('botHealthLocal');
      return battleBool;
    };

    /**
     * Generates a random number betwen 1 and 6. After generating the num, subtracts
     * that number from the board, then goes on to generate a number from based on the
     * chance var to determine encounter type. From there, depending on the encounter
     * , a bot, treasure, or "nothing" encounter occur.
     * @return {String} [description]
     */
    vm.rollRNG = function rollRNG(){
      vm.roll = Math.floor(Math.random()*6)+1;//generates the roll
      vm.boardSize = vm.boardSize - vm.roll; //subtracts the roll from board
      vm.message = ''; // clears the last message displayed

      //when the board reaches 0, the games ends. This is where the boss will go
      if(vm.boardSize <=0){
        $state.go('end');
      }

      // this block determines encounter type based on chance var
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
        battleBool = true; //this is set to true so that the fight menu can be displayed
        botPick = Math.floor(Math.random()* bots.length);
        vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
        basicBotHealth = bots[botPick].health;
        botBtlStr= bots[botPick].strength;
        vm.image = bots[botPick].image;
        vm.botName = bots[botPick].enemy;
        vm.status = 'You fight ' + bots[botPick].enemy + ' !';
      }

      //this resets the players health to base health is a new game is started
      vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);

      //is it bad paractice to return multiple variables
      return vm.roll, vm.boardSize, vm.status;
    };

    /**
     * This handles the battle mechanics.
     * @return {VOID} [description]
     */
    vm.battle = function battle(){
      //if this is above 0, then clicking on the atk button will not change the
      //value of battlebool. Maybe this should be a boolean as well.
      clickCount = clickCount ++;

      //this says'if you come across an bot, you will go into a battle.
      //Get the health data for the bot and player
      if (battleBool === true){
        //retrieves the health of the bot and player/
        vm.playerHealth = localStorage.getItem('playerHealthLocal');
        vm.botHealth = localStorage.getItem('botHealthLocal');
        //will do a random roll to decide who atks first
        vm.battleRoll = Math.floor(Math.random()*100)+1;


        //this is the 'initiative' roll. If battleRoll goes below battleRate
        //then the enemy goes first, otherwise it's the players turn.
        if(vm.battleRoll < battleRate){
          //will need to check this against clickCount to make
          //sure that every ATK button push doesnt change the value of battleTurn
          vm.playerHealth = vm.playerHealth - botBtlStr;
          battleTurn = true;
        //players turn
        }else{
          vm.botHealth = vm.botHealth - playerStr;
          battleTurn = false;
        }


        while (vm.playerHealth > 0 && vm.botHealth > 0){
          bots[botPick].health = vm.botHealth;
          player[0].health = vm.playerHealth;




        }



        //All this needs to go insides a while loop.
        //sets the current bot health to be same as vm.botHealth
        //
        bots[botPick].health = vm.botHealth;
        //sets current player health be the same as vm.playerHealth
        //
        player[0].health = vm.playerHealth;

        //If the players health reaches 0, go to the "end" view
        if(player[0].health <= 0){
          player[0].health = basicPlayerHealth;
          $state.go('lost');
        }
        //if the bots health reaches 0, remove the battle menu
        if(vm.botHealth <= 0){
          console.log('You destroyed ' + vm.botName);
          vm.message = 'You destroyed ' + vm.botName;
          battleBool = !battleBool;
          bots[botPick].health = basicBotHealth;
        }

        //updates the health of either
        vm.botHealth = localStorage.setItem('botHealthLocal', bots[botPick].health);
        vm.playerHealth = localStorage.setItem('playerHealthLocal', player[0].health);
      }

      if(clickCount === 1){
        //the disallows batle bool to be changes while inside this function
        battleBool = !battleBool;//this changes on every click of atk
      }
      return;
    };

    vm.btlDefCmd = function btlDefCmd(){

    };

  }
}());


  // TODO
  // After entering into a battle, there needs to be a roll for initiative.
  // -then, depending on the outcome, a bool val is set to either true or fale.
  // Bot turns should happen on false. Player turns should happen on true.
  // When the bot goes, there should be a message saying the bot went with its
  // action. Just ATK for now. There needs to be a timer enabled for this so
  // the player actually sees the action taken. When the bot goes, the players
  // battle options should be disabled and colored differently;
  //
  //
  // the when a player lands on a bot, the initiative is rolled. After determining
  // the order of play, the battleturn var is set to !battleturn. This should be
  // used to go to other turn. A while loop can used to continue the battle until
  // either the bot or player is dead.






  //TODO

  // I need to add the enemy/player turn logic before 1st.
  // I need to get the item and defense options set up.
  // I need to think about seperating the various option out into
  //  -different functions
  // I need to get everything ready to get data from the api.

  // I need to look into better compartmentalizing everything
  //
