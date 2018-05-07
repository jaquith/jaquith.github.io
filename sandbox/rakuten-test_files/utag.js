//tealium universal tag - utag.loader ut4.45.201805040754, Copyright 2018 Tealium.com Inc. All Rights Reserved. 

var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_rakuten_main=(\/\/tags\.tiqcdn\.com\/utag\/rakuten\/[^\S;]*)")){if(RegExp.$1.indexOf("/prod/") === -1) {var s = RegExp.$1;while(s.indexOf("%") != -1) {s = decodeURIComponent(s);}s = s.replace(/\.\./g,"");ul(s);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/rakuten/main/prod/';}}})();}catch(e){};try{ try{
if (typeof utag_data !== "undefined" && typeof utag_data.product_url !== "undefined") {
  window.utag_old = {};
  utag_old.product_url = utag_data.product_url;
}

/****************************************************************************  
 *  Version 1.3 - 20150825
 *
 *  Please read ALL instructions before using this so you know exactly what
 *  you are doing and how to properly use this code!
 ***************************************************************************/

try {
    var utag_data = utag_data || "";
    var tealium = tealium || {};
    tealium.com = tealium.com || {};
    tealium.com.tealium_w3c = {};
    tealium.com.tealium_w3c.udo = {};

    // change the "digitalData" to the object you wish to convert. This can
    // include any global nested object with any name
    var objectToConvert = dataLayer;

    /*
     * Change these mappings to convert items in the raw converted layer
     * to readable data variables. The items on the left will be a "contains"
     * where the matched key contains that value. An optional flag (mentioned
     * later) can be enabled to enforce a strict, exact match.  The items on
     * the right are what they will be changed to.
     *
     * For example, if you have 2 keys named "my-current-data_source" and
     * "some-other-data_source" which should both be put into the variable
     * called "sample_source", the below item might look like
     *   ["data_source", "sample_source"]
     * This method is the "contains" type of flag that may be necessary as
     * the digitalData spec may have the same information nested under
     * different objects depending on the page you are on. In the case where
     * the match may have commonly named keys, but contains different
     * information, you'll need to explicitly write the whole name of the 
     * key so data doesn't get overwritten. You can also specify a flag on
     * the mapping function call at the bottom of the script to enforce a
     * strict match.
     *
     * IMPORTANT NOTE:
     * To see the object before it is converted to find out available keys,
     * comment out the mentioned line at the bottom of this script. Then, 
     * enter the following into the console to see the output:
     *   tealium.com.tealium_w3c.udo
     *
     * IMPORTANT NOTE #2:
     * These are order specific and will run from top to bottom. Once a key
     * is matched, it is removed from the temporary storage as to not be
     * looked at again. So, if I want to do a match for "shipping", but my
     * original object had both "shipping" and "shippingMethod", my items
     * below would prefer the longer "shippingMethod":
     *   ["shippingMethod", "order_shipping_type"],
     *   ["shipping", "order_shipping"]
     *
     * IMPORTANT NOTE #3:
     * This converter will NOT work for data elements that are nested arrays
     * (e.g. [['something'],['something else']]). If you have nested arrays 
     * in your data layer that need to stay intact for tracking, you can 
     * directly reference them via a js_page data element 
     * (e.g. digitalData.page.pageInfo.myNestedArray).
     */
    tealium.com.mapping_keys = [
        ["product_id", "product_id"],
        ["product_sku", "product_sku"],
        ["product_name", "product_name"],
        ["primary_category", "product_category"],
        ["sub_category1", "product_subcategory"],
        ["price-total_price", "product_unit_price"],
        ["quantity", "product_quantity"],
        ["transaction_id", "order_id"],
        ["cart_total", "order_total"],
        ["base_price", "order_subtotal"],
        ["order_level_promo_total", "order_discount"],
        ["total-shipping", "order_shipping"],
        ["currency", "order_currency"],
        ["profileinfo-profile_id", "customer_id"],
        ["profileinfo-user_name", "customer_username"],
        ["page_type", "page_type"],
        ["page_name", "page_name"],
        ["unit_price", "product_unit_price"],
        ["product_discount", "product_discount"],
        ["", "product_brand"],
        ["", "product_list_price"],
        ["", "order_payment_type"],
        ["", "order_tax"],
        ["", "order_coupon_code"],
        ["", "order_coupon_discount"],
        ["", "order_store"],
        ["", "order_type"],
        ["", "customer_city"],
        ["", "customer_state"],
        ["", "customer_zip"],
        ["", "customer_country"],
        ["", "customer_email"],
        ["", "customer_type"],
        ["", "page_category"],
        ["", "page_subcategory"],
        ["", "search_results"],
        ["", "search_term"]
    ];

    /****************************************** DO NOT ALTER THIS SECTION ********************************************/

    //util: define isArray prototype if doesn't exist
    if(!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    tealium.com.extend = function(){
        /*
         * utility function
         * This function merges objects into the first given object.
         * usage: tealium.com.extend({},obj1,[obj2,...])
         * @return first object given
         */
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

    tealium.com.cleanArrayOfObjects = function(invar) {
        /*
         * utility function
         * This function takes an input and merges it into a single
         * object. This is useful for cases like the Google Tag Manager
         * dataLayer object that can have an array ob multiple objects.
         * @param invar: variable to convert
         * @return the converted variable
         */
        var newObj = {};
        if(Array.isArray(invar)) {
            for(var i=0;i<invar.length;i++) {
                if(typeof invar[i] == "object")
                    tealium.com.extend(newObj,invar[i])
                else
                    newObj["key"+i] = invar[i];
            }
            return newObj;
        }
        return invar;
    }

    tealium.com.convert_mapping_keys = function (obj, strictMatch) {
        /*
         * This function takes an object and changes matching
         * key names found in the tealium.com.mapping_keys object
         * @param obj: object to update all keys in
         * @param strictMatch: an optional boolean flag to say if
         *     this should be an "exact match" vs "contains" lookup
         */
         strictMatch = strictMatch || false;

        for (var idx in obj) {
            var val = obj[idx];
            var temp = "";
            if (Array.isArray(val)) temp = obj[idx].slice(0);
            else if (typeof val == "object") {
                temp = {};
                for (k in val) temp[k] = val[k];
            }
            else temp = obj[idx];
            delete obj[idx];

            var newIdx = false;
            for (var key in tealium.com.mapping_keys) {
                var currentMapping = tealium.com.mapping_keys[key];
                if(!currentMapping[0]) continue;
                if (   (strictMatch === true && idx === currentMapping[0])
                    || (strictMatch === false && idx.indexOf(currentMapping[0]) > -1)) {
                    newIdx = currentMapping[1];
                    break;
                }
            }
            if (!newIdx) newIdx = idx;
            obj[newIdx] = temp;
        }
    };

    function varChange(obj) {
        /*
         * This function converts camelCase items to all lowercase
         * like so: camel_case. This keeps things on a standardized
         * level.
         * @param obj: object to update all keys in
         */

        for (var idx in obj) {
            var val = obj[idx];
            var temp = "";
            if (Array.isArray(val)) temp = obj[idx].slice(0);
            else if (typeof val == "object") {
                temp = {};
                for (k in val)
                    temp[k] = val[k];
            }
            else temp = obj[idx];
            delete obj[idx];
            var newIdx = idx.replace(/([a-z][A-Z])/g, function(a) {
                return a[0] + '_' + a[1];
            }).toLowerCase();
            obj[newIdx] = temp;
        }
    }

    tealium.com.convert_data_layer = function (data) {
        /*
         * This is the meat of converting the data layer. It houses
         * several different functions for use in converting a given
         * data layer object.
         * @param data: the original object that we want to convert
         */

        var delim = "_";
        var result = {};

        function recurse(cur, prop) {
            /*
             * This function will completely flatten a nested object
             * which can then be manipulated in a reverse manner. The
             * result will go into the above "result" object.
             * @param cur: current level object we are looking at
             * @param prop: current object element property
             */
            if (Object(cur) !== cur) result[prop] = cur;
            else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop + "[" + i + "]");
                if (l == 0) result[prop] = [];
            }
            else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + delim + p : p);
                }
                if (isEmpty && prop) result[prop] = {};
            }
        }

        function findLikeItems(arr, obj) {
            /*
             * This function will take a given element name and loop through
             * the given object. If there are any like array items, this will
             * combine them into a single array, then remove the old ones from
             * the original object.
             * @param arr: an array with details about the current property:
             *      arr[0]: the property prefix before the array identifier "["
             *      arr[1]: the full property name
             *      arr[2]: the value assigned to this property
             * @param obj: the object to loop through and find like properties
             */
            var newObj = {};
            var currFull = arr[1];                                    //full variable name (key)
            var currFront = currFull.slice(0, currFull.indexOf("[")); //prefix before array identifier
            var val = arr[2];                                         //value of key,val pair
            var currIdx = 0;
            for (var r in obj) {
                if (r.indexOf(currFront) == 0) {
                    var currBack = r.split(']' + delim)[1];
                    newObj[currBack] = newObj[currBack] || [];
                    newObj[currBack].push(obj[r]);
                    delete obj[r];
                }
            }
            return newObj;
        }

        //checks each item in the given object
        function checkItem(obj) {
            /*
             * This function will check to see if a given property should
             * be grouped by arrays. It will either run the findLikeItems
             * function or will directly copy the property to our new
             * output object.
             * @param obj: the object we are looking to check for arrays
             * @output newResult: the new object that is grouped as needed
             */

            var checkAgain = false;
            var newResult = {};
            for (var i in obj) {
                var workingSet = [];
                var terms = i.split(delim);
                var hasArr = false;
                //look for an array identifier
                if (i.indexOf('[') > -1) {
                    hasArr = true;
                    checkAgain = true;
                }
                //not an array item, just put into our new object
                if (!hasArr) newResult[i] = obj[i];
                else {
                    //it was an array, we'll handle it by going backwards (if nested arr)
                    var lastArrIdx = i.lastIndexOf('[');
                    workingSet = [ i.substr(0, lastArrIdx + 2), i, obj[i] ];
                    var newObj = findLikeItems(workingSet, obj);
                    for (var n in newObj) newResult[n] = newObj[n];
                }
            }
            //an array was found, recheck the obj in case of nested arrays
            if (checkAgain) checkItem(newResult); //objects pass by pointer, no need to assign to a variable
            return newResult;
        }

        recurse(data, "");          //flatten the object
        varChange(result);          //standardize the variables
        return checkItem(result);   //return the converted object with grouped arrays
    }
    //if the initial variable is an array (e.g. GTM dataLayer), then convert to be an object
    objectToConvert = tealium.com.cleanArrayOfObjects(objectToConvert);
    //convert the object to be our flattened object
    tealium.com.tealium_w3c.udo = tealium.com.convert_data_layer(objectToConvert);

    /**************************************** END OF DO NOT ALTER SECTION ******************************************/


    //Comment the following line to discover raw keys to use for your own mappings.
    //You may view the raw data to be mapped by running this script (after commenting
    //out below) and then typing tealium.com.tealium_w3c.udo into the console. Once 
    //you have your raw variables, you can enable this to perform the mappings based
    //on the mapping keys at the start of this script.
    //tealium.com.convert_mapping_keys(tealium.com.tealium_w3c.udo);

    //Comment this following line (if statement) if you'd like to use the converted
    //result even if utag_data already exists on the page. Typically, this extension
    //is used when utag_data does not exist on the page, so modifying below is needed
    //if it is defined on the page already.
    //if (!utag_data)
    utag_data = tealium.com.tealium_w3c.udo;

} catch (e) {
    utag.DB("Error in converting data layer: ", e);
}
} catch(e){ utag.DB(e) }  }catch(e){};
if(!utag_condload){try{utag_trackingOptOut=function(){document.cookie='utag_optout=1;path=/;domain='+utag.cfg.domain+';expires=expires=Thu, 31 Dec 2099 00:00:00 GMT;'};utag_trackingOptIn=function(){document.cookie='utag_optout=0;path=/;domain='+utag.cfg.domain+';expires=expires=Thu, 31 Dec 2099 00:00:00 GMT;'};if(document.cookie.indexOf('utag_optout=1')>-1){if(typeof utag_cfg_ovrd=='undefined')utag_cfg_ovrd={};utag_cfg_ovrd['noload']=1}}catch(e){}};
if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"rakuten.main",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    db_log : [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q : [], 
      sendq :{"pending":0},
      run_ready_q : function(){
        for(var i=0;i<utag.loader.ready_q.length;i++){
          utag.DB("READY_Q:"+i);
          try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
        }
      },
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          // TBD: utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR(utag.data);
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?utag.cfg.template+a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          utag.DB("Attach sync: "+a.src);
          a.uid=a.id;
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_rakuten.main_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(a, b, c, d, f){
        try {
          if (typeof utag.data['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0
                  }
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
      },
      RDdom: function(o){
        var d = document || {}, l = location || {};
        o["dom.referrer"] = d.referrer;
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] = window.innerHeight || (d.documentElement?d.documentElement.clientHeight:960);
        o["dom.viewport_width"] = window.innerWidth || (d.documentElement?d.documentElement.clientWidth:960);
      },
      RDcp: function(o, b, c, d){
        b = utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
        //o["_t_visitor_id"]=o["cp.utag_main_v_id"];
        //o["_t_session_id"]=o["cp.utag_main_ses_id"];
      },
      RDqp: function(o, a, b, c){
        a = location.search + (location.hash+'').replace("#","&");
        if(utag.cfg.lowerqp){a=a.toLowerCase()};
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if(c.length>1){
              o["qp." + c[0]] = utag.ut.decode(c[1])
            }
          }
        }
      },
      RDmeta: function(o, a, b, h){
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try{
            h = a[b].name || a[b].getAttribute("property") || ""; 
          }catch(e){h="";utag.DB(e)};
          if (utag.cfg.lowermeta){h=h.toLowerCase()};
          if (h != ""){o["meta." + h] = a[b].content}
        }
      },
      RDva: function(o){
        // Read visitor attributes in local storage
        var readAttr = function(o, l ){
          var a = "", b;
          a = localStorage.getItem(l);
          if(!a || a=="{}")return;
          b = utag.ut.flatten({va : JSON.parse(a)});
          utag.ut.merge(o,b,1);
        }
        try{
          readAttr(o, "tealium_va" );
          readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"] );
        }catch(e){ utag.DB(e) }
      },
      RDut: function(o, a){
        // Add built-in data types to the data layer for use in mappings, extensions and RDva function.
        var t = {};
        var d = new Date();
        var m = ( utag.ut.typeOf(d.toISOString) == "function" );
        o["ut.domain"] = utag.cfg.domain;
        o["ut.version"] = utag.cfg.v;
        // i.e. "view" or "link"
        t["tealium_event"] = o["ut.event"] = a || "view";
        t["tealium_visitor_id"] = o["ut.visitor_id"]=o["cp.utag_main_v_id"];
        t["tealium_session_id"] = o["ut.session_id"]=o["cp.utag_main_ses_id"];
        try{
          t["tealium_datasource"] = utag.cfg.datasource;
          t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
          t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
          t["tealium_environment"] = o["ut.env"] = utag.cfg.path.split("/")[6];
        }catch(e){ utag.DB(e) }

        t["tealium_random"] = Math.random().toFixed(16).substring(2);
        t["tealium_library_name"] = "ut"+"ag.js";
        t["tealium_library_version"] = ( utag.cfg.template + "0" ).substring(2);
        t["tealium_timestamp_epoch"] = Math.floor( d.getTime() / 1000 );
        t["tealium_timestamp_utc"] = ( m ? d.toISOString() : "");
        // Adjust date to local time
        d.setHours( d.getHours() - ( d.getTimezoneOffset() / 60 ) );
        t["tealium_timestamp_local"] = ( m ? d.toISOString().replace( "Z","" ) : "" );

        // Any existing data elements with "tealium_" will not be overwritten
        utag.ut.merge( o, t, 0 );
      },
      RDses: function( o, a, c ) {
        a = (new Date()).getTime();
        c = ( a + parseInt( utag.cfg.session_timeout ) ) + "";

        // cp.utag_main_ses_id will not be in the data layer when it has expired or this is first page view of all time
	if ( !o["cp.utag_main_ses_id"] ) {
          o["cp.utag_main_ses_id"] = a + "";
          o["cp.utag_main__ss"] = "1";
          o["cp.utag_main__sn"] = ( 1 + parseInt( o["cp.utag_main__sn"] || 0 ) ) + "";
        } else {
          o["cp.utag_main__ss"] = "0";
        }
        
        o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
        o["cp.utag_main__st"] = c;

        utag.loader.SC( "utag_main", { "_sn": ( o["cp.utag_main__sn"] || 1 ), "_ss": o["cp.utag_main__ss"], "_st": c, "ses_id": ( o["cp.utag_main_ses_id"] || a ) + ";exp-session", "_pn": o["cp.utag_main__pn"] + ";exp-session" } );
      },
      RDpv: function( o ) {
        if ( typeof utag.pagevars == "function" ) {
          utag.DB("Read page variables");
          utag.pagevars(o);
        }
      },
      RD: function( o, a ) {
        utag.DB("utag.loader.RD");
        utag.DB(o);

        utag.loader.RDcp(o);

        if ( !utag.loader.rd_flag ) {
          utag.loader.rd_flag = 1;
          o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
          o["cp.utag_main__pn"] = ( 1 + parseInt( o["cp.utag_main__pn"] || 0 ) ) + "";
          // the _st value is not-yet-set for first page view so we'll need wait to write in _pn value (which is exp-session)
          // The SC function expires (removes) cookie values that expired with the session
          utag.loader.SC( "utag_main", { "v_id": o["cp.utag_main_v_id"] } );
          utag.loader.RDses(o);
        }

        // first utag.track call for noview should not clear session start (_ss) value
        if(a && !utag.cfg.noview)utag.loader.RDses(o);
        utag.loader.RDqp(o);
        utag.loader.RDmeta(o);
        utag.loader.RDdom(o);
        utag.loader.RDut(o, a || "view");
        utag.loader.RDpv(o);
        utag.loader.RDva(o);
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = (new Date()).getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck!="undefined"){
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = cv.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try{
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                }catch(er){utag.DB(er)};
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (j[f] instanceof Array) {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)){
                      k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                      if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                    j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl['_all_']) {
              o[ck] = e
            }
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime()+(365*24*60*60*1000));
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push((g + ":").replace(/[\,\$\;\?]/g,"") + encodeURIComponent(d[g]))
          }
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        //utag.DB('utag.loader.LOAD:' + a);
        if(!utag.loader.cfg){
           return
        }
	if(this.ol==0){
          if(utag.loader.cfg[a].block && utag.loader.cfg[a].cbf){
            this.f[a] = 1;
	    delete utag.loader.bq[a];
          }
	  for(b in utag.loader.GV(utag.loader.bq)){
            if(utag.loader.cfg[a].load==4 && utag.loader.cfg[a].wait==0){
              utag.loader.bk[a]=1;
              utag.DB("blocked: "+ a);
            }
	    utag.DB("blocking: " + b);
	    return;
	  }
	  utag.loader.INIT();
	  return;
	}
        utag.DB('utag.loader.LOAD:' + a);

        if (this.f[a] == 0) {
          this.f[a] = 1;
      	
	  if(utag.cfg.noview!=true){
	    if(utag.loader.cfg[a].send){
              utag.DB("SENDING: "+a);
              try{
                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                  utag.DB("utag.loader.LOAD:sendq: "+a);
                  while( d = utag.loader.sendq[a].shift() ) {
                    utag.DB(d);
                    utag.sender[a].send(d.event, utag.handler.C(d.data));
                    utag.loader.sendq.pending--;
                  }
                } else {
                  utag.sender[a].send('view',utag.handler.C(utag.data));
                }
		utag.rpt['s_' + a] = 0;
	      } catch (e) {
                utag.DB(e);
	        utag.rpt['s_' + a] = 1;
	      }
	    }
	  }
	  if(utag.loader.rf==0)return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return
          }
	  utag.loader.END();
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if(!utag.data){
            try {
              utag.cl = {'_all_': 1};
              utag.loader.initdata();    
              utag.loader.RD(utag.data);
            }catch(e){ utag.DB(e) };
          }
          if ( (document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading" ) setTimeout(c, 1);
          else {
            utag.loader.ready_q.push(c);
            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      },
      END: function(b, c, d, e, v, w){
        if(this.ended){return};
        this.ended=1;
	utag.DB("loader.END");
        b = utag.data;
        // add the default values for future utag.link/view calls
	if(utag.handler.base && utag.handler.base!='*'){
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
          }
        }else if (utag.handler.base=='*'){
           utag.ut.merge(utag.handler.df,b,1);
        }

        utag.rpt['r_0']="t";
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }

        utag.rpt.ts['s'] = new Date();
	

        v = utag.cfg.path;
        // both .tiqcdn.com and .tiqcdn.cn supported
        w = v.indexOf(".tiqcdn.");
        if(w>0 && b["cp.utag_main__ss"]==1 && !utag.cfg.no_session_count)utag.ut.loader({src:v.substring(0,v.indexOf("/ut"+"ag/")+6)+"tiqapp/ut"+"ag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
        
        if(utag.cfg.noview!=true)utag.handler.RE('view',b,"end");
	utag.handler.INIT();
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        var t;
        if(utag.ut.typeOf(a) == "object"){
          t=utag.handler.C(a)
        }else{
          t=a
        }
        utag.db_log.push(t);
        try{if(!utag.cfg.noconsole)console.log(t)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]))
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
      }
    },
    view: function(a,c,d) {
      return this.track({event:'view', data:a, cfg:{cb:c,uids:d}})
    },
    link: function(a,c,d) {
      return this.track({event:'link', data:a, cfg:{cb:c,uids:d}})
    },
    track: function(a,b,c,d) {
      if (typeof a == "string") a = { event: a, data: b, cfg: {cb: c} };

      for(d in utag.loader.GV(utag.o)){
        try{
          utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg)
        }catch(e){utag.DB(e)};
      }
      if(a.cfg && a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};
      return true
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        utag.DB('utag.handler.INIT');
        if(utag.initcatch){
          utag.initcatch=0;
          return
        }
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          utag.DB("Loader queue");
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b, c.c)
          }
        }
        //##UTABSOLUTELAST##
      },
      test: function() {
        return 1
      },
      // reset and run load rules
      LR: function(b){
        utag.DB("Load Rules");
        for(var d in utag.loader.GV(utag.cond)){
          utag.cond[d]=false;
        }
        utag.DB(b);
        utag.loader.loadrules(b);
        utag.DB(utag.cond);
        utag.loader.initcfg();
        // use the OPTOUTMULTI cookie value to override load rules
        utag.loader.OU();
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }
      },
      // The third param "c" is a string that defines the location i.e. "blr" == before load rules
      RE:function(a,b,c,d,e,f,g){
        if(c!="alr" && !this.cfg_extend){
          return 0; 
        }
        utag.DB("RE: "+c);
        if(c=="alr")utag.DB("All Tags EXTENSIONS");
        utag.DB(b);
        if(typeof this.extend != "undefined"){
          g=0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              /* Extension Attributes */
              e=0;
              if(typeof this.cfg_extend!="undefined"){
                f=this.cfg_extend[d];
                if(typeof f.count == "undefined")f.count=0;
                if(f[a]==0 || (f.once==1 && f.count>0) || f[c]==0){
                  e=1
                }else{
                  if(f[c]==1){g=1};
                  f.count++
                }
              }
              if(e!=1){
                this.extend[d](a, b);
                utag.rpt['ex_' + d] = 0
              }
            } catch (er) {
              utag.DB(er);
              utag.rpt['ex_' + d] = 1;
	      utag.ut.error({e:er.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});
            }
          }
          utag.DB(b);
          return g;
        }
      },
      trigger: function(a, b, c, d, e, f) {
        utag.DB('trigger:'+a+(c && c.uids?":"+c.uids.join(","):""));
        b = b || {};
        utag.DB(b);

        if (!this.iflag) {
          utag.DB("trigger:called before tags loaded");
          for (d in utag.loader.f) {
            if (!(utag.loader.f[d] === 1)) utag.DB('Tag '+d+' did not LOAD')
          }
          utag.loader.q.push({
            a: a,
            b: utag.handler.C(b),
            c: c
          });
          return;
        }

        // update all values for AJAX pages
        utag.ut.merge(b,this.df,0);
        utag.loader.RD( b, a );

        // clearing noview flag after the RD function call
        utag.cfg.noview = false;

        function sendTag(a, b, d){
          try {
            if(typeof utag.sender[d]!="undefined"){
              utag.DB("SENDING: "+d);
              utag.sender[d].send(a, utag.handler.C(b));
	      utag.rpt['s_' + d] = 0;
            }else if (utag.loader.cfg[d].load!=2){
              // utag.link calls can load in new tags
              utag.loader.sendq[d] = utag.loader.sendq[d] || [];
              utag.loader.sendq[d].push({"event":a, "data":utag.handler.C(b)});
              utag.loader.sendq.pending++;
              utag.loader.AS({id : d, load : 1}); 
            }
          }catch (e) {utag.DB(e)}
        }
        
        // utag.track( { event : "view", data: {myvar : "myval" }, cfg: { uids : [1,2,10] } } );
        if(c && c.uids){
          this.RE(a,b,"alr");
          for(f=0;f<c.uids.length;f++){
            d=c.uids[f];
            // bypass load rules
            sendTag(a, b, d);
          }
        }else if(utag.cfg.load_rules_ajax){
          this.RE(a,b,"blr");
          // process load rules based on current data layer
          this.LR(b);
          this.RE(a,b,"alr");
          
          for(f = 0; f < utag.loader.cfgsort.length; f++){
            d = utag.loader.cfgsort[f];
            if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
              sendTag(a, b, d);
            }
          }
        }else{
          // legacy behavior
          this.RE(a,b,"alr");
          for (d in utag.loader.GV(utag.sender)) {
            sendTag(a, b, d);
          }
        }
        this.RE(a,b,"end");
      },
      // "sort-of" copy
      C: function(a, b, c) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if(a[c] instanceof Array){
            b[c] = a[c].slice(0)
          }else{
            // objects are still references to the original (not copies)
            b[c] = a[c]
          }
        }
        return b
      }
    },
    ut:{
      pad: function(a,b,c,d){
        a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return ""+d+a
      },
      vi: function(t,a,b){
        if(!utag.v_id){
          a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};utag.v_id=a;
        }
        return utag.v_id
      },
      hasOwn: function(o, a) {
        return o != null && Object.prototype.hasOwnProperty.call(o, a)
      },
      isEmptyObject: function(o, a) {
	for (a in o) {
          if (utag.ut.hasOwn(o,a))return false
        }
        return true
      },
      isEmpty: function(o) {
        var t = utag.ut.typeOf(o);
        if ( t == "number" ){
          return isNaN(o)
        }else if ( t == "boolean" ){
          return false
        }else if ( t == "string" ){
          return o.length === 0
        }else return utag.ut.isEmptyObject(o)
      },
      typeOf: function(e) {
        return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      },
      flatten: function(o){
        // stop when arriving at a string, array, boolean, number (float or integer)
        var a = {}; 
        function r(c, p) {
          if (Object(c) !== c || c instanceof Array) {
            a[p] = c;
          } else {
            if(utag.ut.isEmptyObject(c)){
              //a[p] = {};
            }else{
              for (var d in c) {
                r(c[d], p ? p+"."+d : d);
              }
            }
          }
        }
        r(o, "");

        return a;
      },
      merge: function(a, b, c, d) {
        if(c){
          for(d in utag.loader.GV(b)){
            a[d] = b[d]
          }
        }else{
          for(d in utag.loader.GV(b)){
            if(typeof a[d]=="undefined")a[d] = b[d]
          }
        }
      },
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = unescape(a)};
        return b
      },
      encode: function(a, b) {
        b = "";
        try{b = encodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = escape(a)};
        return b
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
      },
      loader: function(o, a, b, c, l, m) {
        utag.DB(o);
        a=document;
        if (o.type=="iframe") {
          // if an iframe of same id already exists, remove and add again (to keep DOM clean and avoid impacting browser history)
          m = a.getElementById( o.id );
          if ( m && m.tagName == "IFRAME" ) {
            m.parentNode.removeChild(m);
          }
          b = a.createElement("iframe");
          o.attrs = o.attrs || {};
          utag.ut.merge( o.attrs, { "height" : "1", "width" : "1", "style" : "display:none" } , 0 );
        }else if (o.type=="img"){
          utag.DB("Attach img: "+o.src);
          b = new Image();
        }else{
          b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";
        }
        if(o.id){b.id=o.id};
        for( l in utag.loader.GV(o.attrs) ){
          b.setAttribute( l, o.attrs[l] )
        }
        b.setAttribute("src", o.src);
        if (typeof o.cb=="function") {
          if(b.addEventListener) {
            b.addEventListener("load",function(){o.cb()},false);
          }else {
            // old IE support
            b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};
          }
        }
        if(typeof o.error=="function"){
          utag.loader.EV(b, "error", o.error);
        }
        if ( o.type != "img" ) {
          l = o.loc || "head";
          c = a.getElementsByTagName(l)[0];
          if (c) {
            utag.DB("Attach to "+l+": "+o.src);
            if (l == "script") {
              c.parentNode.insertBefore(b, c);
            } else {
              c.appendChild(b)
            }
          }
        }
      }
    }
  };
  utag.o['rakuten.main']=utag;
  utag.cfg = {
    template : "ut4.45.",
    // Enable load rules ajax feature by default
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    noconsole: false,
    //noview: ##UTNOVIEW##,
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    domain: utag.loader.lh(),
    datasource: "##UTDATASOURCE##".replace("##"+"UTDATASOURCE##",""),
    path: "//tags.tiqcdn.com/utag/rakuten/main/prod/",
    utid: "rakuten/main/201805040754"
  };
  utag.cfg.v = utag.cfg.template + "201805040754";
  utag.cond={10:0,11:0,3:0,4:0,5:0,9:0};
