(function() {
  'use strict';

  let expect = chai.expect;

  describe('game service', function() {

    let GameService;

    beforeEach(module('game'));

    beforeEach(inject(function(_GameService_) {
      GameService = _GameService_;
    }));


      it('should be return 3', function() {
        expect(GameService.getBots().length).to.equal(3);
      });

      it('should be return 4', function() {
        expect(GameService.getTreasures().length).to.equal(3);
      });

      it('should be return 2', function() {
        expect(GameService.getEvents().length).to.equal(3);
      });

      it('should be a function', function() {
        expect(GameService.getUserCard).to.be.a('function');
        expect(GameService.getBots).to.be.a('function');
        expect(GameService.getTreasures).to.be.a('function');
        expect(GameService.getEvents).to.be.a('function');
      });

      it('should return an array', function() {
        expect(GameService.getBots()).to.be.an('array');
        expect(GameService.getTreasures()).to.be.an('array');
        expect(GameService.getEvents()).to.be.an('array');
      });

      it('should return an object', function() {
        expect(GameService.getUserCard()).to.be.an('object');

      });






  });



}());
