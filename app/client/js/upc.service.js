(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http'];

  function UpcService($http) {
    console.log('inside UpcService');
    function sendUpcData(upcCode) {
      console.log('inside sendUpcData');
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
        console.log('inside .then sentUpcData', upcCode.upc);
        return response.data;
      });
    }

    return {
      sendUpcData: sendUpcData
    };
  }

}());
