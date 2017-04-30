(function() {
  'use strict';

  let expect = chai.expect;

  describe('user service', function(){

    let UserService;
    let $httpBackend;

    beforeEach(module('game'));

    beforeEach(inject(function(_$httpBackend_, _UserService_){
      UserService = _UserService_;
      $httpBackend = _$httpBackend_;

      $httpBackend.whenPOST('/api/users')
      .respond(
        [{
          data:{
            user: {
              email: 'user.email',
              username: 'user.username',
              password: 'user.password',
              password_confirmation: 'user.password_confirmation'
            }
          }
        }]
      );

      $httpBackend.whenPOST('/api/authorization')
      .respond(
        [{
          data: {
            email: 'email',
            password: 'password'
          }
        }]
      );


    }));


    describe('createUser', function() {

      it('should expect the createUser to be function', function() {
        expect(UserService.createUser).to.be.a('function');
      });

      it('should expect the createUser to be object', function() {

        let responseData = UserService.createUser({
          data:{
            user: {
              email: 'user.email',
              username: 'user.username',
              password: 'user.password',
              password_confirmation: 'user.password_confirmation'
            }
          }
        });
        responseData.then(function(data){
          expect(data.user).to.be.an('object');
          console.info(UserService.createUser());
          // expect(data).to.be.an('sd');
          done();
          $httpBackend.flush();
        });
      });
    });

    describe('login', function() {

      it('should expect the login to be function', function() {
        expect(UserService.login).to.be.a('function');
      });

      it('should expect the createUser to be object', function() {
        let responseData = UserService.login({
          data: {
            email: 'email',
            password: 'password'
          }
        });
        responseData.then(function(data){
          expect(data).to.be.an('object');
          console.info(UserService.login());
          // expect(data).to.be.an('sd');
          done();
          $httpBackend.flush();
        });
      });
    });

  });
}());
