from bs4 import BeautifulSoup

with open('Getting Over It Custom Maps.html') as inf:
	txt = inf.read()
	soup = BeautifulSoup(txt, 'html.parser')
inf.close()

mapName = input('Map Name: ')
creator = input('Creator: ')
length = input('Length: ')

link = input('Video Showcase: ').rstrip('&t')
gdlink = input('Drive Link: ')

def add_new_map(mapName,creator,length,gdlink,link=''):
	if link=='':
		embedyt = 'images/noVideo.png'
	else:
		if '?t' in link: link = link.replace('?t', '?start')
		embedyt = link.replace('watch?v=','embed/')
		if link == embedyt: embedyt = link.replace('youtu.be', 'youtube.com/embed')


	mainTag = soup.main
	newArticle = soup.new_tag('article')

	newDiv = soup.new_tag('div')
	newArticle.append(newDiv)
	newEmbed = soup.new_tag('embed', src=embedyt)
	newDiv.append(newEmbed)

	newH2 = soup.new_tag('h2', title='Download '+mapName)
	newAnch = soup.new_tag('a', href=gdlink, target='_blank')
	newAnch.append(mapName)
	newH2.append(newAnch)

	newP = soup.new_tag('p')
	newB1 = soup.new_tag('b')
	newB1.append('Creator:')
	newP.append(newB1)
	# newP.append('&ensp;')
	newSpan1 = soup.new_tag('span')
	newSpan1.append(creator)
	newP.append(newSpan1)
	newP.append(soup.new_tag('br'))
	newB2 = soup.new_tag('b')
	newB2.append('Length:')
	newP.append(newB2)
	# newP.append('&ensp;')
	newSpan2 = soup.new_tag('span')
	newSpan2.append(length)
	newP.append(newSpan2)


	newArticle.append(newDiv)
	newArticle.append(newH2)
	newArticle.append(newP)

	mainTag.append(newArticle)

add_new_map(mapName,creator,length,gdlink,link)

# print(newArticle.prettify(formatter=None))
newHTML = soup.prettify(formatter=None)

with open('Added Article.html', 'w') as outf:
	outf.write(newHTML)
outf.close()