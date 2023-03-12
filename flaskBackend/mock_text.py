import requests
import json 

url = "https://gpt-summarization.p.rapidapi.com/summarize"

mock_text = '''For instance, if you're writing a business report or proposal, you could say:
“We are a global software company based in San Francisco. Our mission is to revolutionize how people manage their finances and pay their bills worldwide. Our customer base includes millions of individuals across more than 50 countries who use our products to keep track of their spending habits, set budgets, and make payments on time every month.
Our customers love our product because it allows them to easily see their financial history and make more informed decisions about their spending. However, due to issues with data quality management (DQM), some products have not been working properly for months at a time while we address this problem.
This issue has impacted our ability to complete new feature development; it's hard for us as developers or designers to work on new features when there are bugs that prevent users from using existing ones correctly."
This summary says a lot in just a few paragraphs. The reader knows who the company is, what they do, where they're based, and how many customers they have. We also learn about the company's problem and how it's impacting their business. All of this information is essential to understanding the context of the situation.
That's what an executive summary is all about—giving the reader a clear and concise overview of the situation so they can be fully informed before diving into the details.
Provide background information about your topic in a concise way
'''

mock_hash = {
  "hashtag": "#AirIndia",
  "hashtag_tweet_count": 100,
  "hashtag_tweets": [
    "Was the AC faulty in 787 Dreamliner? Why was the ACs not switched on. Once it flew ACs were back on. We did see a Ground Power Unit but why weren’t they used? Simply not acceptable. There were old ppl who were complaining as well! #AirIndia",
    "Retweet by @NewIndianXpress: \"A passenger on our flight AI130, operating London-Mumbai on March 10, was found smoking in the lavatory. Subsequently…",
    "Hello @AirAsiaIndia #AirIndia I recvd a call from your rep and they asked me to go to City office Bangalore. Can you please process a refund without an in person visit?",
    "US citizen allegedly smokes on Air India flight, misbehaves with passengers\n\n#AirIndia #Flights #passenger\n\nhttps://t.co/ZX88ET59y9",
    "Retweet by @MirrorNow: MID-AIR CHAOS ONBOARD AIR INDIA FLIGHT\nPassenger Smokes, Tries To Open Flight Door\n\nCase filed against a 37-year-old U.S cit…",
    "Retweet by @MirrorNow: PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the inc…",
    "A US citizen of Indian origin has been charged by Mumbai police for smoking in the toilet of an #AirIndia flight from London to Mumbai. He also misbehaved with co-passengers by abusing and trying to assault them. #aviationnews #flightsecurity",
    "US citizen causes mid-air chaos on an Air India flight. \n\nUnder the IPC and Aircraft Act, the accused faces charges for smoking in the bathroom and misbehaving with crew members. \n\n#AirIndia #MidAirChaos #SmokingOnBoard #InFlightBehavior https://t.co/TiTM6w0Gi2",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Be in the know - with our #newswrap of top 5 stories of the day | #SameSexMarriage #AirIndia #INDvAUS #ViratKohli𓃵 https://t.co/jdzS5cxLzs",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Retweet by @MirrorNow: PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the inc…",
    "Retweet by @MirrorNow: MID-AIR CHAOS ONBOARD AIR INDIA FLIGHT\nPassenger Smokes, Tries To Open Flight Door\n\nCase filed against a 37-year-old U.S cit…",
    "Crew members said the passenger was not ready to listen to us and was shouting and he was tied his hands and legs and made him sit on the seat\n#AirIndia #MumbaiLondonflights #London \n\nhttps://t.co/XuAVaimTAh",
    "Ppl listening about #SameSexMarriage\nIn #India 🤗 ..\n\n#INDvsAUS\n#IndVsAus2023 \n#INDvsAUS4thTEST \n#AirIndia \n#KochiCantBreathe \n#Kochicantbreath \n#TheGlory \n#streamerawards https://t.co/yvhYrCuKBt",
    "Retweet by @the_hindu: A passenger on board an #AirIndia flight to #Mumbai from #London was handed over to security personnel upon the flight's arr…",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Retweet by @sidd_sharma01: Hello, All the gorgeous girls, ladies &amp; handsome boys, gentlemen on the platform!!! Got this video from spouse on WA. Th…",
    "A passenger on board an #AirIndia flight to Mumbai from London was handed over to security personnel for allegedly smoking in the lavatory and unruly behaviour. \n\nhttps://t.co/UjFPUBGarQ",
    "Kochi - Air India cabin crew Shafi, a native of Wayanad, was arrested at Kochi Airport for smuggling 1,487 gms of gold. The cabin crew was of Bahrain-Kozhikode-Kochi service. Further interrogation underway: Customs. #Kerala #smuggling #AirIndia https://t.co/EgHxnzLutl",
    "@airindiain they don’t refund even after2yrs.Not sure if they will pay your salary on time? .customer service sucks &amp; doesn’t even qualify to be in the airline industry.Sad plight of affairs #refunddelay #Tata #AirIndian #AirIndiaRecruitment #cabincrewhiring #AirIndia #boringairlinesofindia",
    "A US national has been booked for smoking in the lavatory of a #London-#Mumbai #AirIndia flight and misbehaving with fellow passengers mid-air.\n\nImage for representation https://t.co/SnPo98XaRJ",
    "\"A passenger on our flight AI130, operating London-Mumbai on March 10, was found smoking in the lavatory. Subsequently he behaved in an unruly and aggressive manner, despite repeated warnings,\" #AirIndia said.\nhttps://t.co/3cChl2hoQL",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "A US citizen of Indian origin has been charged by Mumbai police for smoking in the toilet of an #AirIndia flight from London to Mumbai. He also misbehaved with co-passengers by abusing and trying to assault them. \n\n#news #NRR",
    "US-NRI booked for smoking, rowdiness on Air India London-Mumbai flight https://t.co/1VeYmtjDxh\n\n#AirIndia #London #UK #Mumbai #India #Flight #US #NRI #Booked #Smoking #Rowdiness #MumbaiPolice #RatnakarTrivedi @airindiain @MumbaiPolice",
    "Retweet by @MirrorNow: PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the inc…",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "Retweet by @philbinu: Pilots and 2 aircraft types - the #AirIndia debate. Appears fine at first until you get to the details. @jagritichandra @the_…",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the incident of a passenger caught smoking onboard a London-Mumbai flight and then misbehaving with co-passengers. @Shivani703 reports https://t.co/stneX3bl2E",
    "#WorldNews | US national arrested for smoking, creating ruckus on #AirIndia  flight \n\nhttps://t.co/FCmufDvJlg",
    "Retweet by @MirrorNow: MID-AIR CHAOS ONBOARD AIR INDIA FLIGHT\nPassenger Smokes, Tries To Open Flight Door\n\nCase filed against a 37-year-old U.S cit…",
    "Wake Up, says celebrity chef #SanjeevKapoor as he tweets images of in-flight meal served by #AirIndia to express displeasure https://t.co/YktQLzbhdG \n#InFlightMeal #TrendingNow #WeRIndia \n\nImage Source - ABP News https://t.co/2pe1bzzQmY",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "‘Unruly, aggressive’: Man on London-Mumbai flight booked for smoking in toilet\n\nRead the full story here: https://t.co/MiC0HQU4Ww\n\n#jaanojunction #airindia #flight",
    "Retweet by @sidd_sharma01: Hello, All the gorgeous girls, ladies &amp; handsome boys, gentlemen on the platform!!! Got this video from spouse on WA. Th…",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "\"Man Tries to Open Plane Door After Smoking Cigarette in Toilet on Air India Flight\" https://t.co/EcPCzZQNsL\n\n#AirIndia #smoking #plane #traveling #Trending #TrendingNews https://t.co/h8RhxOkXvG",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "Man misbehaves with #AirIndia crew member after getting caught smoking on London-Mumbai Flight, booked https://t.co/jeuweJTZeF",
    "#Retro #sarcastic #svg bundle Only 5$\n#SouthChinaSea #HunterBiden #Oscars2023 #Australia #SecreService #StopLandJihad #RamCharanBossingOscars #GOAT𓃵 #Banking #SVBCollapse #AirIndia #Oscars95 #MadhuriDixit #Pique #sarcastice #EPS #design \nhttps://t.co/35xi1RG1hS",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "Retweet by @MirrorNow: PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the inc…",
    "Retweet by @MirrorNow: MID-AIR CHAOS ONBOARD AIR INDIA FLIGHT\nPassenger Smokes, Tries To Open Flight Door\n\nCase filed against a 37-year-old U.S cit…",
    "Retweet by @GuptaKaustuva: #smoking\nThe American citizen was accused of smoking in the plane's lavatory and misbehaving with fellow passengers.\nThe…",
    "Retweet by @GuptaKaustuva: #smoking\nThe American citizen was accused of smoking in the plane's lavatory and misbehaving with fellow passengers.\nThe…",
    "Retweet by @GuptaKaustuva: #smoking\nThe American citizen was accused of smoking in the plane's lavatory and misbehaving with fellow passengers.\nThe…",
    "Retweet by @GuptaKaustuva: #smoking\nThe American citizen was accused of smoking in the plane's lavatory and misbehaving with fellow passengers.\nThe…",
    "A passenger on board an #AirIndia flight to #Mumbai from #London was handed over to security personnel upon the flight's arrival in Mumbai, for allegedly smoking in the lavatory and unruly behaviour, the airline said on March 12.\nhttps://t.co/eWKdVdkXfv",
    "US-NRI booked for smoking, rowdiness on AI London-Mumbai flight \n\n #AirIndia #London #Mumbai\n\nhttps://t.co/PcyinR78lq",
    "#Mumbai's Sahar #Police booked an Indian-origin US citizen for allegedly smoking inside the lavatory of #AirIndia London-Mumbai flight on March 11.\n\nhttps://t.co/9ekCL8AoJ6",
    "A case has been registered against a US citizen for allegedly smoking in the bathroom and misbehaving with other passengers on @airindiain\n London-Mumbai flight said Mumbai Police on Sunday.\n#AirIndia \n@airindiain https://t.co/Phf5Oa9jHb",
    "A passenger on board an Air India flight to Mumbai from London was handed over to security personnel for allegedly smoking in the lavatory.\n\n#AirIndia #passengerflight #flights #unrulybehaviour @airindiain\n\nhttps://t.co/CRefL0Irj9",
    "Hello, All the gorgeous girls, ladies &amp; handsome boys, gentlemen on the platform!!! Got this video from spouse on WA. Thought it’s incredible and worth sharing with my TW friends!!! Have a peek at it!!!\n\n#तेजस्वी_नहीं_झुकेगा #Hindenburg #AirIndia #भाजपा_हटाओ_देश_बचाओ… https://t.co/9LUfExyMbg https://t.co/VKUauhpV8x",
    "A case has been registered against a US citizen for allegedly smoking in the bathroom and misbehaving with other passengers on @airindiain  London-Mumbai flight, said Mumbai Police on Sunday.\n#AirIndia @airindiain https://t.co/JkyxBmBbdU",
    "Retweet by @MirrorNow: MID-AIR CHAOS ONBOARD AIR INDIA FLIGHT\nPassenger Smokes, Tries To Open Flight Door\n\nCase filed against a 37-year-old U.S cit…",
    "Air India Takes Note of Passenger Who Smoked Inside Lavatory on Flight, Reiterates Its Zero Tolerance Policy\nhttps://t.co/Xg2PSgJ9Lh\n#AirIndia #Passenger #Smoking #Lavatory #ZeroTolerance #Policy @airindiain",
    "Hello, All the gorgeous girls, ladies &amp; boys, gentlemen on the platform!!! Got this video from spouse on WA. Thought it’s incredible and worth sharing with my TW friends!!! Have a peek at it!!!\n\n#तेजस्वी_नहीं_झुकेगा #Hindenburg #AirIndia #भाजपा_हटाओ_देश_बचाओ #ViratKohli𓃵… https://t.co/Xp86D6vnVo https://t.co/jx0xt5XeLE",
    "Retweet by @MirrorNow: PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the inc…",
    "In yet another case of mid-air unruly behaviour, a #US citizen has been booked for allegedly smoking in the bathroom and misbehaving with other passengers on #AirIndia London-Mumbai flight.\n\n#india #London #Mumbai #uk #aviation #AvGeek #avgeeks #flights https://t.co/NQ7WLc5UlC",
    "London-Mumbai Air India flight passenger handed over to cops for smoking in aircraft lavatory, unruly behaviour #AirIndiaFlight #Mumbai #London #SecurityPersonnel #DGCA #AirIndia #TataGroup https://t.co/5WLEo9cMl5",
    "Retweet by @UpdatesJunction: US citizen identified as 37-year-old Ramakant, coming from London caught smoking in the bathroom and misbehaving with…",
    "US citizen identified as 37-year-old Ramakant, coming from London caught smoking in the bathroom and misbehaving with other passengers on Air India Mumbai-London flight on March 11.\n\n#airport #AirIndia #ENGvFRA #S04BVB #ViratKohli𓃵 #Temblor \n\nhttps://t.co/u3gXn5TSSg",
    "A case has been registered against a US citizen for allegedly smoking in the bathroom and misbehaving with other passengers on @airindiain  London-Mumbai flight, said Mumbai Police on Sunday.\n#AirIndia @airindiain https://t.co/8Nd7kEZphA",
    "Retweet by @IndiaToday: A US national has been booked for #smoking in the lavatory of a London-Mumbai #AirIndia flight and misbehaving with fellow…",
    "Article summary: https://t.co/2C28KPAKER (I'm a bot)\n\n#London #Mumbai #AirIndia #Staten #Section144 https://t.co/5Jl7dtLCaC",
    "Indian-origin man booked for smoking onboard #London-#Mumbai #AirIndia flight, case registered\n\nhttps://t.co/lDBDa2pzAz",
    "timesofindia: #AirIndia hands over unruly flyer who smoked on London-Mumbai flight to cops https://t.co/2rowMbhdeT",
    "#smoking\nThe American citizen was accused of smoking in the plane's lavatory and misbehaving with fellow passengers.\nThe incident took place on an #AirIndia flight. This incident took place on Air India's London-Mumbai flight. A complaint was filed against 37-year-old #Ramakant https://t.co/Un9rFTlHzi",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @TataCompanies: #DYK #AirIndia became the first Asian airline to enter the jet age in 1960 with the Boeing 707 joining its fleet?\n\nDive…",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @ETNOWlive: US citizen caught smoking in Air India London-Mumbai flight, trying to open door; case registered\n\n#AirIndia #US #London #Mu…",
    "Retweet by @indujalali: This is what a Muslim Journalist has to say about we HINDUS and mind U, even after abusing us openly, she is enjoying her L…",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "PASSENGER SMOKES, MISBEHAVES WITH CREW\nAir India: Zero Tolerance For Unsafe Behaviour\n\n#AirIndia issues statement on the incident of a passenger caught smoking onboard a London-Mumbai flight and then misbehaving with co-passengers. https://t.co/g9LS0iIfzW",
    "US citizen caught smoking in Air India London-Mumbai flight, trying to open door; case registered\n\n#AirIndia #US #London #Mumbai \nhttps://t.co/8whOHS0DeU",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "timesofindia: #AirIndia hands over unruly flyer who smoked on London-Mumbai flight to cops https://t.co/JFDTRKkSrf",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "@airindiain Thank you; shared the details as a DM. Look fwd to your response and action #airindia #lostandfound",
    "Retweet by @republic: #BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #D…",
    "#BREAKING | Lout onboard Air India London-Mumbai flight; DGCI takes cognizance, accused handed over to security\n\n#AirIndia #DGCI #London #Mumbai\n\nTune in to watch - https://t.co/ge3J2OVybC https://t.co/6HvvrbNo8S",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "#AirIndia has taken note of alleged #smoking by a passenger in the lavatory and subsequently misbehaving with fellow passengers on its #London-Mumbai flight. The 37-year-old has been booked by #Mumbai's Sahar #Police Station for his causing inconvenience mid-flight on March 11. https://t.co/f2RvaPUhd8",
    "On 13/10/2021, I have predicted that if Ratan Tata take over Air\nIndia, the company will survive \n\nSo history will repeat itself and SVB will rock again.\n #ratantata #airindia #elonmusk #numerology #china #usa #japan #india\n#beijing #russia #shanghai #hongkong #korea #europe https://t.co/0F6dQKA0Pq",
    "Retweet by @IndiaToday: A US national has been booked for #smoking in the lavatory of a London-Mumbai #AirIndia flight and misbehaving with fellow…",
    "A US national has been booked for #smoking in the lavatory of a London-Mumbai #AirIndia flight and misbehaving with fellow passengers mid-air.\nhttps://t.co/eRop5MCgSd",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @ani_digital: Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.…",
    "Retweet by @timesofindia: #AirIndia hands over unruly flyer who smoked on London-Mumbai flight to cops https://t.co/VH3eHjVu2a",
    "Air India takes note of passenger who smoked on flight, reiterates its zero tolerance policy\n\nRead @ANI Story | https://t.co/zp6Ik9i2KB\n#AirIndia https://t.co/32jB1OtPwl"
  ],
  "neg": 38,
  "neu": 57,
  "pos": 4,
  "summary": "US citizen allegedly smokes on Air India flight, misbehaves with passengers. Was the AC faulty in 787 Dreamliner? Why was the ACs not switched on. Once it flew ACs were back on. Simply not acceptable.",
  "time_stamp": "12/03/2023 19:00:57"
}

payload = {"text": mock_text, "num_sentences": 3}
payload = json.dumps(payload)

headers = {
    'x-rapidapi-host': "gpt-summarization.p.rapidapi.com",
    'x-rapidapi-key': "09e55aafc1msh97c57454acd7d8ep1ccfe5jsn481563514132",
    'content-type': "application/json"
}

def summarizer():

    response = requests.request("POST", url, data=payload, headers=headers)
    return response.text


