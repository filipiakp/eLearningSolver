var regex = /\*[ \/\\\(\)\_\dA-Za-z\&;.\<\>]+\*/g;
var s = -1;
var saOdpowiedzi = false;
do{
	if(typeof document.scripts[++s] !== "undefined"){
		saOdpowiedzi = document.scripts[s].innerHTML.includes("var H5PIntegration")? true:false;
	}
}while(!saOdpowiedzi && s<10);

odpowiedzi = Array.from(document.scripts[s].innerHTML.matchAll(regex));

odp_tab = new Array();
for(var i=0; i<odpowiedzi.length; i++){
	odp = odpowiedzi[i][0].toString();
	odp = odp.replace(/&lt;/g,"<");
	odp = odp.replace(/&gt;/g,">");
	odp = odp.replace(/&amp;/g,"&");
	odp = odp.replace(/&ast;/g,"*");
	odp = odp.replace(/\*/g,"");
	odp = odp.replace(/\\\\/g,"\\");
	odp = JSON.parse("\""+odp+"\"");
	odp = odp.match(/\\/)?odp.substring(0,odp.indexOf("\\")):odp;
	odp_tab[i] = odp;
}

h5pdocument = document.getElementsByClassName("h5p-iframe-wrapper")[0].childNodes[0].contentWindow.document;
slajdy = h5pdocument.getElementsByClassName("h5p-progressbar-part");
var slajd = 0; 
var j = 0;
while(j<odp_tab.length){
	inputy = h5pdocument.getElementsByClassName("h5p-text-input");
	for(var k=0;k<inputy.length;k++){
		inputy[k].value = odp_tab[j];
		inputy[k].click();
		j++;
	}
	slajdy[++slajd].childNodes[0].click();
}

