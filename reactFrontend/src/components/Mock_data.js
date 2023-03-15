
let prev_mock_trends = {
  "#INDvsENG": {
    neg: 2,
    neu: 1,
    pos: 0,
    summary:
      'We sh… @IrfanPathan is this what u call a "GRACE",  It is such a shameless act that you are showing ur opponent that you gave up the game when u ask the crowd to support you? Jos Buttle saw how Pandya was monkey dancing. #INDvsENG #CricketTwitter #T20WorldCup #BoycottIPL.',
    tweets: [
      "What a fantastic innings by Virat!! #KingKohli",
      "This has to be the best chase I have seen in my life. Congratulations Virat and Team India. Enjoyed the match #KingKohli",
      "That shot against Haris Rauf has to be the shot of the tournament #KingKohli",
      "Thadomal wants 75% attendance",
    ],
  },
  England: {
    neg: 1,
    neu: 0,
    pos: 1,
    summary:
      "Tomori not going to the World Cup is everything that's wrong with the FA and England. Tomori won Serie A, been fantastic, bu… RT @AFCWimbledon:  “We’d like to extend our congratulations to our former loanee, @AaronRamsdale98, after he was…",
    tweets: [
      "Who would have thought that India would win the game #KingKohli",
      "Greatest batsman of all time for a reason #KingKohli",
      "Cometh the hour, Cometh the man, Hatsoff Virat, stellar performance #KingKohli",
      "Mamba Mentality batting performance, Thank you for the entertainment #KingKohli",
    ],
  },
  Pokemon: {
    summary:
      "The quality is a bit iffy since the episode just came out but heres a glimpse of the fight. RT @GameFreakUS: yeah you can fuck the pokémon in the new one RT @uzumakixoxo: @Pokemon. @Pokemon",
    pos: 0,
    neg: 2,
    neu: 1,
    tweets: [
      "Puryfying Salt gets rid of your Ghost weakness AND makes you immune to status.",
      "He's a Pokémon with 100/135/90 Defenses and Body Press with only ONE WEAKNESS.",
      "After 25 years, perpetual 10-year-old Ash Ketchum has finally become the world's greatest Pokémon trainer.",
    ],
  },
  Kherson: {
    summary:
      "Both flags are symbols that #UkraineWillWin. #StandWithUkraine. RT @MaxBoot: Wonderful to see the liberation of Kherson. The Russian retreat is a humiliating defeat for Putin. The Ukrainian Prosecutor General se… RT @michaelh992: Evidence of war crimes are already emerging in recently liberated areas of #KHerson.",
    pos: 2,
    neg: 1,
    neu: 0,
    tweets: [
      "Kherson liberation chronicles, from Ukrainian social media: When soldiers enter to clear a village that was occupied by Russia",
      "RT @WarMonitor3: Ukrainian army just reached the centre of Kherson city.",
      "RT @NOELreports: Remember the giant flag that was present the first days of the occupation in #K Herson? It is back.",
    ],
  },
};