utag.pagevars=function(ud){ud = ud || utag.data;try{ud['js_page.utag_old.product_url']=utag_old.product_url}catch(e){utag.DB(e)};};
utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function(_pd,_pc) {var d = _pd || utag.data; var c = _pc || utag.cond;for (var l in utag.loader.GV(c)) {switch(l){
case '10':try{c[10]|=(typeof d['va.properties.6667']=='undefined')}catch(e){utag.DB(e)}; break;
case '11':try{c[11]|=(d['cp.utag_main__ss']=='1')}catch(e){utag.DB(e)}; break;
case '3':try{c[3]|=(typeof d['criteo_id']=='undefined')||(typeof d['criteo_id']!='undefined'&&d['criteo_id']=='')}catch(e){utag.DB(e)}; break;
case '4':try{c[4]|=(d['dom.domain'].toString().toLowerCase()=='www.rakuten.de'.toLowerCase()&&/^\/produkt\//i.test(d['dom.pathname']))}catch(e){utag.DB(e)}; break;
case '5':try{c[5]|=(d['dom.domain'].toString().indexOf('secure.rakuten.de')>-1&&d['dom.pathname']=='/thanks/')}catch(e){utag.DB(e)}; break;
case '9':try{c[9]|=(typeof d['va.properties.6754']=='undefined')}catch(e){utag.DB(e)}; break;}}};utag.pre=function() {    utag.loader.initdata();utag.pagevars();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();    };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){ try{ if(1){b['product_url']=b['js_page.utag_old.product_url'];b['product_category']=b['rakuten_category_id'];b['product_brand']=b['product_brand_name'];b['original_price']=b['product_old_price'];b['cart_total_items']=b['order_total_quantity'];b['page_name']=b['page_info_page_type'];b['order_id']=b['order_order_id'];b['order_total']=b['order_order_total_amount']} } catch(e){ utag.DB(e) }  },
function(a,b,c,d){c=['page_info_page_type'];for(d=0;d<c.length;d++){try{b[c[d]] = (b[c[d]] instanceof Array || b[c[d]] instanceof Object) ? b[c[d]] : b[c[d]].toString().toLowerCase()}catch(e){}}},
function(a,b){ try{ if(1){try{b['order_final_amount']=b.order_final_amount.replace(",",".")}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['original_price']=dataLayer[0].originalPrice}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// fallback in case scope changes
var b = b || utag.data;

// always fire before other TRIPOLIS extensions
var config = {
  "cookie_duration_days" : "30",
  // used for product deduplication + combination
  "product_key" : "product_identifier",
  "product_quantity" : "product_quantity",
  // product-level config (arrays)
  "product" : {
    "product_identifier" : b.product_id || [],
    "product_name" : b.product_name || [],
    "product_price" : b.product_price || [],
    "product_quantity" : b.product_quantity || [],
    "product_image_url" : b.product_image_url || [],
    "product_url" : b.product_url || [],
    "product_shop_id" : b.shop_id || [],
    "product_category" : b.product_category || [],
    "product_brand" : b.product_brand || [],
    "original_price" : b.original_price || []
  },
  // non-product vars, will be OVERWRITTEN
  "to_overwrite" : {
    "cart_product_count" : b.cart_total_items || 0
  },
  // non-product vars, will be INCREMENTED
  "to_increment" : {
    "cart_sku_count" : b.product_id ? b.product_id.length : 0
  }
};

// make sure any '_count' props are numbers
for (prop in config) {
  if (/_count$/.test(prop)){
    config[prop] = Number(config[prop]);
  }
}

// make this config globally available
var utag = window.utag || {};
utag.ext = utag.ext || {};
utag.ext.tripolis_config = config;

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// make this function globally available
var utag = window.utag || {};
utag.ext = utag.ext || {};

utag.ext.generateTripolisXML = function (config) {
  // requires a config object to run
  if (typeof config != "object") return false;
  var b = b || utag.data;

  // initialize vars
  var i
      outputXML = ""
  ;

  // generate the Tripolis-specific XML
  var formatAndAddXML = function (key, value) {
    // encode any XML characters and remove JS escaping
    var thisXML = "";
    thisXML += "<property>"
    thisXML +=   "<key>" + utag.ext.encodeXML(key) + "</key>";
    thisXML +=   "<value>" + utag.ext.encodeXML(value) + "</value>"
    thisXML += "</property>"
    outputXML += thisXML;
    return true;
  };

  var deduplicateProducts = function (config) {
    // get the config
    var productKey = config.product_key,
        quantityField = config.product_quantity,
        productValues = config.product,
        keyArr = productValues[productKey]
    ;

    // initialization
    var i,
        previousQuantity,
        thisQuantity,
        uniqueProducts = {}
    ;

    // create an object with unique products, combine the quantity
    for (i = 0; i < keyArr.length; i++) {
      // add if it hasn't been defined
      if (typeof uniqueProducts[keyArr[i]] == "undefined") {
        uniqueProducts[keyArr[i]] = {};
        for (prop in productValues) {
          uniqueProducts[keyArr[i]][prop] = productValues[prop][i];
        }
      } else {
        // increment the existing 'quantity' for that product
        previousQuantity = Number(uniqueProducts[keyArr[i]][quantityField]);
        thisQuantity = Number(productValues[quantityField][i]);
        added = (previousQuantity + thisQuantity);
        uniqueProducts[keyArr[i]][quantityField] = added;
      }
    }

    //
    var deduplicatedProductArrays = {};
    for (prop in productValues) {
      deduplicatedProductArrays[prop] = [];
    }

    // turn that object back into a set of arrays
    for (product in uniqueProducts) {
      for (prop in uniqueProducts[product]) {
        deduplicatedProductArrays[prop].push(uniqueProducts[product][prop]);
      }
    }

    // replace the old (duplicated) product object in the config with the new one
    config.product = deduplicatedProductArrays;
    return config;

  };

  // deduplicate the config before writing the XML
  config = deduplicateProducts(config);

  // product variables (loop through arrays)
  for (prop in config.product) {
    
    // add the deduplication here
      if (config.product[prop].length < 6) {
	          for (i = 0; i < config.product[prop].length; i++) {
              // add up tp 5 the product index as part of the XML tag
              formatAndAddXML(prop + "_" + i, config.product[prop][i]);
          }
      } else {
          for (i = config.product[prop].length - 5, j = 0; i < config.product[prop].length, j < 5; i++, j++) {
              // add 5 products index as part of the XML tag
              formatAndAddXML(prop + "_" + j, config.product[prop][i]);
          }
      }
  }
  // overwrite variables and increment variables
  for (prop in config.to_overwrite) {
    formatAndAddXML(prop, config.to_overwrite[prop])
  }
  for (prop in config.to_increment) {
    formatAndAddXML(prop, config.to_increment[prop])
  }

  return outputXML;
};

utag.ext.updateTripolisObject = function(newConfig, oldConfig) {
    // make sure the oldConfig exists and has the required properties
    oldConfig = oldConfig || {};
    oldConfig.product = oldConfig.product || {};
    oldConfig.to_overwrite = oldConfig.to_overwrite || {};
    oldConfig.to_increment = oldConfig.to_increment || {};
    oldConfig.cookie_duration_days = oldConfig.cookie_duration_days || newConfig.cookie_duration_days;
    oldConfig.product_key = oldConfig.product_key || newConfig.product_key;
    oldConfig.product_quantity = oldConfig.product_quantity || newConfig.product_quantity;
    // product variables (loop through arrays)
    for (prop in newConfig.product) {
        // make sure the prop exists in the oldConfig
        oldConfig.product[prop] = oldConfig.product[prop] || [];
        // push product(s) into arrays
        for (i = 0; i < newConfig.product[prop].length; i++) {
            oldConfig.product[prop].push(newConfig.product[prop][i]);
        }
    }
    // overwrite variables
    for (prop in newConfig.to_overwrite) {
        // make sure the prop exists in the oldConfig
        oldConfig.to_overwrite[prop] = oldConfig.to_overwrite[prop] || [];
        // overwrite
        oldConfig.to_overwrite[prop] = newConfig.to_overwrite[prop];
    }
    // increment variables
    for (prop in newConfig.to_increment) {
        // make sure the prop exists in the oldConfig
        oldConfig.to_increment[prop] = oldConfig.to_increment[prop] || [];
        // increment
        oldConfig.to_increment[prop] += newConfig.to_increment[prop];
    }
    // return without flattening
    return oldConfig;
};

// some cookie read and write utility functions
utag.ext.writeCookie = function (name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires="+date.toGMTString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + ";domain=" + utag.cfg.domain + ";path=/";
  return true;
};

utag.ext.readCookie = function (name) {
  var reString = '(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$';
  var re = new RegExp(reString);
  var cookieValue = document.cookie.replace(re, "$1");
  if (!cookieValue) return undefined;
  return decodeURIComponent(cookieValue);
};

utag.ext.encodeXML = function (string) {
  // make sure the input is a string, not a number
  string = String(string);
  return string.replace(/[<>&'"]/g, function (c) {
    switch (c) {
        case '<': return '&' + 'lt;';
        case '>': return '&' + 'gt;';
        case '&': return '&' + 'amp;';
        case '\'': return '&' + 'apos;';
        case '"': return '&' + 'quot;';
      }
  });
};

utag.ext.rebuyBrands = function (config) {
wantedBrands = ["Aesthetico","Belcando","Happy Dog","JRS","Royal Canin","Sanabelle","Tchibo","vitaworld","Wolfsblut"]
for (i = 0; i < config.product["product_brand"].length ; i++) {
	if (wantedBrands.indexOf(config.product["product_brand"][i]) == -1) {
		for (prop in config.product) {
                   config.product[prop].splice(i, 1);
		}
	  i = i -1
	}
}
return config;
};
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['product_brand']!='undefined'&&typeof b['product_brand']!='undefined'&&b['product_brand']!='')){try{b['product_brand_string']=utag.data['product_brand'].toString();}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['product_category_top']=DataObject.category.catalog}catch(e){};try{b['product_category_mpath']=DataObject.category.mpath}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['order_total']!='undefined'&&typeof b['order_total']!='undefined'&&b['order_total']!='')){try{b['order_total']=parseFloat(utag.data['order_total'].replace(",", "."));}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['tracking_code']!='undefined'&&typeof b['tracking_code']!='undefined'&&b['tracking_code']!='')){try{b['tracking_code']=utag_data['qp.cid'];}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 365 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + ";domain=" + TLD() + ";path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
bim = utag_data[0].customer_email;
bam = utag_data.customer_email;
if (bim) {
  var hashedemail = bim;
} else if (bam) {
  var hashedemail = bam;
}
current_cookie = readCookie("savedhashedemail");
if (hashedemail) {
    if (current_cookie == null ) {
        createCookie("savedhashedemail", hashedemail);
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['last_category_fix']=dataLayer[0]["products"][0].rakuten_category_id}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['rakuten_category_catalog']=dataLayer[0]["products"][0].rakuten_category_catalog}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['criteo_id']=localStorage.getItem('tealium_criteo_userid') || ""}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[85]=='undefined'){utag.runonce.ext[85]=1;if(/^\/suchen\//i.test(b['dom.pathname'])){
utag.link({
  event_name: 'OnSiteSearch'
});
}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['page_info_page_type'].toString().toLowerCase()=='search'.toLowerCase()){
var b = b || utag.data;
if (typeof b.product_id!='undefined') {
	b.fb_product_id = b.product_id.slice(0,5);
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['page_info_page_type'].toString().toLowerCase()=='search'.toLowerCase()||b['page_info_page_type'].toString().toLowerCase()=='product'.toLowerCase()||b['page_info_page_type'].toString().toLowerCase()=='Homepage'.toLowerCase()){b['fcb_content_type']='product'} } catch(e){ utag.DB(e) }  },
function(a,b,c,d,e,f,g){d=b['page_info_page_type'];if(typeof d=='undefined')return;c=[{'search':'product_group'},{'product':'product'},{'homepage':'product'},{'thanks page':'product'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['fcb_content_type']=c[e][f];m=true};};if(m)break};if(!m)b['fcb_content_type']='';},
function(a,b,c,d){
  b._ccity=(typeof b['']!='undefined')?b['']:'';
  b._ccountry=(typeof b['page_info_marketplace_country']!='undefined')?b['page_info_marketplace_country']:'';
  b._ccurrency=(typeof b['product_currency']!='undefined')?b['product_currency']:'';
  b._ccustid=(typeof b['customer_customer_id']!='undefined')?b['customer_customer_id']:'';
  b._corder=(typeof b['order_order_id']!='undefined')?b['order_order_id']:'';
  b._cpromo=(typeof b['']!='undefined')?b['']:'';
  b._cship=(typeof b['cart_shipping_cost']!='undefined')?b['cart_shipping_cost']:'';
  b._cstate=(typeof b['']!='undefined')?b['']:'';
  b._cstore=(typeof b['']!='undefined')?b['']:'web';
  b._csubtotal=(typeof b['']!='undefined')?b['']:'';
  b._ctax=(typeof b['product_vat']!='undefined')?b['product_vat']:'';
  b._ctotal=(typeof b['order_final_amount']!='undefined')?b['order_final_amount']:'';
  b._ctype=(typeof b['']!='undefined')?b['']:'';
  b._czip=(typeof b['']!='undefined')?b['']:'';
  b._cprod=(typeof b['product_id']!='undefined'&&b['product_id'].length>0)?b['product_id']:[];
  b._cprodname=(typeof b['product_name']!='undefined'&&b['product_name'].length>0)?b['product_name']:[];
  b._cbrand=(typeof b['product_brand']!='undefined'&&b['product_brand'].length>0)?b['product_brand']:[];
  b._ccat=(typeof b['product_category']!='undefined'&&b['product_category'].length>0)?b['product_category']:[];
  b._ccat2=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  b._cquan=(typeof b['product_quantity']!='undefined'&&b['product_quantity'].length>0)?b['product_quantity']:[];
  b._cprice=(typeof b['product_price']!='undefined'&&b['product_price'].length>0)?b['product_price']:[];
  b._csku=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  b._cpdisc=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
}];
  utag.handler.cfg_extend=[{"alr":0,"bwq":0,"id":"54","blr":1,"end":0},{"alr":0,"bwq":0,"id":"98","blr":1,"end":0},{"alr":1,"bwq":0,"id":"104","blr":0,"end":0},{"alr":1,"bwq":0,"id":"19","blr":0,"end":0},{"alr":1,"bwq":0,"id":"5","blr":0,"end":0},{"alr":1,"bwq":0,"id":"6","blr":0,"end":0},{"alr":1,"bwq":0,"id":"13","blr":0,"end":0},{"alr":1,"bwq":0,"id":"17","blr":0,"end":0},{"alr":1,"bwq":0,"id":"26","blr":0,"end":0},{"alr":1,"bwq":0,"id":"28","blr":0,"end":0},{"alr":1,"bwq":0,"id":"43","blr":0,"end":0},{"alr":1,"bwq":0,"id":"51","blr":0,"end":0},{"alr":1,"bwq":0,"id":"52","blr":0,"end":0},{"alr":0,"bwq":0,"id":"72","blr":1,"end":0},{"alr":1,"bwq":0,"id":"85","blr":0,"end":0},{"alr":1,"bwq":0,"id":"91","blr":0,"end":0},{"alr":1,"bwq":0,"id":"94","blr":0,"end":0},{"alr":1,"bwq":0,"id":"96","blr":0,"end":0},{"alr":1,"bwq":0,"id":"101","blr":0,"end":0}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"8":{load:utag.cond[3],send:1,v:201712201113,wait:1,tid:3132},"23":{load:(utag.cond[10] && utag.cond[11]),send:1,v:201804110933,wait:1,tid:20099},"25":{load:utag.cond[9],send:1,v:201711301553,wait:1,tid:7127},"30":{load:utag.cond[4],send:1,v:201802121129,wait:1,tid:20095},"42":{load:utag.cond[5],send:1,v:201805040754,wait:1,tid:20010},"2":{load:1,send:1,v:201804110931,wait:1,tid:20064},"62":{load:1,send:1,v:201805040754,wait:1,tid:13055}};
