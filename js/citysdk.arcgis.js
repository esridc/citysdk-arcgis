/**
* CitySDK module for GeoServices served from ArcGIS
* 
* Part of the US Census CitySDK project: https://github.com/uscensusbureau/citysdk
*/

//Attach a new module object to the CitySDK prototype.
//It is advised to keep the filenames and module property names the same
CitySDK.prototype.modules.arcgis = new ArcgisModule();

//Module object definition. Every module should have an "enabled" property and an "enable"  function.
function ArcgisModule() {
  this.enabled = true;
};

/**
* Processes a data request by looking at a JSON request
*
* @param {object} request The JSON object of the request
* @param {function} callback A callback, which accepts a response parameter
*/
ArcgisModule.prototype.APIRequest = function(request, callback) {
  var request = CitySDK.prototype.sdkInstance.ajaxRequest(request.url);

  //Attach a completion event to the promise
  request.done(function(response) {
    //Turn it into json
    var jsonObject = $.parseJSON(response);
    //Call the callback
    callback(jsonObject);
  });    
  return;
};
