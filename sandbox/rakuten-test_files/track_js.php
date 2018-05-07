(function() {
	var w = window, i = 0;
	while(true){try{if(w!==w.parent){w.parent.document.URL;w=w.parent}else{break}}catch(e){i=1;break}}
	_adrx.push({url:encodeURIComponent(w.document.URL)});
	_adrx.push({referrer:encodeURIComponent(w.document.referrer)});
	_adrx.push({window:{outerHeight:w.outerHeight, outerWidth:w.outerWidth, innerHeight:w.innerHeight, innerWidth:w.innerWidth, iframe:i, userAgent:navigator.userAgent}});
	!function(e,t,a,c,n){c=e.createElement(t),c.async=1,c.src=a,n=e.getElementsByTagName(t)[0],n.parentNode.insertBefore(c,n);}(document,'script','https://ad.53rv3r.com/track.php?t='+Math.random().toString().substring(5,15)+'&q='+JSON.stringify(_adrx));
})();