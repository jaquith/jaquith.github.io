
function saveLog(){
    var dataParams =
        "campaignID=15779"+
        "&place=" + encodeURI(sktx.place) +
        "&timestamp=" + encodeURI(sktx.timestamp) +
        "&referrer=" + encodeURIComponent(document.referrer);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://trx.skadtec.com/rere.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(dataParams);
}


if(typeof(sktx.place)=="undefined"){sktx.place="other";}
if(typeof(sktx.price)=="undefined"){sktx.price=0;}
if(typeof(sktx.timestamp)=="undefined"){sktx.timestamp=1525682026;}
if(typeof(sktx.currency)=="undefined"){sktx.currency="";}
if(typeof(sktx.userIDNumber)=="undefined"){sktx.userIDNumber=0;}
if(typeof(sktx.productIDs)=="undefined"){sktx.productIDs="";}
if(typeof(sktx.productgroup)=="undefined"){sktx.productgroup="";}
if(typeof(sktx.scproducts)=="undefined"){sktx.scproducts=0;}
if(typeof(sktx.sctotal)=="undefined"){sktx.sctotal=0;}

saveLog();

reskad=document.createElement("script");
reskad.type="text/javascript";
reskad.src="https://trx.skadtec.com/check_re.php?campaign="+encodeURI(15779)+"&place="+encodeURI(sktx.place)+"&price="+encodeURI(sktx.price)+"&currency="+encodeURI(sktx.currency)+"&useridnumber="+encodeURI(sktx.userIDNumber)+"&productids="+encodeURI(sktx.productIDs)+"&productgroup="+encodeURI(sktx.productgroup)+"&scproducts="+encodeURI(sktx.scproducts)+"&sctotal="+encodeURI(sktx.sctotal)+"&referrer="+encodeURIComponent(document.referrer)+"&timestamp=1525682026";
document.getElementsByTagName("body")[0].appendChild(reskad);

