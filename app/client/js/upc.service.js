(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http', 'UserService'];

  /**
  * Creates the UPC Service
  * @param {Function} $http Service that allows AJAX calls
  * @param {Function} UserService Service that obtains the user auth token.
  * @return {Promise}
  */
  function UpcService($http, UserService) {

    let token = UserService.getToken();
    let upcInfo ={};

    /**
    * Sends the UPC to the database in order to retrieve nutritional information for populating character cards.
    * @param  {Object} upcCode The object containing the UPC. Must contain {upc: 999}
    * @return {Function}     The AJAX call that contains the nutritional information.
    */
    function sendUpcData(upcCode) {
      return $http({
        url: '/api/cards',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: {
          upc: upcCode.upc
        }
      })
      .then(function handleResponse(response) {
        upcInfo = response.data;
        return response.data;
      });
    }

    /**
    * Returns the response data obtained by sendUpcData.
    * @return {Object} The object containing nutritional info.
    */
    function storedData(){
      return upcInfo;
    }

    return {
      sendUpcData: sendUpcData,
      storedData: storedData
    };

  }

}());
