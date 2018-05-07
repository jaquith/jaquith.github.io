if(document.createElement) {
	var protocol = 'http'+((document.location.protocol == 'https:')?'s':'')+'://';
	var effi_660019405_idp = '';
	var effi_660019405_catid = '';
	var effi_660019405_catwording = '';
	var effi_660019405_ref = '';
    var effi_660019405_ref2 = '';
	var effi_660019405_mnt = '';
	var effi_660019405_email = '';
	var effi_660019405_insession = '';
	var effi_660019405_newcustomer = '';
	var effi_660019405_prix = '';
    var effi_660019405_storeid = '';
    var effi_660019405_q = '';
    var effi_660019405_quantity = '';
	var effi_660019405_params = new Array();
	var effi_660019405_mastertag = new Object();

	function fn_effi_660019405_parseurl(url) {
		var effi_660019405_result = new Array();
		var effi_660019405_params1 = url.split('&');
		for(var i=0; i<effi_660019405_params1.length; i++) {
			var t = effi_660019405_params1[i].split('=');
			 effi_660019405_result[t[0]] = t[1];
		}
		return  effi_660019405_result;
	}
    
	
	var effi_660019405_str_src_js = 'mastertag.effiliation.com';
    var effi_660019405_allScripts = document.getElementsByTagName('script');
    for(var i=0; i<effi_660019405_allScripts.length;i++) {
    	var currentScript = effi_660019405_allScripts.item(i);
    	var reg_src_js = new RegExp(effi_660019405_str_src_js,'g');
    	if(currentScript.src && reg_src_js.test(currentScript.src)) {
            var param = currentScript.src.lastIndexOf('?');
            if(param !== -1){
                effi_660019405_params = fn_effi_660019405_parseurl(currentScript.src.substring(param+1));
            } else {
                 if(typeof effiDataLayer !== "undefined"){
                    effi_660019405_params = effiDataLayer;
                } else {
                    console.log('No parameters found for mastertag');
                }
            }            
    		break;
    	}
    }
	

	switch(effi_660019405_params.page) {
		case('home'):
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			break;
		
		case('search'):
                        if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
                        if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
                        if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
                        if(typeof effi_660019405_params.q != 'undefined') effi_660019405_q = effi_660019405_params.q;
                        break;

		case('product'):
			if(typeof effi_660019405_params.idp != 'undefined') effi_660019405_idp = effi_660019405_params.idp.replace(/%2C/g, ',');
			if(typeof effi_660019405_params.idcat != 'undefined') effi_660019405_catid = effi_660019405_params.idcat;
			if(typeof effi_660019405_params.wordingcat != 'undefined') effi_660019405_catwording = effi_660019405_params.wordingcat;
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			if(typeof effi_660019405_params.prix != 'undefined') effi_660019405_prix = effi_660019405_params.prix.replace(/%2C/g, ',');
			break;

		case('category'):
			if(typeof effi_660019405_params.idcat != 'undefined') effi_660019405_catid = effi_660019405_params.idcat;
			if(typeof effi_660019405_params.wordingcat != 'undefined') effi_660019405_catwording = effi_660019405_params.wordingcat;
			if(typeof effi_660019405_params.idp != 'undefined') effi_660019405_idp = effi_660019405_params.idp.replace(/%2C/g, ',');
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			break;

		case('addcart'):
			if(typeof effi_660019405_params.idp != 'undefined') effi_660019405_idp = effi_660019405_params.idp.replace(/_/g, ',').replace(/%2C/g, ',');
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			if(typeof effi_660019405_params.prix != 'undefined') effi_660019405_prix = effi_660019405_params.prix.replace(/%2C/g, ',');
			if(typeof effi_660019405_params.montant != 'undefined') effi_660019405_mnt = effi_660019405_params.montant;
			break;

		case('sale'):
			if(typeof effi_660019405_params.idp != 'undefined') effi_660019405_idp = effi_660019405_params.idp.replace(/_/g, ',').replace(/%2C/g, ',');
			if(typeof effi_660019405_params.montant != 'undefined') effi_660019405_mnt = effi_660019405_params.montant;
			if(typeof effi_660019405_params.ref != 'undefined') effi_660019405_ref = effi_660019405_params.ref;
			if(typeof effi_660019405_params.email != 'undefined') effi_660019405_email = effi_660019405_params.email;
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			if(typeof effi_660019405_params.prix != 'undefined') effi_660019405_prix = effi_660019405_params.prix.replace(/%2C/g, ',');
			if(typeof effi_660019405_params.quantity != 'undefined') effi_660019405_quantity = effi_660019405_params.quantity.replace(/%2C/g, ',');
			break;

		case('form'):
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			break;

		case('lead'):
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			if(typeof effi_660019405_params.ref != 'undefined') effi_660019405_ref = effi_660019405_params.ref;
			if(typeof effi_660019405_params.ref2 != 'undefined') effi_660019405_ref2 = effi_660019405_params.ref2;
			break;
		case('crm'):
                        if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
                        if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
                        if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
                        break;
		case('generic'):
			if(typeof effi_660019405_params.insession != 'undefined') effi_660019405_insession = effi_660019405_params.insession;
			if(typeof effi_660019405_params.newcustomer != 'undefined') effi_660019405_newcustomer = effi_660019405_params.newcustomer;
			if(typeof effi_660019405_params.storeid != 'undefined') effi_660019405_storeid = effi_660019405_params.storeid;
			break;

		default :
			break;
      }

// Tag AudienceNetwork 
if(typeof fbq === 'undefined') {
    !function(f,b,e,v,n,t,s){ 
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
    }(window,document,'script','//connect.facebook.net/en_US/fbevents.js');     
    
    fbq('init', '1529071114071254');          
}

fbq('trackCustom', 'AudienceNetwork', {
    id_customer: ['660019405'],
    
    referrer: document.referrer
});
    if(effi_660019405_params.page == 'home'){
         effi_660019405_engage('home', effi_660019405_params);
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-general.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());   // Tag DataAudience
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ?       [window._adftrack] : []);
      window._adftrack.push({
         pm: 1152022,
         divider: encodeURIComponent('|'),
         pagename: encodeURIComponent('Home')
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

    }

    if(effi_660019405_params.page == 'search'){
         effi_660019405_engage('search', effi_660019405_params);

    }

    if(effi_660019405_params.page == 'generic'){
        effi_660019405_engage('generic', effi_660019405_params);
	effi_660019405_launch_generic();
    }

    if(effi_660019405_params.page == 'product'){
        effi_660019405_engage('product', effi_660019405_params);
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-general.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());   // Tag DataAudience
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ?       [window._adftrack] : []);
      window._adftrack.push({
        pm: 1152022,
        pagename: encodeURIComponent('Product page'),
        divider: encodeURIComponent('|'),
        products: [{ 
            productid: effi_660019405_idp,
            categoryid: '',
            step: 1
        }]
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

    }

    if(effi_660019405_params.page == 'category'){
         effi_660019405_engage('category', effi_660019405_params);
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-general.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());
    }

    if(effi_660019405_params.page == 'addcart'){
         effi_660019405_engage('addcart', effi_660019405_params);
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-basket.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());   // Tag DataAudience
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ?       [window._adftrack] : []);
      window._adftrack.push({
        pm: 1152022,
        pagename: encodeURIComponent('Basket'),
        divider: encodeURIComponent('|'),
        order: { 
            sales: '',
            sv1: effi_660019405_mnt,
            itms: [{ 
                productid: effi_660019405_idp,
                step: 2
            }]
        }
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

    }

    if(effi_660019405_params.page == 'sale'){
         effi_660019405_engage('sale', effi_660019405_params);
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-checkout.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());   // Tag DataAudience
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ?       [window._adftrack] : []);
      window._adftrack.push({
        pm: 1152022,
        pagename: encodeURIComponent('Conversion page'),
        divider: encodeURIComponent('|'),
        order: { 
            sales: '',
            orderid: effi_660019405_ref,
            sv1: effi_660019405_mnt,
            itms: [{ 
                productid: effi_660019405_idp,
                step: 3
            }]
        }
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

    }

    if(effi_660019405_params.page == 'form'){
        effi_660019405_engage('form', effi_660019405_params);
	effi_660019405_launch_form();
    }

    if(effi_660019405_params.page == 'lead'){
        effi_660019405_engage('lead', effi_660019405_params);
	effi_660019405_launch_lead(effi_660019405_ref);
    }

    if(effi_660019405_params.page == 'crm'){
        effi_660019405_engage('crm', effi_660019405_params);

    }

    // End MasterTag Effiliation
}


