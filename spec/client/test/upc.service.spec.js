(function() {
  'use strict';

  let expect = chai.expect;

  describe('upc service', function(){

    let UpcService;
    let $httpBackend;

    beforeEach(module('game'));

    beforeEach(inject(function(_$httpBackend_, _UpcService_){
      UpcService = _UpcService_;
      $httpBackend = _$httpBackend_;

      $httpBackend.whenPOST('/api/cards')
      .respond([{
        accuracy:2,
        accuracy_buff:1,
        attack_buff:1,
        cleanse:1,
        defense:20,
        energy:10,
        energy_debuff:2,
        food_name:'Ravioli',
        health:25,
        health_buff:0,
        id:1,
        klass:'Salty',
        physical_resistance_debuff:2,
        salt:10,
        strength:7
      }]);
    }));

    describe('sendUpcdata', function(){

      it('should expect the function to be function', function() {
        expect(UpcService.sendUpcData).to.be.a('function');
      });

      it('should expect sendUpcData to return and object', function() {
        expect(UpcService.sendUpcData()).to.be.an('Object');
        let responseData = UpcService.sendUpcData({
          accuracy:2,
          accuracy_buff:1,
          attack_buff:1,
          cleanse:1,
          defense:20,
          energy:10,
          energy_debuff:2,
          food_name:'Ravioli',
          health:25,
          health_buff:0,
          id:1,
          klass:'Salty',
          physical_resistance_debuff:2,
          salt:10,
          strength:7
        });

        responseData.then(function(data){
          expect(data).to.be.an('array');
          // console.info(data);//this is an object inside an array
          // expect([accuracy]).to.be.a('number');//why isnt this right????
        });
        $httpBackend.flush();
      });

    });

  });

}());
