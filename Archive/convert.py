from bs4 import BeautifulSoup

with open('Getting Over It Custom Maps.html') as inf:
	txt = inf.read()
	soup = BeautifulSoup(txt, 'html.parser')

articles = soup.find_all('article')

ytlink = creator = length = ''

for article in articles:
	divtag = article.div
	anch = ''
	if divtag:
		spans = article.find_all('span')
		creator = spans[0].get_text()
		length = spans[1].get_text()

	else:
		mapname = article.h2.a.string
		article.h2['title'] = 'Download '+mapname
		anch = article.p.a
		para = article.p.get_text()
		creator = para[para.index(': ')+2:para.index('\n')]
		# print(creator)
		length = para[para.index('h:')+2:para.index('\n',para.index('h:'))]
		if anch:
			ytlink = anch['href'].rstrip('&t')
			if '?t' in ytlink: ytlink = ytlink.replace('?t', '?start')
			embedyt = ytlink.replace('watch?v=','embed/')
			if ytlink == embedyt: embedyt = ytlink.replace('youtu.be', 'youtube.com/embed')
		newDivTag = soup.new_tag('div')
		if anch: newDivTag.append(soup.new_tag('embed', src=embedyt))
		else: newDivTag.append(soup.new_tag('embed', src='images/noVideo.png'))
		article.insert(0, newDivTag)
	article.p.clear()
	creatb = soup.new_tag('b')
	creatb.string = 'Creator:'
	article.p.append(creatb)
	article.p.append('&ensp;')
	creatsp = soup.new_tag('span')
	creatsp.string = creator
	article.p.append(creatsp)
	article.p.append(soup.new_tag('br'))
	lenb = soup.new_tag('b')
	lenb.string = 'Length:'
	article.p.append(lenb)
	article.p.append('&ensp;')
	lensp = soup.new_tag('span')
	lensp.string = length
	article.p.append(lensp)
	


# para = soup.find_all('article')[3].p.get_text()
# creator = para[para.index(': ')+2:para.index('\n')]
# length = para[para.index('h:')+2:para.index('\n',para.index('h:'))]
newHTML = soup.prettify(formatter=None)

with open('Getting Over It Custom Maps.html', 'w') as outf:
	outf.write(newHTML)
# print(creator)
# print(length)