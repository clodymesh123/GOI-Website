var notReverse = true, creatorSelected = false, getAlphaMain = true;
mainTag = document.getElementsByTagName('main')[0];

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
		sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
		notReverse = false;
	}
	else{
		sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down-alt"></i>';
		mapNames.reverse();
		notReverse = true;
	}

	let newMain = document.createElement('main');
	for(i=0;i<anchs.length;i++){
	    for(j=0;j<anchs.length;j++){
		    anch = anchs[j]
		    thisMap = anch.innerText.trim();
		    article = anch.parentNode.parentNode.cloneNode(true);
	        if(mapNames[i]==thisMap.toLowerCase()){
		        newMain.appendChild(article);
	            break;
	        }
	    }
	}
	if (getAlphaMain) {mainTag = newMain.cloneNode(true);getAlphaMain=false;}
	body = oldMain.parentNode;
	oldMain.remove();
	body.appendChild(newMain)
}

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
creators_lc = []
for (var i = 0; i < creators.length; i++) {
	creators_lc[i] = creators[i].toLowerCase();
	creators_lc.sort();
}

function add_creators() {
	creatorsMenu = document.getElementsByClassName('sub-menu')[0];
	for (i = 0; i < creators_lc.length; i++) {
		creatorDiv = document.createElement('div');
		creatorDiv.onclick = function(){filter_by_creator(this)}
		for (var j = 0; j < creators.length; j++) {
			if (creators_lc[i]==creators[j].toLowerCase()){
				creatorDiv.innerHTML = creators[j];
				break;
			}
		}
		creatorsMenu.appendChild(creatorDiv);
	}
}

var previous_name='';
function filter_by_creator(creator_name_tag) {
	creatorSelected = true;
	sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
	notReverse = false;
	if (previous_name!='') {
		previous_name.style.backgroundColor='';
		previous_name.onmouseenter = function(){};
		previous_name.onmouseleave = function(){};
	}
	creator_name = creator_name_tag.innerText;
	sub = creator_name_tag.parentNode.parentNode;
	sub.style.backgroundColor = '#b4ffc7';
	sub.onmouseenter = function (){this.style.backgroundColor = '#91eaa8';};
	sub.onmouseleave = function (){this.style.backgroundColor = '#b4ffc7';};
	creator_name_tag.style.backgroundColor = '#b4ffc7';
	creator_name_tag.onmouseenter =  function () {this.style.backgroundColor = '#91eaa8';}
	creator_name_tag.onmouseleave = function(){this.style.backgroundColor = '#b4ffc7';}
	creator_name_tag.parentNode.style.display = 'none';
	articles = mainTag.getElementsByTagName('article');
	newMainTag = document.createElement('main');
	newMainTag = mainTag;
	thisMain = document.getElementsByTagName('main')[0];
	thisMain.remove();
	body.appendChild(newMainTag);
	thisMain = document.getElementsByTagName('main')[0];
	mainByCreator = document.createElement('main');
	for(i=0;i<articles.length;i++){
	    checkName = articles[i].getElementsByTagName('span')[0].innerText;
	    if(checkName==creator_name)    
	        mainByCreator.appendChild(articles[i].cloneNode(true));
	}
	thisMain.remove();
	body.appendChild(mainByCreator);
	previous_name = creator_name_tag;
}

function deselect_creator_filter(subbtn) {
	if (creatorSelected) {
		let original_main = mainTag.cloneNode(true);
		let thisMain = document.getElementsByTagName('main')[0];
		thisMain.remove();
		body.appendChild(original_main);
		sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
		if (previous_name!='') {
			previous_name.style.backgroundColor='';
			previous_name.onmouseenter = function(){};
			previous_name.onmouseleave = function(){};
		}
		sub.style.backgroundColor = '';
		sub.onmouseenter = function (){};
		sub.onmouseleave = function (){};
		notReverse = false;
		creatorSelected = false;
	}
}

function scrollBack(dropdown) {
   dropdown.getElementsByClassName('sub-menu')[0].scrollTop = 0;
}
function modifyDisplay(sub) {
   sub.getElementsByClassName('sub-menu')[0].style.display = "";
 }
 var prevScrollpos = window.pageYOffset;
 window.onscroll = function() {

 var currentScrollPos = window.pageYOffset;
 subMenus = document.getElementsByClassName("sub-menu");
 subMenus[0].style.display = "";
 subMenus[1].style.display = "";
 if ((prevScrollpos < currentScrollPos)||(prevScrollpos > currentScrollPos)) {
   subMenus[0].style.display = "none";
   subMenus[1].style.display = "none";
 }
 prevScrollpos = currentScrollPos;
}


alphaSort();
add_creators();