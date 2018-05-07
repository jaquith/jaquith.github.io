/* Variable declarations for ESLint*/
/* global utag tealium_enrichment*/

//~~tv:20064.20180117
//~~tc: Update u.visitor_id assignment

/* Modified copy of json2.js (no need for parse function)*/
/* https://github.com/douglascrockford/JSON-js */
if(typeof JSON!=='object'){JSON={};}
(function(){'use strict';var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return n<10?'0'+n:n;}
function this_value(){return this.valueOf();}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+ f(this.getUTCDate())+'T'+ f(this.getUTCHours())+':'+ f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}
var gap,indent,meta,rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}
}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}}());


//tealium universal tag - utag.sender.20064 ut4.0.201804110929, Copyright 2018 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={};}catch(e){u=utag.sender[id];}
  u.ev={"all":1};
  u.server_domain = "tealiumiq.com";
  u.server_prefix = "";
  u.tag_config_server = "";
  u.tag_config_sampling = "100" || "100";
  // In debug mode, always in sample group
  if (utag.cfg.utagdb) {
    u.tag_config_sampling = "100";
  }
  u.tag_config_region = "eu-central-1" || "default";
  u.region = "";
  u.performance_timing_count = 0;
  u.account = utag.cfg.utid.split("/")[0];
  u.data_source = "";
  u.profile = "" || utag.cfg.utid.split("/")[1];

  // Handle VPC custom-collect.tealiumiq.com data collection endpoint
  if (u.tag_config_server.indexOf("-collect." + u.server_domain) > 1) {
    u.server_prefix = u.tag_config_server.split("collect." + u.server_domain)[0];
    if (u.tag_config_server.indexOf("/i.gif") < 0 ) {
      u.tag_config_server = "https://" + [u.server_prefix + "collect." + u.server_domain, u.account, u.profile, "2", "i.gif"].join("/");
    }
  }

  // Auto-build the endpoint for Tealium Collect
  if (u.tag_config_server === "") {
    if (u.tag_config_region === "default") {
      u.tag_config_server = "https://" + [u.server_prefix + "collect." + u.server_domain, u.account, u.profile, "2", "i.gif"].join("/");
    } else {
      u.tag_config_server = "https://" + [u.server_prefix + "collect-" + u.tag_config_region + "." + u.server_domain, u.account, u.profile, "2", "i.gif"].join("/");
    }
  }

  // build endpoint if it contains "-collect-"
  if (u.tag_config_server.indexOf("-collect-") > -1) {
    u.server_prefix = u.tag_config_server.split("collect-")[0];
  }

  // For those who fill out collect.tealiumiq.com and then choose a specific region
  if (u.tag_config_region !== "default" && u.tag_config_server.indexOf(u.server_prefix + "collect." + u.server_domain) > 0) {
    u.tag_config_server = u.tag_config_server.replace(u.server_prefix + "collect." + u.server_domain, u.server_prefix + "collect-" + u.tag_config_region + "." + u.server_domain);
    u.region = u.tag_config_region;
  }

  u.data_enrichment="frequent";
  u.profile_specific_vid = 0;
  u.enrichment_polling = 1;
  u.enrichment_polling_delay = 1000;
  u.do_enrichment = function(){};
  var q = u.tag_config_server.indexOf("?");
  if (q>0 && (q+1)==u.tag_config_server.length) {
    // utag.DB("DataCloud config error. Trailing ? in URL")
    u.tag_config_server = u.tag_config_server.replace("?","");
  }
  u.server_list = u.tag_config_server.split("|");
  u.enrichment_enabled = {};
  u.get_account_profile = function(s){
    var p = s.substring(s.indexOf(u.server_domain)).split("/");
    return p;
  }

  // Should only call this function when u.tag_config_sampling < 100
  u.is_in_sample_group = function(b) {
    var group = "100";

    // Automatically in sampling group if the sampling value is 100% or not defined at all
    if (u.tag_config_sampling === "" || u.tag_config_sampling === "100") {
      return true
    } 

    // Check or set cookie (cookie should survive across visits)
    if (b["cp.utag_main_dc_group"]) {
      group = b["cp.utag_main_dc_group"];
    } else {
      // group = random number 1..100
      group = Math.floor(Math.random() * 100) + 1;
      // set cookie
      utag.loader.SC("utag_main", {"dc_group": group});
    }

    // Return true if this visitor in sampling group
    if (parseInt(group) <= parseInt(u.tag_config_sampling)) {
      return true
    } else {
      return false
    }

  }

  u.get_performance_timing = function(b) {
    var t, timing;
    var data = {};

    function subtract(val1, val2) {
      var difference = 0;
      if ( val1 > val2 ) {
        difference = val1 - val2;
      }
      return difference;
    }

    if (typeof localStorage != "undefined" && JSON.parse && window.performance && window.performance.timing) {
      t = window.performance.timing;
      // Read existing local storage data and add to data layer
      timing = localStorage.getItem("tealium_timing");
      // Only get this info on the first event for this page
      if (timing !== null && timing !== "{}" && typeof b !== "undefined" && u.performance_timing_count === 0) {
        utag.ut.merge(b, utag.ut.flatten({timing : JSON.parse(timing)}), 1);
      }
    } else {
      return;
    }

    // Get current URL timing data into local storage.  Or setTimeout and do recursive call if data not there yet
    u.performance_timing_count++;
    for (var k in t) {
      // Some data might not be ready yet, wait and request again
      // Only try 20 times max
      if ((k.indexOf("dom") === 0 || k.indexOf("load") === 0) && t[k] === 0 && u.performance_timing_count < 20) {
        setTimeout(u.get_performance_timing, 1000);
      }
    }

    // Write current page performance data to local storage for retrieval on next page
    data["domain"] = location.hostname + "";
    data["pathname"] = location.pathname + "";
    data["query_string"] = ("" + location.search).substring(1);
    data["timestamp"] = (new Date()).getTime();
    data["dns"] = subtract(t.domainLookupEnd, t.domainLookupStart);
    data["connect"] = subtract(t.connectEnd, t.connectStart);
    data["response"] = subtract(t.responseEnd, t.responseStart);
    data["dom_loading_to_interactive"] = subtract(t.domInteractive, t.domLoading);
    data["dom_interactive_to_complete"] = subtract(t.domComplete, t.domInteractive);
    data["load"] = subtract(t.loadEventEnd, t.loadEventStart);
    data["time_to_first_byte"] = subtract(t.responseStart, t.connectEnd);
    data["front_end"] = subtract(t.loadEventStart, t.responseEnd);
    data["fetch_to_response"] = subtract(t.responseStart, t.fetchStart);
    data["fetch_to_complete"] = subtract(t.domComplete, t.fetchStart);
    data["fetch_to_interactive"] = subtract(t.domInteractive, t.fetchStart);

    try {
      localStorage.setItem("tealium_timing", JSON.stringify(data));
    } catch(e){utag.DB(e);}

  }

  u.map={};
  u.extend=[function(a,b){ try{ if(1){
u.enrichment_polling = 3;
u.enrichment_polling_delay = 3000;

var r = Math.random();
b['teal_random_dle'] = r;
window.teal_random_dle = r;
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['page_name']!='undefined'&&b['page_name'].toString().toLowerCase()=='Shopcart - View'.toLowerCase())||(b['page_type'].toString().toLowerCase()=='cart_modify'.toLowerCase()&&b['event_name'].toString().toLowerCase()=='delete_cart'.toLowerCase())){
// fallback for scope changes
var b = b || utag.data;

// get the cookie duration from the config object (if present)
var cookieDuration = utag.ext.tripolis_config.cookie_duration_days || "";

// only fire if the required function/objects are there
if (utag && utag.ext && utag.ext.tripolis_config && utag.ext.generateTripolisXML) {
  // generate the XML object
  var productXML = utag.ext.generateTripolisXML(utag.ext.tripolis_config);
  // stringify the up-to-date config object
  var configString = JSON.stringify(utag.ext.tripolis_config);
  // overwrite the cookie with the updated configString
  utag.ext.writeCookie("tripolis_config", configString, cookieDuration);
  // add the new info to the b object, to be sent via the Collect tag
  b.tripolis_cart_info_xml = productXML;
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['event_name']!='undefined'&&b['event_name'].toString().indexOf('add_cart')>-1)){
// fallback for scope changes
var b = b || utag.data;

// get the cookie duration from the config object (if present)
var cookieDuration = utag.ext.tripolis_config.cookie_duration_days || "";

// only fire if the required function/object are there
if (utag && utag.ext && utag.ext.tripolis_config && utag.ext.generateTripolisXML && utag.ext.updateTripolisObject) {
  // full config object for the newly added product
  var newProduct = utag.ext.tripolis_config;

  // get any previously basketed products and convert to object
  var prevProductString = utag.ext.readCookie("tripolis_config") || "{}",
      prevProduct = JSON.parse(prevProductString)
  ;

  // combine the previous and current information and stringify
  var updatedObject = utag.ext.updateTripolisObject(newProduct, prevProduct),
      updatedObjectString = JSON.stringify(updatedObject)
  ;

  // overwrite the cookie with the updated info, update the global config
  utag.ext.writeCookie("tripolis_config", updatedObjectString, cookieDuration);
  // update the global object and generate the updated xml
  utag.ext.tripolis_config = updatedObject;
  var productXML = utag.ext.generateTripolisXML(utag.ext.tripolis_config);
  // add the updated info to the b object to be sent via the Collect tag
  b.tripolis_cart_info_xml = productXML;
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Scope       : Tealium Collect
// Execution   : n/a
// Condition   : 'basicPageId' contains (ignore case) 'basket'
// Description : Split a target string into component parts of a defined length.
//
//               Will leave the original string untouched, and add the needed number of substrings
//               to the b object with the naming style [targetString] + "_part_" + [number].

// CONFIGURE the string length and string to be split
var targetLength = 1000;
var targetString = "tripolis_cart_info_xml"
// shouldn't need to change anything below this point

// fallback in case the scope changes or is misconfigured
var b = b || utag.data;

// split it up
if (typeof b != "undefined" && typeof b[targetString] == "string") {
  // calculate the correct number of loops/parts
  var loops = Math.ceil(b[targetString].length / targetLength);
  // leave the original string alone
  var string = b[targetString].slice(0);
  // initialize
  var stringPart = "";
  for (var i = 0 ; i < loops; i++) {
    stringPart = string.slice(0, targetLength);
    string = string.slice(stringPart.length);
    b[targetString + "_part_" + i] = stringPart;
  }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
//e.g. take the last two parts of GA1.2.36327153.1469022234
if (/^GA(\d+\.){3}\d+$/.test(b['cp._ga'])){
  var a = b['cp._ga'].split('.');
  b['ga_cid'] = a[2] + '.' + a[3];
}
else{
  b['ga_cid'] = b['cp._ga'];
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// trim the Adobe Visitor ID out of the cookie
// input: [CS]v1|2D0DEDF005317F29-4000010E8000022D[CE]
// output: 2D0DEDF005317F29-4000010E8000022D
var b = b || utag.data;
var adobe_cookie_value = b['cp.s_vi'];
// only proceed if the cookie is found
if (adobe_cookie_value) {
  var re = /\|([^[\[]*)/;
  b['adobe_id'] = adobe_cookie_value.match(re)[1];
}
} } catch(e){ utag.DB(e) }  }];

  u.send=function(a,b){
    var d,i;
    if(u.ev[a]||typeof u.ev["all"]!="undefined"){
      //Don't fire for tag bridge event "remote_api"
      if (a === "remote_api") {
        utag.DB("Remote API event suppressed.");
        return;
      }

      // Set data source
      if (u.data_source) {
        b.tealium_datasource = u.data_source;
      }

      u.make_enrichment_request = false;

      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

      // If not in our sampling group, then exit (do not fire tag)
      if (!u.is_in_sample_group(b)) {
        return false
      }
      u.get_performance_timing(b);

      for (i = 0; i < u.server_list.length; i++){
        if (u.enrichment_enabled[i] !== false){
          u.enrichment_enabled[u.server_list[i]] = true;
        }
      }

      // For multiple server locations, need unique vid values for each
      if (u.server_list.length > 1) {
        u.profile_specific_vid = 1;
      }
      u.data = utag.datacloud || {};

      u.data["loader.cfg"]={};
      for(d in utag.loader.GV(utag.loader.cfg)){
        if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
           utag.loader.cfg[d].executed = 1;
        }else{
           utag.loader.cfg[d].executed = 0;
        }
        u.data["loader.cfg"][d]=utag.loader.GV(utag.loader.cfg[d]);
      }

      //u.data.cfg=utag.cfg;
      u.data.data=b;
      /* Re-encode items in "qp." params */
      for(d in u.data.data) {
        if ((d+'').indexOf("qp.")==0) {
          u.data.data[d]=encodeURIComponent(u.data.data[d]);
        } else if((d+'').indexOf("va.")==0) {
          /* Remove visitor attributes */
          delete u.data.data[d];
        }
      }

      /* Visit Number and Event Count -- event count starts over with each visit */
      if (!b["cp.utag_main_dc_event"]) {
        b["cp.utag_main_dc_visit"] = (1 + (b["cp.utag_main_dc_visit"]?parseInt(b["cp.utag_main_dc_visit"]):0)) + '';
      }
      b["cp.utag_main_dc_event"] = (1 + (b["cp.utag_main_dc_event"]?parseInt(b["cp.utag_main_dc_event"]):0)) + '';
      utag.loader.SC("utag_main", {"dc_visit": b["cp.utag_main_dc_visit"], "dc_event": b["cp.utag_main_dc_event"] + ";exp-session"});

      /* Update global data layer for Visitor Attribute check */
      utag.data["cp.utag_main_dc_visit"] = b["cp.utag_main_dc_visit"];
      utag.data["cp.utag_main_dc_event"] = b["cp.utag_main_dc_event"];

      var dt = new Date();
      /* Send browser info */
      u.data.browser = {};
      try{
        u.data.browser["height"] = window.innerHeight || document.body.clientHeight;
        u.data.browser["width"] = window.innerWidth || document.body.clientWidth;
        u.data.browser["screen_height"] = screen.height;
        u.data.browser["screen_width"] = screen.width;
        u.data.browser["timezone_offset"] = dt.getTimezoneOffset();
      }catch(e){utag.DB(e);}

      u.data["event"]=a+'';
      u.data["post_time"]=dt.getTime();

      /* Audience Stream Data Layer Enrichment */
      if (u.data_enrichment == "frequent" || u.data_enrichment == "infrequent") {

        u.visit_num = b["cp.utag_main_dc_visit"];

        if (parseInt(u.visit_num) > 1 && b["cp.utag_main_dc_event"] == "1") {
          u.enrichment_polling = 2;
        }

        try {
          u.va_update = parseInt(localStorage.getItem("tealium_va_update") || 0);
        } catch(e){utag.DB(e);}

        u.visitor_id = u.visitor_id || b.tealium_visitor_id || b['cp.utag_main_v_id'];
        if((u.data_enrichment == "frequent" && !(u.visit_num == "1" && b["cp.utag_main_dc_event"] == "1")) ||
            (u.data_enrichment == "infrequent" && parseInt(u.visit_num) > 1 && parseInt(b["cp.utag_main_dc_event"]) <= 5 && u.visit_num != u.va_update)) {
          u.make_enrichment_request = true;
        } else if (b._corder) {
          u.make_enrichment_request = true;
          u.enrichment_polling = 3;
          u.enrichment_polling_delay = 4000;
        }

        u.visitor_service_request = function(t, server){
          var s = "https://" + u.server_prefix + "visitor-service" + (u.region?"-"+u.region:"").replace( /[^-A-Za-z0-9+_.]/g, "" ) + "." + u.server_domain;
          var p = u.get_account_profile(server);
          (function(p){
            // declare multiple functions with dynamic local storage key -- multiple enrichments in same domain
            var prefix = "tealium_va";
            var key = "_" + p[1] + "_" + p[2];

            utag.ut["writeva"+p[2]] = function(o){
              utag.DB("Visitor Attributes: " + prefix + key);
              utag.DB(o)
              var str = JSON.stringify(o);
              if (str!="{}" && str!=""){
                try {
                  localStorage.setItem('tealium_va_update', utag.data["cp.utag_main_dc_visit"]);
                  // for utag.js v4.38 or earlier
                  localStorage.setItem( prefix, str);
                  // dynamic location in localstorage (utag.js 4.39 or later)
                  localStorage.setItem( prefix + key, str);
                } catch(e){utag.DB(e);}

                if (typeof tealium_enrichment == "function") {
                  tealium_enrichment(o, prefix + key);
                }
              }
            }
          }(p.slice(0)))

          var vid = u.visitor_id;
          if( u.profile_specific_vid == 1 ){
            vid += p[2];
          }
          utag.ut.loader({id: "tealium_visitor_service_2"+p[2], src: s+"/"+p[1]+"/"+p[2]+"/"+vid.replace(/\?callback=.*/g, "")+"?callback=utag.ut%5B%22writeva"+p[2]+"%22%5D&rnd="+t});
        }

        u.do_enrichment = function(server, enrichment_polling, enrichment_polling_delay) {
          // utag.js 4.27 or later is required
          if(typeof utag.ut.loader!="undefined"){
            // additional attempts for visitor enrichment
            for(i=0;i<enrichment_polling;i++){
              setTimeout(function(){u.visitor_service_request((new Date).getTime(), server)}, i*enrichment_polling_delay+1);
            }
          }
        }
      }
      var json_string;
      var regExpReplace = new RegExp(u.visitor_id, "g");

      if (window.FormData) {
        // modern browsers
        function postData(server_index, enrichment_polling, enrichment_polling_delay) {

          if (server_index+1 > u.server_list.length){
            return;
          }
          var xhr = new XMLHttpRequest();
          var server = u.server_list[server_index];
          var formData = new FormData();
          xhr.addEventListener('readystatechange', function() {
            if( xhr.readyState === 3 ) {
              try {
                u.region = xhr.getResponseHeader("X-Region") || u.region || "";
              } catch(res_error) {
                utag.DB(res_error);
                u.region = u.region || "";
              }

              if (u.region)utag.loader.SC("utag_main", {"dc_region": u.region+ ";exp-session"});
              utag.DB("dc_region:"+u.region);
            } else if (xhr.readyState === 4) {
              // do secondary call for multiple server locations
              postData(server_index+1, enrichment_polling, enrichment_polling_delay);
              if (u.make_enrichment_request && u.enrichment_enabled[server])u.do_enrichment(server, enrichment_polling, enrichment_polling_delay);
            }
          });
          xhr.open('post', u.server_list[server_index], true);
          xhr.withCredentials = true;
          json_string = JSON.stringify(u.data);
          if (u.profile_specific_vid == 1) {
            json_string = json_string.replace(regExpReplace, u.visitor_id + u.get_account_profile(server)[2]);
          }
          formData.append("data", json_string);
          xhr.send(formData);
        }

        postData(0, u.enrichment_polling, u.enrichment_polling_delay);

      } else {
        // fallback (old browsers)
        for (i = 0; i < u.server_list.length; i++){
          (function(i, enrichment_polling, enrichment_polling_delay){
            var server = u.server_list[i];
            setTimeout( function(){
              json_string = JSON.stringify(u.data);
              if ( u.profile_specific_vid == 1 ) {
                json_string = json_string.replace(regExpReplace, u.visitor_id + u.get_account_profile(server)[2]);
              }
              var img = new Image();
              img.src = server +'?data='+encodeURIComponent(json_string);
              if ( u.make_enrichment_request && u.enrichment_enabled[server] )u.do_enrichment(server, enrichment_polling, enrichment_polling_delay);
            }, i*700 );
          }(i, u.enrichment_polling, u.enrichment_polling_delay))
        }
      }
    }
  }
  try{utag.o[loader].loader.LOAD(id);}catch(e){utag.loader.LOAD(id);}
})('2','rakuten.main');
}catch(e){utag.DB(e);}
//end tealium universal tag
