notReverse = true;

function alphaSort() {
	oldMain = document.getElementsByTagName('main')[0];
	mapNames = [];
	anchs = oldMain.getElementsByTagName('a');
	sort_btn = document.getElementById('alphaSort')

	for(i=0;i<anchs.length;i++){
	    mapNames[i]=anchs[i].innerHTML.trim().toLowerCase()
	}

	mapNames.sort();
	
	if (notReverse) {
		sort_btn.innerHTML = '<i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>';
		notReverse = false;
	}
	else{
		sort_btn.innerHTML = '<i class="fa fa-sort-alpha-desc" aria-hidden="true"></i>';
		mapNames.reverse();
		notReverse = true;
	}

	newMain = document.createElement('main');
	for(i=0;i<anchs.length;i++){
	    for(j=0;j<anchs.length;j++){
		    anch = anchs[j]
		    thisMap = anch.innerHTML.trim();
		    article = anch.parentNode.parentNode.cloneNode(true);
	        if(mapNames[i]==thisMap.toLowerCase()){
		        newMain.appendChild(article);
	            break;
	        }
	    }
	}
	body = oldMain.parentNode;
	oldMain.remove();
	body.appendChild(newMain)
}

function filter_by_creator(creator_name) {
	mainTag = document.getElementsByTagName('main')[0];

	spans = mainTag.getElementsByTagName('span');

	creators = []
	for(i=0;i<spans.length/2;i++){
	    creators.push(spans[i*2].innerHTML.trim())
	}

	creators.sort();
	histo = {}

	for(i=0;i<creators.length;i++){
	    if(!(creators[i] in histo)){
	        histo[creators[i]] = 1;
	    }
	    else{
	        histo[creators[i]] += 1;
	    }
	}

	creators = []
	for(i in histo){
	    creators.push(i)
	}

	articles = document.getElementsByTagName('article');

	newnewMain = document.createElement('main');
	for(i=0;i<articles.length;i++){
	    checkName = articles[i].getElementsByTagName('span')[0].innerText;
	    if(checkName==creator_name)    
	        newnewMain.appendChild(articles[i])
	}
	newMain.remove();
	body.appendChild(newnewMain);
}


alphaSort();