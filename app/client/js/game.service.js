
(function() {
  'use strict';

  angular.module('game').factory('GameService', GameService);

  GameService.$inject =['$http', 'CardsService', 'UpcService'];

  function GameService($http, CardsService, UpcService){

    let card = CardsService.getCardPick();
    console.log(CardsService.getCardPick());


    let playerCard =[{
      name: 'Taco Cat',
      health: UpcService.storedData().health,
      strength: UpcService.storedData().strength,
      defense: UpcService.storedData().defense,
      items:2,
      image:'http://24.media.tumblr.com/tumblr_mcq3a2gqOb1r5sz4co1_400.gif'
    }];

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
      {nothing:'Boneless Chickens',
      image:'https://hydra-media.cursecdn.com/zelda.gamepedia.com/thumb/1/14/HW_Cucco.png/200px-HW_Cucco.png?version=dfa0439718d5e856ae8f416812d3d858'},
      {nothing:'Crickets',
      image:'http://www.pngmart.com/files/3/Grasshopper-Transparent-PNG.png'},
      {nothing:'just some wilted lettuce.',
      image:'http://greensaver.oxo.com/wp-content/uploads/2015/02/lettuce_rotten.png'}
    ];


    /**
    * This will be the function that grabs the card used by the user to pla
    *  the game.
    * @return {[type]} [description]
    */
    function getUserCard() {
      return playerCard;
    }

    /**This will be the function that grabs bots
    * [getBots description]
    * @return {[type]} [description]
    */
    function getBots() {
      return bots;
    }
    /**
    * This will be the function that grabs the treasure
    * @return {[type]} [description]
    */
    function getTreasures() {
      return treasures;
    }

    /**
    * The will be the function that grabs an event
    * @return {[type]} [description]
    */
    function getEvents() {
      return nothings;
    }

    return {
      getEvents: getEvents,
      getTreasures: getTreasures,
      getUserCard: getUserCard,
      getBots : getBots
    };

  }
}());
