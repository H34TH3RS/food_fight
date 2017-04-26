(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http', 'UserService'];

  /**
   * Creates the UPC Service
   * @param {Function} $http Service that allows ajax calls
   * @return {Promise}
   */
  function UpcService($http, UserService) {

    let token = UserService.getToken();
    console.log(token);


    function sendUpcData(upcCode) {
      console.log('inside sendUpcData', token);
      return $http({
        url: '/api/cards',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: {
          upc: upcCode
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      sendUpcData: sendUpcData
    };
  }

}());