function effi_660019405_launch_generic() {
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-general.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());
}
function effi_660019405_launch_form() {
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-general.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());   // Tag DataAudience
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ?       [window._adftrack] : []);
      window._adftrack.push({
         pm: 1152022,
         divider: encodeURIComponent('|'),
         pagename: encodeURIComponent('Registration')
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

}
function effi_660019405_launch_lead(ref) {
//Tag bigbangdata 2
(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = '//bbd-tag.de/r/1396105555-general.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}());   // Tag DataAudience
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ?       [window._adftrack] : []);
      window._adftrack.push({
         pm: 1152022,
         divider: encodeURIComponent('|'),
         pagename: encodeURIComponent('Registration Confirmation')
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

}

function effi_660019405_engage(_page, _params) {
	if(_page) {
		if(_page == 'home' || _page == 'search' || _page == 'product' || _page == 'category' || _page == 'addcart' || _page == 'sale' || _page == 'form' || _page == 'lead' || _page == 'crm' || _page == 'generic') {
			if(_params.montant === undefined) {
				_params.montant = '';
			}
			var _effi_ws_engage = document.createElement('script');
	        	_effi_ws_engage.type = 'text/javascript';
		        _effi_ws_engage.async = true;
        		_effi_ws_engage.src = ('http'+((document.location.protocol == 'https:')?'s':'')+'://') + 'track.effiliation.com/mt/produce/660019405/?page='+_page+'&insession='+_params.insession+'&newcustomer='+_params.newcustomer+'&storeid='+_params.storeid+'&idcat='+_params.idcat+'&wordingcat='+_params.wordingcat+'&idp='+_params.idp+'&prix='+_params.prix+'&montant='+_params.montant+'&ref='+_params.ref;
	        	var s = document.getElementsByTagName('script')[0]||document.getElementsByTagName('body')[0];
	        	s.parentNode.insertBefore(_effi_ws_engage, s);
	        }
		}
	}


