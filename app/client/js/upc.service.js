(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http'];

  function UpcService($http) {

    function sendUpcData(data) {
      return $http({
        url: '',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          upc: upc
        }

      })
      .then(function handleResponse(response) {});
    }


    return {
      sendLogin: sendLogin,
      sendUpcData: sendUpcData,
    };

  }

}());
