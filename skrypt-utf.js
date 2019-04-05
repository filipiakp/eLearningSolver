var regex = /\*[-\/\\\(\)\_\dA-Za-z\&;.\<\>]+[ \/\\\(\)\_\dA-Za-z\&;,.\<\>!]*(: [a-z]+\?)?\*/g;//jakis komentarz
var s = -1;//script counter
var isH5PScript = false;
do{
	if(typeof document.scripts[++s] !== "undefined"){
		isH5PScript = document.scripts[s].innerHTML.includes("var H5PIntegration")? true:false;
	}
}while(!isH5PScript && s<10);

answers = Array.from(document.scripts[s].innerHTML.matchAll(regex));//answers array with *, HTML entities and unicode

answersArray = new Array();//array for ready-to-insert answers
for(var i=0; i<answers.length; i++){
	answer = answers[i][0].toString();
	answer = answer.replace(/&lt;/g,"<");
	answer = answer.replace(/&gt;/g,">");
	answer = answer.replace(/&amp;/g,"&");
	answer = answer.replace(/&ast;/g,"*");
	answer = answer.replace(/(: [a-z]+\?)/g,"");
	answer = answer.replace(/\*/g,"");
	answer = answer.replace(/\\\\/g,"\\");
	answer = JSON.parse("\""+answer+"\"");//decodes unicode
	answer = answer.match(/\\/)?answer.substring(0,answer.indexOf("\\")):answer;//cuts other good answers
	answersArray[i] = answer;
}

h5pdocument = document.getElementsByClassName("h5p-iframe-wrapper")[0].childNodes[0].contentWindow.document;
slides = h5pdocument.getElementsByClassName("h5p-progressbar-part");
var slide = 0; 
var j = 0;//actual answer
var k = 0;//actual input
while(j<answersArray.length){
	inputs = h5pdocument.getElementsByClassName("h5p-text-input");
	for( ;k<inputs.length;k++){
		inputs[k].value = answersArray[j];
		inputs[k].click();
		j++;
	}
	slides[++slide].childNodes[0].click();
}