utag.loader.cfgsort=["8","23","25","30","42","2","62"];
  }
utag.loader.initcfg();
}

  if(typeof utag_cfg_ovrd!='undefined'){for(utag._i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[utag._i]=utag_cfg_ovrd[utag._i]};
  utag.loader.PINIT = function(a,b,c){
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }

    try {
      // Initialize utag.data
      this.GET();
      // Even if noview flag is set, we still want to load in tags and have them ready to fire
      // FUTURE: blr = "before load rules"
      if(utag.handler.RE('view',utag.data,"blr")){
        utag.handler.LR(utag.data);
      }
      
    }catch(e){utag.DB(e)};
    // process 'blocking' tags (tags that need to run first)
    a=this.cfg;
    c=0;
    for (b in this.GV(a)) {
      // external .js files (currency converter tag) are blocking
      if(a[b].block == 1 || (a[b].load>0 && (typeof a[b].src!='undefined'&&a[b].src!=''))){
        a[b].block = 1;
        c=1;
        this.bq[b]=1;
      }
    }
    if(c==1) {
      for (b in this.GV(a)) {
        if(a[b].block){
          // handle case of bundled and blocking (change 4 to 1)
          // (bundled tags that do not have a .src should really never be set to block... they just run first)
          a[b].id=b; 
          if(a[b].load==4)a[b].load=1; 
 	  a[b].cb=function(){
            var d=this.uid;
            utag.loader.cfg[d].cbf=1;
            utag.loader.LOAD(d)
          };
          this.AS(a[b]);
        }
      }
    }
    if(c==0)this.INIT();
  };
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    // The All Tags scope extensions run after blocking tags complete
    // The noview flag means to skip these Extensions (will run later for manual utag.view call)
    if(utag.cfg.noview!=true)utag.handler.RE('view',utag.data,"alr"); 

    utag.rpt.ts['i'] = new Date();
     
    d = this.cfgsort;
    // TODO: Publish engine should sort the bundled tags first..
    for (a=0;a<d.length;a++){
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      if(b.block != 1){
        // do not wait if the utag.cfg.noview flag is set and the tag is bundled
        if (utag.loader.bk[b.id] || ((utag.cfg.readywait||utag.cfg.noview) && b.load==4)){
          this.f[b.id]=0;
          utag.loader.LOAD(b.id)
        }else if (b.wait == 1 && utag.loader.rf == 0) {
	  utag.DB('utag.loader.INIT: waiting ' + b.id);
          this.wq.push(b)
          this.f[b.id]=2;
        }else if (b.load>0){
	  utag.DB('utag.loader.INIT: loading ' + b.id);
	  this.lq.push(b);
          this.AS(b);
        }
      }
    }
          
    if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.DB('READY:utag.loader.wq');
        utag.loader.rf=1;
        utag.loader.WQ();
      }
    });
    else if(this.lq.length>0)utag.loader.rf=1;
    else if(this.lq.length==0)utag.loader.END();

    return 1
  };
  utag.loader.EV('', 'ready', function(a) {if(utag.loader.efr!=1){utag.loader.efr=1;try{ if(typeof utag.runonce=='undefined')utag.runonce={};utag.jdh=function(h,i,j,k){h=utag.jdhc.length;if(h==0)window.clearInterval(utag.jdhi);else{for(i=0;i<h;i++){j=utag.jdhc[i];k=jQuery(j.i).is(":visible")?1:0;if(k!=j.s){if(j.e==(j.s=k))jQuery(j.i).trigger(j.e?"afterShow":"afterHide")}}}};utag.jdhi=window.setInterval(utag.jdh, 250);utag.jdhc=[]; if(1){
if(typeof utag.runonce[40]=='undefined'){utag.runonce[40]=1;jQuery(document.body).on('click','#popup-link', function(e){utag.link({ "PopupClick":'Clicked' })})}}  }catch(e){utag.DB(e)};
try{ try{ if((utag.data['page_info_page_type'].toString().toLowerCase()=='Search'.toLowerCase()&&utag.data['customer_club_rakuten'].toString().toLowerCase()=='0'.toLowerCase())||(utag.data['page_info_page_type'].toString().toLowerCase()=='Category'.toLowerCase()&&utag.data['customer_club_rakuten'].toString().toLowerCase()=='0'.toLowerCase())||(utag.data['page_info_page_type'].toString().toLowerCase()=='product'.toLowerCase()&&utag.data['customer_club_rakuten'].toString().toLowerCase()=='0'.toLowerCase())){
// Sitecatalyst tracking

window.productRecImpression = function() {
    var s = s_gi(s_account);
    s.linkTrackVars = 'events,products,eVar58';
    s.linkTrackEvents = 'event61';
    s.events = 'event61';
    s.products = ';' + s.prop11;
    s.eVar58 = 'clubrakuten';
    s.tl(true, 'o', 'clubrakuten');
}

window.productRecClose = function() {
    var s = s_gi(s_account);
    s.linkTrackVars = 'events,products,eVar58';
    s.linkTrackEvents = 'event62';
    s.events = 'event62';
    s.products = ';' + s.prop11;
    s.eVar58 = 'clubrakuten';
    s.tl(true, 'o', 'clubrakuten');
}

window.productRecClick = function() {
    var s = s_gi(s_account);
    s.linkTrackVars = 'events,products,eVar58';
    s.linkTrackEvents = 'event64';
    s.events = 'event64';
    s.products = ';' + s.prop11;
    s.eVar58 = 'clubrakuten';
    s.tl(true, 'o', 'clubrakuten');
}

// Cookie storing code

function TLD() {
    var parts = document.domain.split(".");
    return parts[parts.length - 2] + "." + parts[parts.length - 1];
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + ";domain=" + TLD() + ";path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Popup code

var styleEl = document.createElement('style'),
    styleSheet, popuptimer;
document.head.appendChild(styleEl);

styleSheet = styleEl.sheet
styleSheet.insertRule('.insp-pu{-webkit-transition-duration: 1s;transition-duration: 1s;opacity:0;font-family:Arial,sans-serif;z-index:200;display:block;background-color:#fff;font-size:12px;position:fixed;right:20px;bottom:20px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:0 1px 35px 0 rgba(0,0,0,.2);-moz-box-shadow:0 1px 35px 0 rgba(0,0,0,.2);box-shadow:0 1px 35px 0 rgba(0,0,0,.2)}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-header{position:relative;height:auto}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-header-title{padding:20px 10px;font-size:1.0em;font-weight:700;line-height:1.30em;width:280px;}', styleSheet.length + 1);
styleSheet.insertRule('.close-btn{height:18px;width:18px;border-radius:18px;position:absolute;top:10px;right:10px;font-size:2em;cursor:pointer;transition-duration:.2s}', styleSheet.length + 1);
styleSheet.insertRule('.close-stripe{height:2px;width:14px;position:absolute;top:8px;right:2px;background-color:#000;transition-duration:.2s}', styleSheet.length + 1);
styleSheet.insertRule('.stripe-left{transform:rotate(45deg);-ms-transform:rotate(45deg);-webkit-transform:rotate(45deg)}', styleSheet.length + 1);
styleSheet.insertRule('.stripe-right{transform:rotate(-45deg);-ms-transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}', styleSheet.length + 1);
styleSheet.insertRule('.close-btn:hover .close-stripe{background-color:#444}', styleSheet.length + 1);
styleSheet.insertRule('.close-btn:hover{border-color:#444}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-close{position:absolute;top:10px;right:10px;font-size:2em}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu ul{width:auto;height:auto;margin:0;padding:5px;border-top:1px solid #ccc}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu ul li{cursor:pointer;font-family:Arial,sans-serif;border-bottom:1px solid #efefef;padding:3px 0;list-style:none;width:300px;overflow:hidden}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu ul li:last-child{border-bottom:none}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-left{float:left;width:35%;text-align:center;max-height:75px;position: relative;}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-right{float:left;width:65%;}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-right::after{clear:both}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-img{width:auto;height:auto;min-width:70px;min-height:40px;max-width:90%;max-height:90%;}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-title{font-family:Arial,sans-serif;margin:4px 0;padding:0 2px;line-height:1.4em;display:table-cell;vertical-align:middle;height:70px;max-width:130px;margin:auto;}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-titleleft{font-family:Arial,sans-serif;margin:4px 0;line-height:1.4em;display:table-cell;vertical-align:middle;height:60px}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-title span{font-weight:700}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-q{color:#666;font-size:.95em;vertical-align:middle;margin-right:2px;line-height:1.2em}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-qside{color:#bf0000;font-size:1em;vertical-align:middle;display:inline-block;margin-right:2px;line-height:1.4em}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-price{display: table-row;text-align:right;color:#bf0000;font-weight:700;font-family:Arial,sans-serif;font-size:1.2em;margin:2px}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-prod-price-cur{color:#000;font-weight:400}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-button{display:block;text-decoration:none;text-align:center;background-color:#2C2C2C;color:#fff;height:auto;padding:15px;font-size:1.2em;text-transform:uppercase;border-bottom-left-radius:4px;border-bottom-right-radius:4px}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-button:hover{color:#fff}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-button:visited{color:#fff}', styleSheet.length + 1);
styleSheet.insertRule('.clear{clear:both}', styleSheet.length + 1);
styleSheet.insertRule('.insp-pu-product-reduced{position: absolute; text-align: center; top: 32px; left: 62px; padding: 0.8em 0.6em; color: #fff; background: #bf0000; -webkit-border-radius: 20px; -moz-border-radius: 20px; border-radius: 20px;font-size: 0.95em;}', styleSheet.length + 1);

function createPopup() {
    var pop2 = document.createElement("div");

    var phtml2 = '';
    phtml2 += '    <div class="insp-pu-header">';
    phtml2 += '        <div class="insp-pu-header-title">Verpassen Sie nicht Ihr Shopping-Upgrade!</div>';
    phtml2 += '        <div onclick="closePopup(); productRecClose();" class="close-btn">';
    phtml2 += '            <div class="close-stripe stripe-left"></div>';
    phtml2 += '            <div class="close-stripe stripe-right"></div>';
    phtml2 += '        </div>';
    phtml2 += '    </div>';
    phtml2 += '    <div onclick="productRecClick()" class="insp-pu-footer">';
    phtml2 += '        <a href="https://www.rakuten.de/club">';
    phtml2 += '        <img src="http://link.newsletter.rakuten.de/public/image_Y7ILv94bzpYDHG13a9gZRw.jpg">';
    phtml2 += '        </a>';
    phtml2 += '    </div>';
    phtml2 += '    <div onclick="productRecClick()" class="insp-pu-footer">';
    phtml2 += '        <a href="https://www.rakuten.de/club" class="insp-pu-button" id="popup-link"><b>Mehr erfahren</b></a>';
    phtml2 += '    </div>';
    pop2.id = "perspop2";
    pop2.onmouseover = clearTimer();
    pop2.setAttribute('class', 'insp-pu');
    pop2.innerHTML = phtml2;

    document.body.appendChild(pop2);
}

window.clearTimer = function() {
    clearTimeout(popuptimer);
}


window.showPopup = function() {

    setTimeout(function() {
        document.getElementById('perspop2').style.opacity = 1;
        document.getElementById('perspop2').style.visibility = "visible";
    }, 10);

    productRecImpression();
    popuptimer = setTimeout(function() {
        closePopup()
    }, 12000);
}

window.closePopup = function() {
    document.getElementById('perspop2').style.opacity = 0;
    document.getElementById('perspop2').style.visibility = "hidden";
}

if (readCookie("personalizedpopup") == null) {
    createCookie("personalizedpopup", "0");
}

var cookievalue = utag.ext.readCookie("personalizedpopup");
var popuphtml = "";
var pageview = Number(utag_data["cp.utag_main__pn"]);
if (cookievalue != "undefined") {
    try {
        var obj = cookievalue;
    } catch (e) {
        obj = "";
    }
    var currentcookie = Number(obj);
    if (currentcookie < 2 && pageview >= 1) {
        //if (dataLayer[0].products[0].rakuten_category_catalog.toString()!="3" && dataLayer[0].products[0].rakuten_category_catalog.toString()!="10" && dataLayer[0].products[0].rakuten_category_catalog.toString()!="11" && dataLayer[0].products[0].rakuten_category_catalog.toString()!="23"){
        setTimeout(function() {
            createPopup();
            showPopup()
        }, 2000);
        var oldcookiestr = utag.ext.readCookie("personalizedpopup");
        var oldcookie = Number(oldcookiestr);
        oldcookie++;
        var newcookiestr = oldcookie.toString();
        createCookie("personalizedpopup", newcookiestr);
       // }
    }
}
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{  if(1){
if(typeof utag.runonce[75]=='undefined'){utag.runonce[75]=1;jQuery(document.body).on('click','.button_addtocart', function(e){utag.link({ "leadscore_type":'addToCart',"event_name":'addToCart' })})}}  }catch(e){utag.DB(e)};
try{  if(1){
if(typeof utag.runonce[76]=='undefined'){utag.runonce[76]=1;jQuery(document.body).on('click','.btn_enlarge-description', function(e){utag.link({ "leadscore_type":'viewFullDescription' })})}}  }catch(e){utag.DB(e)};
try{  if(1){
if(typeof utag.runonce[80]=='undefined'){utag.runonce[80]=1;jQuery(document.body).on('click','a[data-lightbox="product"]', function(e){utag.link({ "leadscore_type":'enlargingPicture' })})}}  }catch(e){utag.DB(e)};
try{  if(1){
if(typeof utag.runonce[81]=='undefined'){utag.runonce[81]=1;jQuery(document.body).on('click','.like', function(e){utag.link({ "leadscore_type":'addToWhishlist' })})}}  }catch(e){utag.DB(e)};
try{  if(1){
if(typeof utag.runonce[82]=='undefined'){utag.runonce[82]=1;jQuery(document.body).on('click','.b-btn-search', function(e){utag.link({ "leadscore_type":'onsiteSearch' })})}}  }catch(e){utag.DB(e)};
try{ try{ if(1){
function checkFBQ() {
  if (typeof fbq === 'function') {
    fbq('trackCustom', 'AudienceStream', {
      b1_segment: utag_data["va.properties.7276"] ? utag_data["va.properties.7276"] : 'undefined'
    });
  } else {
    setTimeout(function(){
      checkFBQ();
    }, 1000) 
  }
}

checkFBQ();
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
try {
  // Send once per session a pageView
  var ss_gaTeal_send = sessionStorage.getItem('gaTeal_send') || null;
  
  function checkGa() {
    if (typeof ga == 'function') {
      ga('create', 'UA-36878912-20', 'auto', 'gaTeal');
      ga('gaTeal.send', 'pageview');
    } else {
      setTimeout(checkGa, 1000);
    }
  }
  
  if (ss_gaTeal_send != 'true') {
    sessionStorage.setItem('gaTeal_send', 'true');
    checkGa();
  }
} catch (e) {
  console.warn('Tealium extension failed: ' + e);
}
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(/cart_checkout$/i.test(utag.data['page_info_page_type'])){
  window.conversionWunderInit = function(init) {
    init({
      siteid: 462935,
      item: {
        name: 'Order Done'
      },
      order: {
        id:       utag_data["order_id"], // Mandatory 
        shipping: utag_data["cart_shipping_cost"].replace(",","."),
        revenue:  utag_data["order_total"].replace(",","."),
        profit:   '0.00',
        currency: 'EUR'
      },
      order_items: {
        ids:        utag_data["product_id"],
        prices:     utag_data["product_price"],
        quantities: utag_data["product_quantity"]
      },
      category: {
        name: 'Order', 
        path: 'order/done'
      }
    });
  };

  (function() {
    function loadcw() {
      var s = document.getElementsByTagName('script')[0],
          e = document.createElement('script');
          
      e.setAttribute('language', 'javascript');
      e.setAttribute('type', 'text/javascript');
      e.setAttribute('async', 'async');
      e.setAttribute(
        'src', 'http'+(document.location.protocol=='https:'?'s':'')+
        '://lib.productsup.io/engine/load.js'
      );
      s.parentNode.insertBefore(e, s);
    }

    var oldonload = window.onload;
    window.onload = (typeof window.onload != 'function')?
                    loadcw:function(){oldonload();loadcw();};
  })();
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};}})

  if(utag.cfg.readywait || utag.cfg.waittimer){
    utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.loader.rf=1;
        utag.cfg.readywait=1;
        utag.DB('READY:utag.cfg.readywait');
        setTimeout(function(){utag.loader.PINIT()}, utag.cfg.waittimer || 1);
      }
    })
  }else{
    utag.loader.PINIT()
  }
}

