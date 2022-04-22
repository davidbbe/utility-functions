'use strict';

function setCookieSourceTracking(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); // cookie remains for 30 day
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.spectra.particle.io;path=/";
}

function getCookieSourceTracking(tintColor) {
  var indexLookupKey;
  var filter;
  var str_out;
  var nextIdLookup = document.cookie.split(";");
  /** @type {number} */
  indexLookupKey = 0;
  for (; indexLookupKey < nextIdLookup.length; indexLookupKey++) {
    filter = nextIdLookup[indexLookupKey].substr(0, nextIdLookup[indexLookupKey].indexOf("="));
    str_out = nextIdLookup[indexLookupKey].substr(nextIdLookup[indexLookupKey].indexOf("=") + 1);
    filter = filter.replace(/^\s+|\s+$/g, "");
    if (filter == tintColor) {
      return unescape(str_out);
    }
  }
};

var getURLParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

var referrer = document.referrer;
var currenturl = document.location.href;
var referralhost = "";

var params = getURLParams(window.location);
var cookietime = getCookieSourceTracking("_mkto_datetime");
if (params['utm_source'] || params['utm_medium'] || params['utm_campaign'] || params['utm_term'] || params['utm_content'] || params['google_ad_id'] || params['google_ad_group']) {
  if (params['utm_source']) {
    setCookieSourceTracking("_mkto_source", params['utm_source']);
  }
  if (params['utm_medium']) {
    setCookieSourceTracking("_mkto_medium", params['utm_medium']);
  }
  if (params['utm_campaign']) {
    setCookieSourceTracking("_mkto_utm_campaign", params['utm_campaign']);
  }
  if (params['utm_term']) {
    setCookieSourceTracking("_mkto_utm_term", params['utm_term']);
  }
  if (params['utm_content']) {
    setCookieSourceTracking("_mkto_utm_content", params['utm_content']);
  }
  if (params['google_ad_id']) {
    setCookieSourceTracking("_mkto_adID", params['google_ad_id']);
  }
  if (params['google_ad_group']) {
    setCookieSourceTracking("_mkto_adGroup", params['google_ad_group']);
  }
  if (referrer && referrer.toLowerCase().indexOf("exampleCompanyWebsiteDomain") != -1) {
    // Don't save referrer if its from one of the company websites
    if(!getCookieSourceTracking("_mkto_referrer") && referrer){
      setCookieSourceTracking("_mkto_referrer", referrer);
    }
  }
  /** @type {!Date} */
  var d = new Date;
  var currenttime = d.getTime().toString();
  setCookieSourceTracking("_mkto_datetime", currenttime);
} else {
  if (referrer && referrer.toLowerCase().indexOf("exampleCompanyWebsiteDomain") != -1) {
    // Don't save referrer if its from one of the company websites
    if(!getCookieSourceTracking("_mkto_referrer")){
      setCookieSourceTracking("_mkto_referrer", referrer);
    }
  }
  /** @type {!Date} */
  var d = new Date;
  var currenttime = d.getTime().toString();
  setCookieSourceTracking("_mkto_datetime", currenttime);
}



// Then when you are ready to add the utms somewhere, use this below.
// Note: form.vals() is a Marketo specific function for entering values to forms.
var params = getURLParams(window.location);
var formsdata = new Object();
if(params['utm_source']){
  formsdata.utmsource = params['utm_source'];
}else if(getCookieSourceTracking("_mkto_source")){
  formsdata.utmsource = getCookieSourceTracking("_mkto_source");
}
if(params['utm_medium']){
  formsdata.utmmedium = params['utm_medium'];
}else if(getCookieSourceTracking("_mkto_medium")){
  formsdata.utmmedium = getCookieSourceTracking("_mkto_medium");
}
if(params['utm_campaign']){
  formsdata.utmcampaign = params['utm_campaign'];
}else if(getCookieSourceTracking("_mkto_utm_campaign")){
  formsdata.utmcampaign = getCookieSourceTracking("_mkto_utm_campaign");
}
if(params['utm_term']){
  formsdata.utmterm = params['utm_term'];
}else if(getCookieSourceTracking("_mkto_utm_term")){
  formsdata.utmterm = getCookieSourceTracking("_mkto_utm_term");
}
if(getCookieSourceTracking("_mkto_referrer")){
  formsdata.Most_Recent_Referrer_URL__c = getCookieSourceTracking("_mkto_referrer");
}else if(referrer){
  formsdata.Most_Recent_Referrer_URL__c = referrer;
} 
if (referrer && referrer.toLowerCase().indexOf("exampleCompanyWebsiteDomain") >= 0) {
  formsdata.Website_Referral_URL__c = referrer;
}
if(currenturl){
  formsdata.Form_Fill_URL__c = currenturl;
}
if(params['utm_content']){
  formsdata.utmcontent = params['utm_content'];
}else if(getCookieSourceTracking("_mkto_utm_content")){
  formsdata.utmcontent = getCookieSourceTracking("_mkto_utm_content");
}
if(Object.keys(formsdata).length > 0){
  form.vals(formsdata);
}