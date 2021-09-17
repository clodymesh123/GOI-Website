mainTag = document.getElementsByTagName('main')[0];
mapNames = [];
anchs = mainTag.getElementsByTagName('a');

for(i=0;i<anchs.length;i++){
    mapNames[i]=anchs[i].innerHTML.trim().toLowerCase()
}

mapNames.sort();

newMain = document.createElement('main');
for(i=0;i<anchs.length;i++){
    for(j=0;j<anchs.length;j++){
	    anch = anchs[j]
	    thisMap = anch.innerHTML.trim();
	    article = anch.parentNode.parentNode.cloneNode(true);
        if(mapNames[i]==thisMap.toLowerCase()){
	        console.log(thisMap);
            newMain.appendChild(article);
            // i--;
            break;
        }
    }
}
body = mainTag.parentNode;
mainTag.remove();
body.appendChild(newMain)