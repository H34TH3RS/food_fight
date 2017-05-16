(function() {
  'use strict';

  angular.module('game').factory('GameService', GameService);

  GameService.$inject =['$http', 'CardsService'];

  function GameService($http, CardsService) {

    let bots = [
      {enemy:'RESERVED FOR BOSS',
      klass: 'XXXX',
      health: 0,
      strength: 0,
      defense:0,
      image:'http://www.verticaljumping.com/images/redcross.png'},
      {enemy:'Not so Mellow Marshall',
      klass: 'Sugary',
      health: 13,
      strength: 14,
      defense:2,
      image:'https://s-media-cache-ak0.pinimg.com/originals/52/fe/36/52fe36be92c7cf64bab91d9fb49f6827.gif'},
      {enemy:'Crazy Carrotina',
      klass: 'Normal',
      health: 12,
      strength: 4,
      defense:1,
      image:'http://piq.codeus.net/static/media/userpics/piq_80344_400x400.png'},
      {enemy:'Cheeky Cherries',
      klass: 'Sugary',
      health: 12,
      strength: 3,
      defense:1,
      image:'http://orig12.deviantart.net/4ba0/f/2014/238/5/3/53faec0367b50eb9b65b5b2455bdfccf-d7wtb1e.png'},
      {enemy:'Eggploding Eggbert',
      klass: 'Normal',
      health: 14,
      strength: 6,
      defense:1,
      image:'http://orig03.deviantart.net/1039/f/2012/008/7/5/8bit_egg_by_xxx515xxx-d4ls0ll.png'}
    ];

    let bosses = [
      { enemy:'Kevin Bacon and Eggz',
      klass: 'Salty',
      health: 100,
      strength: 23,
      defense:10,
      image:'https://s-media-cache-ak0.pinimg.com/736x/86/07/37/86073779879c4777c617c6cea2e9eac6.jpg'},
    ];

    let treasures = [
      {treasure: 'a chocolate  golden egg',
      image:'http://lunamatic.net/wp-content/uploads/2013/04/easter-egg.gif'},
      {treasure:' some hot hot pizza',
      image:'https://68.media.tumblr.com/567f3e4a905f3a2011513dfb67016bac/tumblr_o1vrrdMQ7x1uf5cjoo1_500.gif'},
      {treasure: 'refreshing watermelon',
      image:'http://pa1.narvii.com/6142/57b600d3f3a611a78b4efc3440b81a9e3a3baa5d_hq.gif'},
      {treasure: 'a strange fizzy drink',
      image:'https://68.media.tumblr.com/21cccbb9171708acb9304a1c6a921e5c/tumblr_n8vn79Bn6b1snc5kxo1_500.gif'},
      {treasure: 'a cat dressed up us a pop-tart?',
      image:'http://www.nyan.cat/cats/slomo.gif'}
    ];

    let nothings = [
      {nothing:'a chicken....maybe?',
      image:'http://rs1195.pbsrc.com/albums/aa399/SKiTTLeS-taste-THE-fricken-RAINBOW/CUTE%20PIXEL%20ART%20ICONS%20AND%20GRAPHICS/cute-122.gif~c200'},
      {nothing:' tumble weeds go by...',
      image:'http://orig11.deviantart.net/8b5e/f/2016/138/9/7/tumbleweed_animation__game_jam_asset__by_jaylastar-da2plh2.png'},
      {nothing:'just some wilted lettuce..',
      image:'http://orig09.deviantart.net/ed44/f/2012/140/1/c/salad_bowl_pixel_art_by_tacticalsmurf-d50hqwk.png'},
      {nothing:'it jiggles...',
      image:'http://data.whicdn.com/images/189801943/original.gif'}
    ];

    /**
    * Gets the character card used by the user to play the game.
    * @return {Array} An array containing one object that represents one indivudual character card.
    */
    function getUserCard() {
      return CardsService.getOneCard().then(function(card) {
        console.log("Card from card service", card);
        let playerCard =[{
          name: card.food_name,
          health: card.health,
          strength: card.strength,
          defense: card.defense,
          klass: card.klass,
          items:2,
          image:'http://24.media.tumblr.com/tumblr_mcq3a2gqOb1r5sz4co1_400.gif'
        }];
        return playerCard;
      });
    }

    /**Gets the enemy bots against which the user will play.
    * @return {Array} The array containing the enemy bots.
    */
    function getBots() {
      return bots;
    }

    /**Gets the boss enemies to be battled.
    * @return {Array} The Array containing the final bosses.
    */
    function getBosses() {
      return bosses;
    }

    /**Gets the treasure items that the user can collect.
    * @return {Array} The array containing found items.
    */
    function getTreasures() {
      return treasures;
    }

    /**
    * The will be the function that grabs a neutral event.
    * @return {Array} The array containing neutral events.
    */
    function getEvents() {
      return nothings;
    }

    return {
      getBosses: getBosses,
      getEvents: getEvents,
      getTreasures: getTreasures,
      getUserCard: getUserCard,
      getBots : getBots
    };

  }

}());
