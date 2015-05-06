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
    this.enabled = false;
};

//Create a new connection to a GeoService URL
ArcgisModule.prototype.create = function(url) {
    this.url = url;
    this.enabled = true;
};

/**
 * Processes a data request by looking at a JSON request
 *
 * @param {object} request The JSON object of the request
 * @param {function} callback A callback, which accepts a response parameter
 */
ArcgisModule.prototype.APIRequest = function(request, callback) {
  callback(request);
  return
};
