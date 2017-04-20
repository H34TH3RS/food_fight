(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http'];

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