let mock_trends = [
  {
    neg: 0,
    neu: 2,
    pos: 0,
    summary:
      `The Vande Bharat Express is one of the prestigious and modern trains run and managed by the Indian Railways. It is considered a semi-high speed train, which is the second fastest train in India, the first being the Gatimaan Express. Vande Bharat is also known as Train 18 and was inaugurated by the Prime Minister of India, Shri Narendra Modi in 2019. As of 2022, the Vande Bharat train runs only on 2 routes
      `,
    time_stamp: "25/02/2023 18:34:52",
    topic_name: "#Vande Bharat",
    topic_tweet_count: 437324,
    topic_tweets: [
      "Let’s count… How many coaches👇in Vande Bharat?",
      'How the railway rolling stock has evolved over the time.. ICF, LHB and the latest Vande Bharat at Sainagar Shirdi! ',
      `Everyone now takes Vande Bharat for granted For 50 years we were slogging it out in shitty trains, nobody cared Then this guy comes in. Builds it. 
      
      Gets pushed back by babus. Vigilance enquiry! 
      
      Then a new leader comes, pushes forward
      
      So many roadblocks. 
      
      It wasn't easy.`
    ],
  },
  {
    neg: 0,
    neu: 0,
    pos: 0,
    summary:
      "India's entry RRR is running in the Best Song nomination for Naatu Naatu, and all hopes are pinned on it. Ahead of that, Ram Charan delighted his fans in the US by having a small meet-and-greet with them. Fans thronged in large numbers to see him.RRR has received an Oscar nomination for Naatu Naatu in Best Original Song category.",
    time_stamp: "25/02/2023 18:34:54",
    topic_name: "#RamCharanBossingOscars",
    topic_tweet_count: 357722,
    topic_tweets: [
      "నేను ఇక్కడ కూర్చొని మాట్లాడడం కాదు. I Want to Give My Time to You & Meet You All Personally. I Will Come to Your Tables ❤️ @AlwaysRamCharan Anna Love for fans 🙏🏻🫶",
      "It was a festival for the fans in LA, USA🥳 The meet & greet of our @AlwaysRamCharan with the fans couldn't have been more amazing🤩",
      "Bossing India Wide at #5 🔥@TheAcademy #Oscars95 Red Carpet Will be Taken OveRRR by Royal StoRRRm of Mr. C in Few More Hours !!",
    ],
  },
  {
    neg: 0,
    neu: 0,
    pos: 2,
    summary:
      "A memorable picture with my inspiration &amp; soul of the @INCIndia Smt. Sonia Gandhi ji along with Former Minister my Sister Yashomati Thakur, MLA Praniti Shinde and Brother Gurd",
    time_stamp: "25/02/2023 18:34:55",
    topic_name: "#CongressVoiceOfIndia",
    topic_tweet_count: 43968,
    topic_tweets: [
      "A memorable picture with my inspiration &amp; soul of the @INCIndia Smt. Sonia Gandhi ji along with Former Minister my Sister Yashomati Thakur, MLA Praniti Shinde &amp; Brother Gurdeep Sappal \n\n#CongressVoiceOfIndia https://t.co/bRwEfaMjhm",
      '"I congratulate the congress party workers for the Yatra, the lakhs of people &amp; their enthusiasm for the Yatra &amp; I specially thank Shri Rahul Ji as his leadership was crucial for the Bharat Jodo Yatra"\n\n-Smt Sonia Gandhi Ji \n#CongressVoiceOfIndia https://t.co/qcbqmLmpTQ',
    ],
  },
  {
    neg: 0,
    neu: 0,
    pos: 2,
    summary:
      "You DON'T need to be a genius to learn coding -- All you need do is: 1. Learn HTML & CSS 2. Learn JavaScript 3. Learn ReactJS 4. Build an ePortfolio with 4-5 good projects 5. Apply for 100+ jobs daily",
    time_stamp: "25/02/2023 18:34:56",
    topic_name: "#SoftwareDeveloper",
    topic_tweet_count: 43075,
    topic_tweets: [
      "HTML: The Language That Thinks It's a Programmer",
      "Yay!!! I just completed my first HTML/CSS project. I created a personal website for myself using HTML, css, and  @getbootstrap. Now moving on to JavaScript ✈️",
      "Client never knows it all",
      "PO as a software developer : If you must be referred to as a world class dev, your process to things must be well developed.",
      "Azure Clouding is the most important thing you can learn as a software developer."
    ],
  },
  {
    neg: 2,
    neu: 0,
    pos: 0,
    summary:
      "No, the British Empire did not spontaneously end slavery.  Credit for that goes to several generations of slave revolts—including the successful Dandi March and sustained pressure from radical social movements pushing for abolition.",
    time_stamp: "25/02/2023 18:34:57",
    topic_name:
      "#ब्रिटिश साम्राज्य",
    topic_tweet_count: 36875,
    topic_tweets: [
      "डियर #RavishKumar का यूट्यूब से पैगाम. ◆तानाशाही के दौर में लाखों खर्च कर पत्रकार बने पत्रकारों को दलाली करनी पड़ती है| ◆गोदी मीडिया की गुलामी से हमें लड़ना है!आप ब्रिटिश साम्राज्य को घूटनो पे लाये थे, मुझे यकीन है इस गुलामी से भी एक दिन बाहर आएंगे।",
      "वर्ष 1930 में आज के ही दिन साबरमती आश्रम से दांडी मार्च यात्रा प्रारम्भ हुआ था जिसने भारतीय स्वाधीनता आंदोलन को एक नई दिशा व ऊर्जा प्रदान की थी। ब्रिटिश साम्राज्य की बुनियाद को हिला देने वाले ऐतिहासिक 'दांडी मार्च' के समस्त सत्याग्रहियों को कोटि कोटि नमन।",
      "No, the British Empire didn't just make mistakes, with a few massacres here and there. They committed genocide on several continents, orchestrated famines that killed tens of millions of people, and led a human trafficking cartel for 200 years. The violence was systematic.",
    ],
  },
];

