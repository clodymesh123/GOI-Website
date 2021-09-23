from bs4 import BeautifulSoup

with open('Getting Over It Custom Maps.html') as inf:
	txt = inf.read()
	soup = BeautifulSoup(txt, 'html.parser')
inf.close()

with open('Backup.html', 'w') as bk:
	bk.write(soup.prettify())
bk.close()

def embed(link):
	if '?t' in link: link = link.replace('?t', '?start')
	embeded = link.replace('watch?v=','embed/')
	if link == embeded: embeded = link.replace('youtu.be', 'youtube.com/embed')
	return embeded

def unembed(link):
	return link.replace('embed/','watch?v=')

def add_new_map():#mapName,creator,length,gdlink,link=''):
	print('\n\n***** ADD A NEW MAP *****\n\n(Enter "q" to Quit)')
	mapName = input('Map the New Map\'s Name: ')
	if mapName == 'q': return
	creator = input(f'Creator of {mapName}: ')
	if creator == 'q': return
	length = input(f'Length of {mapName}: ')
	if length == 'q': return
	link = input('Video Showcase: ').rstrip('&t')
	if link == 'q': return
	gdlink = input('Drive Link: ')
	if gdlink == 'q': return

	if link=='':
		embedyt = 'images/noVideo.png'
	else:
		embedyt = embed(link)

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

def update_map_info():
	Maps = soup.find_all('article')
	while True:
		print('\n\n***** UPDATE MAP INFO *****\n\n(Enter "q" to Quit)')
		mapName = input('\nEnter Map Name: ')
		# while True:
		if mapName.lower() == 'q': break
		for single_map in Maps:
			map_name_info = single_map.a.get_text().strip()
			# print([mapName.lower()])
			# print(map_name_info.split())
			if mapName.lower() in map_name_info.lower().split() or mapName.lower() == map_name_info.lower():
				# print(map_name_info)
				spans = single_map.p.find_all('span')
				mapCreator = spans[0].get_text().strip()
				mapLength = spans[1].get_text().strip()
				embedLink = unembed(single_map.embed['src'])
				driveLink = single_map.a['href']
				print(f'\nInfo about "{map_name_info}":-\n\n1) Map Name: {map_name_info}\n2) Creator: {mapCreator}\n3) Length: {mapLength}\n4) Video: {embedLink}\n5) Drive: {driveLink}')
				print('\nChoose an option from the above, to update it (Enter 1/2/3/4). Enter "q" to exit.')
				while True:
					print(f'\n<<<<< Updating "{map_name_info}" Map\'s Info >>>>>\n')
					change_info = input('Select an Option ("q" to exit): ')
					# print(change_info)
					if change_info == '1':
						new_name = input("__ Change Map's Name  __\nNew Name: ") 
						single_map.a.string = new_name
						print("Changed the Map's Name to "+new_name)
					elif change_info == '2':
						new_creator_name = input('__ Change Map Creator Name __\nEnter the Name: ')
						spans[0].string = new_creator_name
						print("Changed creator's name to: "+new_creator_name)
					elif change_info == '3':
						new_length = input('__ Change Map Length __\nEnter the Length: ')
						spans[1].string = new_length
						print("Changed Map's length to: "+new_length)
					elif change_info == '4':
						new_ytlink = input('__ Change Video Showcase Link __\nEnter the new link: ')
						if new_ytlink=='':new_ytlink = 'images/noVideo.png'
						single_map.embed['src'] = embed(new_ytlink)
						print("Changed the YouTube link to: "+new_ytlink)
					elif change_info == '5':
						new_gdlink = input('__ Change Google Drive Link __\nEnter the new link: ')
						single_map.a['href'] = new_gdlink
						print("Changed the Drive's link to: "+new_gdlink)
					elif change_info.lower() == 'q': break
					else: print('INVALID OPTION.')
				break
		else: print('INVALID MAP!')

def delete_map():
	Maps = soup.find_all('article')
	while True:
		print('\n***** DELETE A MAP *****\n\n(Enter "q" to Quit)')
		mapName = input('\nEnter Map Name: ')
		# while True:
		if mapName.lower() == 'q': break
		for single_map in Maps:
			if single_map: map_name_info = single_map.a.get_text().strip()
			else: continue
			# print([mapName.lower()])
			# print(map_name_info.split())
			if mapName.lower() in map_name_info.lower().split():
				while True:
					sure = input(f'\nAre you sure you want to delete the map, "{map_name_info}"? (y/n):')
					if sure == 'y':
						single_map.decompose()
						print(f'!!!!! Successfully deleted the map, "{map_name_info}" !!!!!')
						break
					elif sure == 'n':
						print('Map Deletion Cancelled!')
						break
					else: print('Enter only "y" or "n"')
				break
		else: print('INVALID MAP!')



while True:
	print('\n\n********** GOI CUSTOM MAPS WEBSITE MANAGER **********\n')
	print('Choose from below ("q" to exit):\n1) Add a new Map\n2) Update Map\'s Info\n3) Delete a Map')
	choice = input('\nSelect an option (1 or 2 or 3): ')
	if choice == '1':
		add_new_map()
	elif choice == '2':
		update_map_info()
	elif choice == '3':
		delete_map()
	elif choice == 'q': break
	else: print('INVALID OPTION!') 
	

# print(newArticle.prettify(formatter=None))
newHTML = soup.prettify(formatter=None)

with open('Getting Over It Custom Maps.html', 'w') as outf:
	outf.write(newHTML)
outf.close()