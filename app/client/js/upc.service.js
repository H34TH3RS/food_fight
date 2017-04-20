(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http'];

  /**
   * Creates the UPC Service
   * @param {Function} $http Service that allows ajax calls
   * @return {Promise}
   */
  function UpcService($http) {
    function sendUpcData(upcCode) {
      return $http({
        url: '/api/cards',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          upc: upcCode.upc
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
