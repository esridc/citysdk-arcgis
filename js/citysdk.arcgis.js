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
* Query an ArcGIS Server
*
* Based on http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Query_Feature_Service_Layer/02r3000000r1000000/
* 
* spatial filters can include {lat: , lng: }, {extent: [west,south,east,north]}, {geometry: esriPolygon}
* where filters are based on the service description
* 
* @param {object} parameters The JSON object of the request
* @param {function} callback A callback function which will recieve the query response
*/
ArcgisModule.prototype.APIRequest = function(parameters, callback) {
  var query = ["f=json","outSR=4326"]
  query.push("outFields=" + (parameters.outFields || "*"))

  if( parameters.where !== null && parameters.where !== undefined ) {
    var where = parameters.where;
    if( Array.isArray(where) ) {
      where = where.join(" AND ");
    }
    query.push("where=" + where);
  } else {
    query.push("where=1=1");
  }

  if( parameters.lat !== undefined && parameters.lng !== undefined ) {
    query.push("geometryType=esriGeometryPoint&geometry=" + parameters.lng + "," + parameters.lat);  
  } else if( parameters.extent !== undefined ) { // [W,S,E,N]
    var extent = parameters.extent;
    if( Array.isArray(extent) ) {
      extent = extent.join(",")
    }
    query.push("geometryType=esriGeometryEnvelope&geometry=" + extent);  
  } else if( parameters.geometry !== undefined ) { 
    query.push("geometryType=esriGeometryPolygon&geometry=" + parameters.geometry);  
  }
  
  var url = parameters.url.replace(/(Server\/\d+).*$/,'$1/query?' + query.join("&"));
  var request = CitySDK.prototype.sdkInstance.ajaxRequest(url);

  //Attach a completion event to the promise
  request.done(function(response) {
    //Turn it into json
    var jsonObject = $.parseJSON(response);
    //Call the callback
    if(jsonObject.error === null || jsonObject.error === undefined) {
      callback(jsonObject);
    } else {
      console.log("Error in CitySDK.Arcgis", jsonObject)
    }
    
  });    
  return;
};
