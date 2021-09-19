var notReverse = true, creatorSelected = false, lengthSelected = false, getAlphaMain = true;
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


lengths = []
for(i=1;i<spans.length;i+=2){
    lengths.push(spans[i].innerHTML.trim())
}

lengths.sort();
histo = {}

for(i=0;i<lengths.length;i++){
    if(!(lengths[i] in histo)){
        histo[lengths[i]] = 1;
    }
    else{
        histo[lengths[i]] += 1;
    }
}

lengths = []
for(i in histo){
    lengths.push(i)
}
lengths_lc = []
for (var i = 0; i < lengths.length; i++) {
	lengths_lc[i] = lengths[i].toLowerCase();
	lengths_lc.sort();
}
// sorted_lengths = [];
// for (i = 0; i < lengths_lc.length; i++) {
// 	for (var j = 0; j < lengths.length; j++) {
// 		if (lengths_lc[i]==lengths[j].toLowerCase()){
// 			sorted_lengths.push(lengths[j]);
// 			break;
// 		}
// 	}
// }

function add_subMenu_content(content, lc, zeroOne) {
	let subMenu = document.getElementsByClassName('sub-menu')[zeroOne];
	for (i = 0; i < lc.length; i++) {
		let subDiv = document.createElement('div');
		subDiv.onclick = function(){filter_by_content(this, zeroOne)}
		for (var j = 0; j < content.length; j++) {
			if (lc[i]==content[j].toLowerCase()){
				subDiv.innerHTML = content[j];
				break;
			}
		}
		subMenu.appendChild(subDiv);
	}
}

add_subMenu_content(creators,creators_lc,0);
add_subMenu_content(lengths,lengths_lc,1);

var previous_creator='', previous_length='';
function filter_by_content(content_tag, zeroOne) {
	sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
	notReverse = false;
	let subs = document.getElementsByClassName('sub');
	lengthParent = subs[1];
	lengthParent.style.backgroundColor='';
	lengthParent.onmouseenter = function(){};
	lengthParent.onmouseleave = function(){};
	creatorParent = subs[0];
	creatorParent.style.backgroundColor='';
	creatorParent.onmouseenter = function(){};
	creatorParent.onmouseleave = function(){};
	if (previous_creator!='') {
		previous_creator.style.backgroundColor='';
		previous_creator.onmouseenter = function(){};
		previous_creator.onmouseleave = function(){};
	}
	if (previous_length!='') {
		previous_length.style.backgroundColor='';
		previous_length.onmouseenter = function(){};
		previous_length.onmouseleave = function(){};
	}
	content = content_tag.innerText;
	if (zeroOne==0){
		creatorSub = content_tag.parentNode.parentNode;
		creatorSub.style.backgroundColor = '#b4ffc7';
		creatorSub.onmouseenter = function (){this.style.backgroundColor = '#91eaa8';};
		creatorSub.onmouseleave = function (){this.style.backgroundColor = '#b4ffc7';};
	}
	else if (zeroOne==1) {
		lengthSub = content_tag.parentNode.parentNode;
		lengthSub.style.backgroundColor = '#b4ffc7';
		lengthSub.onmouseenter = function (){this.style.backgroundColor = '#91eaa8';};
		lengthSub.onmouseleave = function (){this.style.backgroundColor = '#b4ffc7';};
	}
	content_tag.style.backgroundColor = '#b4ffc7';
	content_tag.onmouseenter =  function () {this.style.backgroundColor = '#91eaa8';}
	content_tag.onmouseleave = function(){this.style.backgroundColor = '#b4ffc7';}
	content_tag.parentNode.style.display = 'none';
	articles = mainTag.getElementsByTagName('article');
	newMainTag = document.createElement('main');
	newMainTag = mainTag;
	thisMain = document.getElementsByTagName('main')[0];
	thisMain.remove();
	body.appendChild(newMainTag);
	thisMain = document.getElementsByTagName('main')[0];
	mainByCreator = document.createElement('main');
	for(i=0;i<articles.length;i++){
	    checkName = articles[i].getElementsByTagName('span')[zeroOne].innerText;
	    if(checkName==content)    
	        mainByCreator.appendChild(articles[i].cloneNode(true));
	}
	thisMain.remove();
	body.appendChild(mainByCreator);
	if (zeroOne==0) {
		creatorSelected = true;
		previous_creator = content_tag;
	}
	else if (zeroOne==1) {
		lengthSelected = true;
		previous_length = content_tag;
	}
}

function deselect_content_filter(subbtn) {
	if (creatorSelected) {
		let original_main = mainTag.cloneNode(true);
		let thisMain = document.getElementsByTagName('main')[0];
		thisMain.remove();
		body.appendChild(original_main);
		sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
		if (previous_creator!='') {
			previous_creator.style.backgroundColor='';
			previous_creator.onmouseenter = function(){};
			previous_creator.onmouseleave = function(){};
		}
		creatorSub.onmouseenter = function (){};
		creatorSub.onmouseleave = function (){};
		creatorSelected = false;
	}
	if (lengthSelected) {
		let original_main = mainTag.cloneNode(true);
		let thisMain = document.getElementsByTagName('main')[0];
		thisMain.remove();
		body.appendChild(original_main);
		sort_btn.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
		if (previous_length!='') {
			previous_length.style.backgroundColor='';
			previous_length.onmouseenter = function(){};
			previous_length.onmouseleave = function(){};
		}
		lengthSub.onmouseenter = function (){};
		lengthSub.onmouseleave = function (){};
		lengthSelected = false;
	}
	lengthSub.style.backgroundColor = '';
	creatorSub.style.backgroundColor = '';
	notReverse = false;
}

function scrollBack(dropdown) {
   let subMenu = dropdown.getElementsByClassName('sub-menu');
   subMenu[0].scrollTop = 0;
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
// add_creators();