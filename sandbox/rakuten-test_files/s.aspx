/* JS/rtLib.js */(function(j,g){var k=function(l,d){console.debug(l);if(d){console.dir(d)}};var e=function(d){return g.createElement(d)};var i=function(d,l,m){d.setAttribute(l,m)};var f=function(m,l){var d=e("iframe");d.id=m;d.name=m;i(d,"width",1);i(d,"height",1);i(d,"scrolling","no");d.style.position="absolute";d.style.width=0;d.style.height=0;d.style.border=0;if(l){d.src=l}return d};var c=function(){g.write("<body></body>");k("created body on demand")};var b=function(d){if(!g.body){c()}g.body.appendChild(d)};var a=function(l,m,o){var n=b(f("iframe",null));var d=n.contentWindow.document;d.open().write('<body onload="var d = document;d.getElementsByTagName("body")[0].appendChild(d.createElement("'+l+'")).src="'+o+'" >');d.close()};var h={addScript:function(d,l){a("script",d,l)},addIframe:function(d,l){a("iframe",d,l)},attachOnLoad:function(d){if(g.readyState==="complete"){d()}else{if(j.addEventListener){j.addEventListener("load",d)}else{j.attachEvent("onload",d)}}},runPixel:function(d){new Image().src=d},createScript:function(l){var d=e("script");d.src=l;return d},prot:function(){return g.location.protocol},rand:function(){return Math.random()*1e+17},createIframe:f,bodyAppend:b,attr:i,dbg:k};j.__a33454638_lib=h})(window,document);