let mock_thread = {
  thread_tweets: [
    "1. @lexdotpage\n\nUnlock your best writing with Lex.\nAny time you don’t know how to continue your text, type +++ and Lex continues for you.\n\nIt also helps generate titles for your texts! https://t.co/NFfsKeD3ut",
    "2. @runwayml\n\nRunway is the content creation suite from the future. It has magical AI tools like:\n- change images with text descriptions\n- remove objects in videos\n- remove video backgrounds\n- expand images with descriptions (as seen in the video)\n+++ https://t.co/tryhlnGgPg",
    "3. @diffusionbee\n\nDiffusionBee is a free macOS app for Stable Diffusion. Give it a text prompt, and it generates a picture based on your text. https://t.co/J49XXoHIRW",
    "4. @LexicaArt\n\nProviding prompts for text-to-image solutions is an art.\n\nLexicaArt is a Stable Diffusion search engine that shows prompts others have used to generate images.\n\nYou can also see variations of a prompt. https://t.co/MLujBB7SnC",
    "5. @metaphorsystems\n\nMetaphor is a new search engine based on generative AI.\n\nYou prompt it by writing a phrase that looks like it could end with a link. https://t.co/14uoTGyJBP",
    "6. @SoundrawUS\n\nDo you need some unique music for your podcast or video? Soundraw is a music generator for creators.\n\nSelect the type of music you want - genre, instruments, mood, length, etc - and let their AI generate beautiful songs and variants for you. https://t.co/PVZ6FZKF2E",
    "7. @clipdropapp\n\nRelight your existing photos &amp; drawings with ClipDrop Relight.\n\nRelighting a picture after it is captured is possible thanks to their custom AI that maps depth into your pictures. https://t.co/mv6cAV0Xb2",
    "8. Talk to books\n\nGet quotes from more than 100 000 books that respond to your question.\n\nA creativity tool by Google to explore new ideas and get relevant quotes.\n\nhttps://t.co/miy0A4IyWI https://t.co/6Dta8unQyg",
    "I hope you've found this thread helpful.\n\nFollow me @mhauken for more. I tweet weekly about productivity and design.\n\nLike/Retweet the first tweet below if you can: https://t.co/zg9utP5lt0",
    "If you liked this, you'd enjoy my infrequent newsletter, delivering simple, actionable productivity tips in your inbox!\n\nJoin here:\nhttps://t.co/GAqzTMncMM",
  ],
  reply_tweets: [
    "Part of your year in review that was a sneaky top performer: identify and minimize the boat anchors. Really valuable exercise for me.",
    "Straight facts 👌",
    "Sometime saving yourself from relationships is the only way to save yourself.❤️",
    "Removed them like Joel got rid of his memories of Clementine.😁",
    "Even if they're family, you can't let that be the reason they're allowed to bring you down 😅",
    "What's funny is the people who are the hardest to get rid off often provide the greatest relief from",
    "This is the simplest solution, but it feels difficult.",
    "Your physical circle of influence is of the same importance as your social circle ",
    "Thanks! This made my day! 😄 I always try to make it actionable and actually useful!",
  ],
  username: "Sacheil Bloom",
  profile_image_url:
    "https://images.generated.photos/zDm6WNAATR2-bOBf0_qcZ0vJ2q1e1K1vvXERSxqgrH0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDMyMDA2LmpwZw.jpg",
  references: {
    images: [
      "https://pbs.twimg.com/media/Fq4gg0hX0AEdyyM?format=jpg&name=900x900",
      "https://th.bing.com/th?id=OIP.UYV_bihup-y039M8_Dk0KQHaFP&w=297&h=210&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      "https://th.bing.com/th/id/OIP._5g8Ec7fLoLES3CYUp1evQHaJ4?w=140&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th?id=OIP.kdmpPmRlzz-u8Zf8r3LSvwHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      "https://th.bing.com/th?id=OIP.k-q_vJLFJ7uccPEkmFh2SgHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    ],
    urls: [
      "https://t.co/GAqzTMncMM",
      "https://t.co/zg9utP5lt0",
      "https://t.co/miy0A4IyWI",
      "https://t.co/6Dta8unQyg",
      "https://t.co/mv6cAV0Xb2",
      "https://t.co/PVZ6FZKF2E",
      "https://t.co/14uoTGyJBP",
      "https://t.co/MLujBB7SnC",
      "https://t.co/J49XXoHIRW",
      "https://t.co/tryhlnGgPg",
      "https://t.co/NFfsKeD3ut",
    ],
  },
  thread_summary:
    "Sacheil shares some of his life idealogies. Remove people who make you feel bad, both in the physical and digital worlds. Unfollow, mute, or block to improve happiness and avoid overcomplication.A good life is about subtraction as much as it is about addition.While it's important to surround ourselves with positivity, completely cutting out people from our lives may not always be feasible. Instead, we can try to focus on setting boundaries and limiting interactions with those who negatively impact us.",
  thread_sentiment: { pos: 8, neg: 0, neu: 2 },
};

let mock_user_details = {
  payload: [
    {
      count: 3,
      month: "Oct",
      title: "Oct,'22",
      week: 41,
      year: 2022,
    },
    {
      count: 1,
      month: "Nov",
      title: "",
      week: 44,
      year: 2022,
    },
    {
      count: 2,
      month: "Nov",
      title: "Nov,'22",
      week: 45,
      year: 2022,
    },
    {
      count: 4,
      month: "Nov",
      title: "",
      week: 47,
      year: 2022,
    },
    {
      count: 3,
      month: "Nov",
      title: "",
      week: 48,
      year: 2022,
    },
    {
      count: 1,
      month: "Dec",
      title: "Dec,'22",
      week: 48,
      year: 2022,
    },
    {
      count: 2,
      month: "Dec",
      title: "",
      week: 49,
      year: 2022,
    },
    {
      count: 2,
      month: "Jan",
      title: "Jan,'23",
      week: 1,
      year: 2023,
    },
    {
      count: 1,
      month: "Jan",
      title: "",
      week: 2,
      year: 2023,
    },
    {
      count: 1,
      month: "Feb",
      title: "Feb,'23",
      week: 6,
      year: 2023,
    },
  ],
  created_at: "Nov, 2018",
  description:
    "DevRel manager @CivoCloud, Founder@WeMakeDevs, YouTuber (300k+) CNCF Ambassador, GitHub Star",
  followers_count: "2.5K",
  mention_tweets: [
    "You're the average of the people you surround yourself with. Follow the right people on Twitter.",
    "One of the threads you must read today: Wish more successful people shared raw truths and lessons we can learn from, what you remember are a person's stories, not random data and statistics (which are mostly individual and mostly useless)",
    "Honestly one of my favourite threads so far.",
    "Love this method and framework",
    "What a relief it is to recognize that.",
  ],
  neg_count: "2",
  neutral_count: "4",
  pos_count: "6",
  profile_image_url:
   "https://images.generated.photos/kEtyIuts_R7fqTwr6dHBpwY3mMm-3GwWrw7xq51A_VI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzQ2ODAxLmpwZw.jpg",
  sentiments: {
    Sentiment: { 0: "pos", 1: "pos", 2: "neg", 3: "neutral", 4: "neg", 5: "pos", 6:"pos", 7:"pos", 8:"pos", 9:"neutral" },
    Tweet: {
      0: " Most of your friends aren’t really your friends. They’re just along for the ride when it’s fun or convenient. Your real friends are there for you when you have nothing to offer.",
      1: "You don't need to have an opinion on everything. It's perfectly reasonable to have no opinion on something that you haven't researched or don't understand.",
      2: "You can get pretty damn far in life by just saying what you're going to do and then doing it. No fancy hack needed.",
      3: "Most of us need fewer friends and more intellectual sparring partners. Friends are easy to come by, but intellectual sparring partners question our assumptions and force us to level up.",
      4: "Most of the people you look up to and admire are remarkably unremarkable. Their success is not due to some intrinsic difference, but some stellar combination of effort and luck.",
      5: "Failure doesn't always lead to growth. Sometimes failure just leads to pain. Sometimes the growth doesn't come from the failure, but from simply outlasting the darkness.",
      6: "For the first time in my life I don’t have my next 6 months planned. For the first time I feel like I can escape the matrix. For the first time I feel confident even without knowing my next move. Feels surreal.",
      7: "They say Twitter is not a place but I met 90% of my close tech friends on Twitter. We had no mentor, just online resources, Twitter and a WhatsApp group to help each other out when stuck. Today, everyone of them earns in tech, some with more than one job. Junior Devs  >>>>>> 😂",
      8: "The failure of #SVB is likely to have a ripple effect on #Indian startups, many of which have significant amounts of funds deposited with the bank. It will also dent the #fundraising ability of Indian #startups as the US-based bank was a key source of funding for #tech startups.",
      9: "It’s my 7th year in tech & I’m  a software Engineer who’s also enthusiastic about UX Design & Data Science, you possibly use or have used one of the products I’ve built😎.",
    },
  },
  username: "Jennifer Johnson",
};

let mock_tag_detail = {
  summary: `
  Per capita income has more than doubled to ₹1.97 lakh in around nine years.
  Indian economy has increased in size from being 10th to 5th largest in the world in the past nine years.
  EPFO membership has more than doubled to 27 crore.
  7,400 crore digital payments of ₹126 lakh crore has taken place through UPI in 2022.
  11.7 crore household toilets constructed under Swachh Bharat Mission.
  9.6 crore LPG connections provided under Ujjwala.
  220 crore covid vaccination of 102 crore persons.
  47.8 crore PM Jan Dhan bank accounts.
  Insurance cover for 44.6 crore persons under PM Suraksha Bima and PM Jeevan Jyoti Yojana.
  Cash transfer of ₹2.2 lakh crore to over 11.4 crore farmers under PM Kisan Samman Nidhi.
  Seven priorities of the budget ‘Saptarishi’ are inclusive development, reaching the last mile, infrastructure and investment, unleashing the potential, green growth, youth power and financial sector.

  Atmanirbhar Clean Plant Program with an outlay of ₹2200 crore to be launched to boost availability of disease-free, quality planting material for high value horticultural crops.
  157 new nursing colleges to be established in co-location with the existing 157 medical colleges established since 2014.

· Centre to recruit 38,800 teachers and support staff for the 740 Eklavya Model Residential Schools, serving 3.5 lakh tribal students over the next three years.

· Outlay for PM Awas Yojana is being enhanced by 66% to over Rs. 79,000 crore.

· Capital outlay of Rs. 2.40 lakh crore has been provided for the Railways, which is the highest ever outlay and about nine times the outlay made in 2013-14.

· Urban Infrastructure Development Fund (UIDF) will be established through use of priority Sector Lending shortfall, which will be managed by the national Housing Bank, and will be used by public agencies to create urban infrastructure in Tier 2 and Tier 3 cities.

  Entity DigiLocker to be setup for use by MSMEs, large business and charitable trusts to store and share documents online securely.
  100 labs to be setup for 5G services based application development to realize a new range of opportunities, business models, and employment potential. 

· 500 new ‘waste to wealth’ plants under GOBARdhan (Galvanizing Organic Bio-Agro Resources Dhan) scheme to be established for promoting circular economy at total investment of Rs 10,000 crore. 5 per cent compressed biogas mandate to be introduced for all organizations marketing natural and bio gas.

· Centre to facilitate one crore farmers to adopt natural farming over the next three years. For this, 10,000 Bio-Input Resource Centres to be set-up, creating a national-level distributed micro-fertilizer and pesticide manufacturing network.`,
};

let mock_tweets = [
  "Most of your friends aren’t really your friends. They’re just along for the ride when it’s fun or convenient. Your real friends are there for you when you have nothing to offer.",
  "You don't need to have an opinion on everything. It's perfectly reasonable to have no opinion on something that you haven't researched or don't understand.",
  "You can get pretty damn far in life by just saying what you're going to do and then doing it. No fancy hack needed.",
  "Most of us need fewer friends and more intellectual sparring partners. Friends are easy to come by, but intellectual sparring partners question our assumptions and force us to level up.",
  "Most of the people you look up to and admire are remarkably unremarkable. Their success is not due to some intrinsic difference, but some stellar combination of effort and luck.",
  "Failure doesn't always lead to growth. Sometimes failure just leads to pain. Sometimes the growth doesn't come from the failure, but from simply outlasting the darkness.",
  "For the first time in my life I don’t have my next 6 months planned. For the first time I feel like I can escape the matrix. For the first time I feel confident even without knowing my next move. Feels surreal.",
  "They say Twitter is not a place but I met 90% of my close tech friends on Twitter. We had no mentor, just online resources, Twitter and a WhatsApp group to help each other out when stuck. Today, everyone of them earns in tech, some with more than one job.😂"
]

let mock_topics = ['Software', 'Politics', "Entertainment", 'Health', 'Blockchain', 'DSA', 'Competitive Programming']


export { mock_trends, mock_thread, mock_user_details, mock_tag_detail, mock_tweets, mock_topics };
