(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http'];

  function UpcService($http) {

    function upcLookup() {
      return $http({
        url: '/api/cards',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data:{
          upc: upcCode.upc
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });

    }

    function sendUpcData(data) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          upc: upc //getting an error here when testing
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      sendUpcData: sendUpcData,
      upcLookup: upcLookup
    };

  }

}());
