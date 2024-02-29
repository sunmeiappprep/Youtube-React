// LoginPage.jsx
import React, { useState,useEffect } from 'react';
import { postVideo,getUserVideos,updateVideo,deleteVideo,getVideo, fetchVideos } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext'; 
import { createComment,getComments,deleteComment, updateComment } from '../../utils/commentUtils';
import { loginUser,logOut } from '../../utils/authUtils';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user,token,setUser, setToken } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  
  console.log(user, token);


  const arr =    [
    {
        "title": "RESCENE(리센느) ‘YoYo’ MV",
        "search": "uDYy2UyO1X4",
        "ariaLabel": "1,738 views 17 minutes ago 1 minute, 48 seconds",
        "view": "1,738"
    },
    {
        "title": "Why Kuma Might Have Been The Strongest Character In One Piece",
        "search": "_LKXevv_DDI",
        "ariaLabel": "244,447 views 3 months ago 16 minutes",
        "view": "244,447"
    },
    {
        "title": "My serve in crucial moments - The Short Kickserve",
        "search": "F4QnUpQybcg",
        "ariaLabel": "142,905 views 2 years ago 3 minutes, 58 seconds",
        "view": "142,905"
    },
    {
        "title": "[안방1열 직캠4K] 르세라핌 허윤진 'EASY' (LE SSERAFIM HUH YUNJIN FanCam) @SBS Inkigayo 240225",
        "search": "7GPyfvL6Atw",
        "ariaLabel": "35,734 views 3 days ago 3 minutes, 14 seconds",
        "view": "35,734"
    },
    {
        "title": "IU recording \"Love Wins All\" is PAINFUL to listen to.  | Vocal Coach Reaction",
        "search": "RJJGOhoDZo4",
        "ariaLabel": "130,268 views 3 weeks ago 33 minutes",
        "view": "130,268"
    },
    {
        "title": "Peter vs Medhi",
        "search": "IqDxnzGvk9w",
        "ariaLabel": "272 views 3 days ago 18 minutes",
        "view": "272"
    },
    {
        "title": "Why do A24 Films look like that?",
        "search": "Y4EFuZxEtNI",
        "ariaLabel": "1,755,853 views 2 weeks ago 10 minutes, 2 seconds",
        "view": "1,755,853"
    },
    {
        "title": "Shanks Reacts to Luffy Gear 5 (Nika) for the First Time | (English Sub)",
        "search": "0n4orIBGyek",
        "ariaLabel": "1,205,587 views 3 months ago 1 minute, 41 seconds",
        "view": "1,205,587"
    },
    {
        "title": "Tischtennis Bundesliga: Timo Boll vs Steffen Fetzner 1998 Der Kommentar von Jörg Roßkopf",
        "search": "ZUXMoBtGX2Q",
        "ariaLabel": "100,289 views 9 years ago 31 minutes",
        "view": "100,289"
    },
    {
        "title": "(4K) SWAN SONG | LE SSERAFIM HONGEUNCHAE focus cam by. zero | 240219 EASY SHOWCASE",
        "search": "pPMN0CbEEZI",
        "ariaLabel": "1,925 views 8 days ago 2 minutes, 28 seconds",
        "view": "1,925"
    },
    {
        "title": "Is Keens Steakhouse Worth The Hype? Revisiting NYC's Iconic Steakhouse",
        "search": "6HiYDFPashE",
        "ariaLabel": "8,201 views 3 hours ago 20 minutes",
        "view": "8,201"
    },
    {
        "title": "Mihawk Seraphim Vs Blackbeard: No Talk, Just Fight!",
        "search": "QbZwppXSGCg",
        "ariaLabel": "10,654 views 2 months ago 1 minute, 33 seconds",
        "view": "10,654"
    },
    {
        "title": "#tabletennis  WANG CHUQIN WON vs  LIM JONGHOON  TEAM BUSAN 2024.",
        "search": "N9oNRwzNZLc",
        "ariaLabel": "601 views 1 day ago 9 minutes, 47 seconds",
        "view": "601"
    },
    {
        "title": "240222 SMTOWN LIVE 2024 SMCU PALACE TOKYO | aespa - Spicy",
        "search": "33CiaF-Gul0",
        "ariaLabel": "21,558 views 6 days ago 3 minutes, 24 seconds",
        "view": "21,558"
    },
    {
        "title": "2024 Markham Championships - Ruoyan: 3-2 :Clark Cui",
        "search": "96AWWbDPZpM",
        "ariaLabel": "413 views 4 days ago 30 minutes",
        "view": "413"
    },
    {
        "title": "‘Perfect Night’ Stage Cam @ LE SSERAFIM COMEBACK SHOWCASE ‘EASY’",
        "search": "A5JkJFPzh74",
        "ariaLabel": "91,896 views 14 hours ago 2 minutes, 46 seconds",
        "view": "91,896"
    },
    {
        "title": "If THIS Was the Void Century, then I See How Joyboy LOST",
        "search": "XZECH3O-1wM",
        "ariaLabel": "977,676 views 1 year ago 29 minutes",
        "view": "977,676"
    },
    {
        "title": "Fang Bo vs Niwa Koki (Swedish Open 2017)",
        "search": "aTNitz30YrM",
        "ariaLabel": "13,152 views 6 years ago 7 minutes, 19 seconds",
        "view": "13,152"
    },
    {
        "title": "ITZY Airport Deaparture to Taipei @ ICN｜240217",
        "search": "-5Zc-vg2KO4",
        "ariaLabel": "4,878 views 12 days ago 2 minutes, 25 seconds",
        "view": "4,878"
    },
    {
        "title": "Final Fantasy IX - All Summons (Eidolons) [4K60FPS]",
        "search": "fQeJpBgX_s4",
        "ariaLabel": "222,109 views 4 years ago 10 minutes, 5 seconds",
        "view": "222,109"
    },
    {
        "title": "The Kingdom That Never Existed | One Piece | Clip | Netflix Anime",
        "search": "_PKEaqRwOdA",
        "ariaLabel": "30,949 views 17 hours ago 2 minutes, 5 seconds",
        "view": "30,949"
    },
    {
        "title": "아이브 안유진 IVE YUJIN  Milan Fashion Week 21 february 2024 show Fendi",
        "search": "6394rNYZe0k",
        "ariaLabel": "4,233 views 5 days ago 1 minute, 39 seconds",
        "view": "4,233"
    },
    {
        "title": "ITTF World Team Table Tennis Championships 2024 | China and France Warm-up and Preparations",
        "search": "JDvPnwvb4Q4",
        "ariaLabel": "56,824 views 3 days ago 6 minutes, 50 seconds",
        "view": "56,824"
    },
    {
        "title": "[UNFILTERED CAM]  LE SSERAFIM KAZUHA(카즈하) 'EASY' 4K | BE ORIGINAL",
        "search": "oZ88wHzh8LQ",
        "ariaLabel": "34,463 views 5 days ago 3 minutes, 6 seconds",
        "view": "34,463"
    },
    {
        "title": "Marco's Bankai ! - One Piece x Bleach ?",
        "search": "aVecwMKDqU0",
        "ariaLabel": "6,539,266 views 2 years ago 15 seconds",
        "view": "6,539,266"
    },
    {
        "title": "世界卓球2024団体戦 日本代表帰国記者会見",
        "search": "Y8iDbYEIygE",
        "ariaLabel": "68,565 views Streamed 2 days ago 3 hours, 55 minutes",
        "view": "68,565"
    },
    {
        "title": "New Jeans x Perfect Night - NewJeans x LE SSERAFIM [mashup by quop]",
        "search": "_dehZpiPiBU",
        "ariaLabel": "4,067 views 3 months ago 1 minute, 54 seconds",
        "view": "4,067"
    },
    {
        "title": "20240217 IVE - I AM [SHOW WHAT I HAVE in KL]",
        "search": "ImseJHe2MHA",
        "ariaLabel": "11,046 views 10 days ago 3 minutes",
        "view": "11,046"
    },
    {
        "title": "aespa x Happy Collections - Interview",
        "search": "ON2-a6vKG0c",
        "ariaLabel": "14,232 views 2 weeks ago 1 minute, 3 seconds",
        "view": "14,232"
    },
    {
        "title": "正式官宣！36岁张继科新身份华丽升级，不输樊振东，球迷欢呼叫好",
        "search": "N99GZ30ZV1U",
        "ariaLabel": "1,588 views 5 days ago 3 minutes, 45 seconds",
        "view": "1,588"
    },
    {
        "title": "[Live Clip] 이서 (IVE) - MAY LILY (언니, 이번 생엔 내가 왕비야)",
        "search": "dJMf9L2mpEI",
        "ariaLabel": "223,722 views 2 days ago 3 minutes, 6 seconds",
        "view": "223,722"
    },
    {
        "title": "Ace vs Van Augur",
        "search": "4dvToJnX_Lw",
        "ariaLabel": "283,445 views 1 year ago 46 seconds",
        "view": "283,445"
    },
    {
        "title": "27 EARLY Game Tips You Must Know in FF7 Rebirth",
        "search": "6peyWCaZBYc",
        "ariaLabel": "14,029 views 8 hours ago 20 minutes",
        "view": "14,029"
    },
    {
        "title": "ITZY 2ND WORLD TOUR “BORN TO BE” in SEOUL - HIGHLIGHTS OF DAY 2 🎞",
        "search": "DdcfXuq9lgk",
        "ariaLabel": "112,727 views 3 days ago 1 minute, 43 seconds",
        "view": "112,727"
    },
    {
        "title": "Stellan Bengtsson, Sverige mot  Chen Longcan, China 4. april 1985",
        "search": "ZZzYQfkjppI",
        "ariaLabel": "40,968 views 3 years ago 19 minutes",
        "view": "40,968"
    },
    {
        "title": "버티는 모든 인생을 위한 해원(HAEWON)의 응원가♬ 'Viva La Vida'｜비긴어게인 오픈마이크",
        "search": "IFGdVij7zcs",
        "ariaLabel": "132,765 views 2 days ago 7 minutes, 56 seconds",
        "view": "132,765"
    },
    {
        "title": "Why Going Faster-Than-Light Leads to Time Paradoxes",
        "search": "an0M-wcHw5A",
        "ariaLabel": "6,333,680 views 1 year ago 25 minutes",
        "view": "6,333,680"
    },
    {
        "title": "IVE Wonyoung’s sister Jang Da Ah gains sttention for her visuals!!",
        "search": "_NB_I3NSHGM",
        "ariaLabel": "3,623 views 3 days ago 1 minute, 39 seconds",
        "view": "3,623"
    },
    {
        "title": "一生要强！中日球迷赛场PK，孙颖莎粉丝完胜，颜值高身材更是炸裂",
        "search": "ZGadIiHEykE",
        "ariaLabel": "980 views 3 days ago 1 minute, 34 seconds",
        "view": "980"
    },
    {
        "title": "The One Piece World is About to End.",
        "search": "wtAGkk2OShg",
        "ariaLabel": "87,277 views 1 day ago 17 minutes",
        "view": "87,277"
    },
    {
        "title": "PAD パズドラ 再抽歷世與神創19抽！ 實測屎坑抽蛋大法！結果竟然意想不到？！",
        "search": "gdSj_53SR_c",
        "ariaLabel": "5,145 views 12 hours ago 6 minutes, 5 seconds",
        "view": "5,145"
    },
    {
        "title": "240227 아이사 ISA 스테이씨 STAYC Full ver 'Teddy Bear + RUN2U + Bubble + SO WHAT + ASAP' 4K 60P 직캠 @대진대 OT",
        "search": "Pbt0DIho87w",
        "ariaLabel": "11,605 views 1 day ago 28 minutes",
        "view": "11,605"
    },
    {
        "title": "FELIX LEBRUN vs CHUANG CHIH-YUAN (CHINESE TAIPEI vs FRANCE) - ITTF TEAM BUSAN 2024 MEN TEAM",
        "search": "Cjcy6PP8S-U",
        "ariaLabel": "42,165 views 4 days ago 10 minutes, 2 seconds",
        "view": "42,165"
    },
    {
        "title": "The Power Of Blackbeard's Captains!! (Episode 1093)",
        "search": "RDWoEKgc0HA",
        "ariaLabel": "93,854 views 2 weeks ago 23 minutes",
        "view": "93,854"
    },
    {
        "title": "Kpop Songs Made By Shinsadong Tiger (2008-2023)",
        "search": "Ot5_Vid2WCY",
        "ariaLabel": "18,119 views 1 month ago 11 minutes, 19 seconds",
        "view": "18,119"
    },
    {
        "title": "2024 WTTTC Chen Meng vs Miwa Harimoto (Final) 2, 3 set",
        "search": "sl_f3tDMpTE",
        "ariaLabel": "21,443 views 4 days ago 27 minutes",
        "view": "21,443"
    },
    {
        "title": "＜オープニング映像フル＞TVアニメ「ONE PIECE」／オープニングテーマ「あーーっす！」歌：きただにひろし",
        "search": "YFbno_aPm0w",
        "ariaLabel": "11,690,731 views 1 month ago 1 minute, 31 seconds",
        "view": "11,690,731"
    },
    {
        "title": "Harvard Professor: REVEALING The 7 Big LIES About Exercise, Sleep, Running, Cancer & Sugar!!!",
        "search": "ujRwf1HdNjk",
        "ariaLabel": "8,742,225 views 7 months ago 1 hour, 29 minutes",
        "view": "8,742,225"
    },
    {
        "title": "5 WORST INJURIES in Ping Pong",
        "search": "k8ZuNJvZetM",
        "ariaLabel": "6,299 views 9 days ago 8 minutes, 43 seconds",
        "view": "6,299"
    },
    {
        "title": "Luffy Was Getting COOKED By Katakuri",
        "search": "SYknc7R73eM",
        "ariaLabel": "620,687 views 8 months ago 17 minutes",
        "view": "620,687"
    },
    {
        "title": "every aespa bridge put together to make the ultimate aespa song",
        "search": "wWMDhBs9s-c",
        "ariaLabel": "1,032,672 views 2 years ago 1 minute, 57 seconds",
        "view": "1,032,672"
    },
    {
        "title": "TOP 3 SERVICES EVERY PRO PLAYER USES",
        "search": "EMyd4pTCzq8",
        "ariaLabel": "3,178 views 5 days ago 3 minutes, 33 seconds",
        "view": "3,178"
    },
    {
        "title": "Why MLB Banned Dwarfs From Baseball",
        "search": "WMGJR7XCYo0",
        "ariaLabel": "425,207 views 2 days ago 8 minutes, 59 seconds",
        "view": "425,207"
    },
    {
        "title": "240218 에스파 윈터 aespa WINTER 🎵Trick or Trick 직캠 FANCAM @HMA2023 4K60P HDR",
        "search": "H41y8u1V72k",
        "ariaLabel": "51,285 views 10 days ago 2 minutes, 45 seconds",
        "view": "51,285"
    },
    {
        "title": "Remember, Oda Already Said Luffy Vs Gorosei ISN'T EVEN CLOSE!",
        "search": "FIeLm4Vj30s",
        "ariaLabel": "50,529 views 2 days ago 10 minutes, 58 seconds",
        "view": "50,529"
    },
    {
        "title": "240224 엔믹스(NMIXX) 'Comment full ver.' 4K30p 직캠(fancam) @Mini Fanmeeting S-Plex",
        "search": "TY1jtQCdDrE",
        "ariaLabel": "14,213 views 4 days ago 55 minutes",
        "view": "14,213"
    },
    {
        "title": "The World Government In One Piece Explained",
        "search": "APZnWYWpMTs",
        "ariaLabel": "558,127 views 5 months ago 25 minutes",
        "view": "558,127"
    },
    {
        "title": "[Sub] 이 짤이 그렇게 EASY하게 나온 건 아니에요😂 LE SSERAFIM(르세라핌)밈 탄생비화‼️ 사쿠라, 김채원, 카즈하, 허윤진, 홍은채의 짤터뷰 | ELLE KOREA",
        "search": "IydbZwCAhtc",
        "ariaLabel": "110,754 views 17 hours ago 9 minutes, 59 seconds",
        "view": "110,754"
    },
    {
        "title": "NewJeans SURPRISE Ceo Min Hee Jin for Her Birthday...",
        "search": "1VdzCD9yGVw",
        "ariaLabel": "2,192 views 7 hours ago 42 seconds",
        "view": "2,192"
    },
    {
        "title": "Ma Long vs Dimitrij Ovtcharov (SF) - Tokyo 2020 Olympic Highlights [4K 60FPS]",
        "search": "GN7AyM9ciaw",
        "ariaLabel": "1,077,361 views 1 year ago 3 minutes, 46 seconds",
        "view": "1,077,361"
    },
    {
        "title": "[ONE PIECE] memories - Maki Otsuki (Covered by Kei Takebuchi feat. Johnny Saito)",
        "search": "r8YzPZj5fP0",
        "ariaLabel": "2,561,256 views 1 year ago 7 minutes, 26 seconds",
        "view": "2,561,256"
    },
    {
        "title": "The Surprising Secret of Synchronization",
        "search": "t-_VPRCtiUg",
        "ariaLabel": "25,091,436 views 2 years ago 20 minutes",
        "view": "25,091,436"
    },
    {
        "title": "TOP 100 Korean Surname | World Stats",
        "search": "sghXjAAWpHk",
        "ariaLabel": "170,456 views 1 year ago 8 minutes, 2 seconds",
        "view": "170,456"
    },
    {
        "title": "LUFFY vs EVERYONE HE FACED Power Levels | One Piece Power Scale",
        "search": "ti6l8HIxLoQ",
        "ariaLabel": "131,672 views 2 months ago 15 minutes",
        "view": "131,672"
    },
    {
        "title": "How to Serve more ACCURATELY in Tennis",
        "search": "IzsqHxQ0AWM",
        "ariaLabel": "11,832 views 4 days ago 6 minutes, 28 seconds",
        "view": "11,832"
    },
    {
        "title": "UMJI's 화려한 이 tragic 이거 사랑 맞지",
        "search": "wmQzrGKava4",
        "ariaLabel": "184,618 views 3 months ago 1 minute, 2 seconds",
        "view": "184,618"
    },
    {
        "title": "Is moldy food really that dangerous? (We're not sure, but don't risk it.)",
        "search": "NgduUAu8s3g",
        "ariaLabel": "2,142,747 views 1 year ago 13 minutes, 59 seconds",
        "view": "2,142,747"
    },
    {
        "title": "FINAL FANTASY X The Power of Racism",
        "search": "ODIfm2tTUUQ",
        "ariaLabel": "10,619 views 2 years ago 51 seconds",
        "view": "10,619"
    },
    {
        "title": "[Leemujin Service] EP.77 TWICE JIHYO | Killin' Me Good, Thought Of You, Tango, Inevitability",
        "search": "7TA9AA2GgRE",
        "ariaLabel": "812,045 views 6 months ago 26 minutes",
        "view": "812,045"
    },
    {
        "title": "【全国３位】宮地選手と対戦【バック表】",
        "search": "qHMZaNgQgEw",
        "ariaLabel": "10,714 views 1 year ago 9 minutes",
        "view": "10,714"
    },
    {
        "title": "[입덕직캠] 르세라핌 김채원 직캠 4K 'EASY' (KIMCHAEWON FanCam) | @MCOUNTDOWN_2024.2.22",
        "search": "u0hkscMLMp8",
        "ariaLabel": "38,777 views 6 days ago 3 minutes, 54 seconds",
        "view": "38,777"
    },
    {
        "title": "Messed Up One Piece Frames",
        "search": "Pqb9QiozYYA",
        "ariaLabel": "25,502 views 2 months ago 35 seconds",
        "view": "25,502"
    },
    {
        "title": "【極惡】始祖鬼龍隊新最佳配置！搭新角酒吧始祖鬼龍火力壓制極惡稱號關 [ PAD ]",
        "search": "1G62Ei9EIEU",
        "ariaLabel": "1,856 views 11 hours ago 22 minutes",
        "view": "1,856"
    },
    {
        "title": "Mastering My Forehand Swing with My Korean Table Tennis Pro! Ultimate Table Tennis tutorial",
        "search": "NdqcSQ6ygmM",
        "ariaLabel": "1,221 views 5 days ago 2 minutes, 34 seconds",
        "view": "1,221"
    },
    {
        "title": "How Chaewon Rebranded herself.",
        "search": "aFyI1_VP_gs",
        "ariaLabel": "365,602 views 1 year ago 11 minutes, 7 seconds",
        "view": "365,602"
    },
    {
        "title": "[Light Jeans] 2023 연말 Diary 🤳 | NewJeans",
        "search": "z2gfzkLDC0M",
        "ariaLabel": "175,948 views 17 hours ago 17 minutes",
        "view": "175,948"
    },
    {
        "title": "[4K] 240219 LE SSERAFIM(르세라핌) - SMART @ ‘EASY’ COMEBACK SHOWCASE FANCAM",
        "search": "lYGJEGPny54",
        "ariaLabel": "30,137 views 8 days ago 3 minutes, 18 seconds",
        "view": "30,137"
    },
    {
        "title": "Shanks Uses Gol D Roger's Attack Against Kidd! FULL MANGA FIGHT",
        "search": "YqsX8Gqq9hE",
        "ariaLabel": "72,519 views 5 months ago 11 minutes, 29 seconds",
        "view": "72,519"
    },
    {
        "title": "To. X - 태연 (cover - sua)",
        "search": "bo9kZ96meMg",
        "ariaLabel": "67,104 views 1 month ago 2 minutes, 55 seconds",
        "view": "67,104"
    },
    {
        "title": "Timo Boll vs Tomokazu Harimoto   MS Final   WTT Contender Doha 2024",
        "search": "17ATXSHBD0Y",
        "ariaLabel": "2,485 views 2 weeks ago 10 minutes, 1 second",
        "view": "2,485"
    },
    {
        "title": "NEW React 19 Changes Are Amazing!",
        "search": "v07gXY6ESEo",
        "ariaLabel": "50,506 views 1 day ago 8 minutes, 42 seconds",
        "view": "50,506"
    },
    {
        "title": "These two songs have the same bpm-",
        "search": "QQ4YDbPrjnE",
        "ariaLabel": "710,515 views 2 years ago 47 seconds",
        "view": "710,515"
    },
    {
        "title": "Titanic Captain Van Augur",
        "search": "_U4r3OBPB50",
        "ariaLabel": "3,605 views 5 days ago 2 minutes, 17 seconds",
        "view": "3,605"
    },
    {
        "title": "Best points from Jan Ove Waldner's career",
        "search": "eg57RDU_2aQ",
        "ariaLabel": "43,895 views 3 weeks ago 17 minutes",
        "view": "43,895"
    },
    {
        "title": "LE SSERAFIM ‘EASY Got Banned! Editor Reaction",
        "search": "pBRtq3m_cSU",
        "ariaLabel": "236,213 views 5 days ago 13 minutes, 50 seconds",
        "view": "236,213"
    },
    {
        "title": "채원이가 말아주는 〈비비지 - 매니악♪〉 팝 유어 옹동 포포몬쓰 기다린 사람🙋‍?#놀라운토요일 | amazingsaturday EP.303 | tvN 240224 방송",
        "search": "HB0_OOiJF6U",
        "ariaLabel": "150,765 views 4 days ago 9 minutes, 32 seconds",
        "view": "150,765"
    },
    {
        "title": "FINAL FANTASY VII REBIRTH - Launch Trailer",
        "search": "KOhs9ZLImgE",
        "ariaLabel": "12,402 views 1 hour ago 1 minute, 42 seconds",
        "view": "12,402"
    },
    {
        "title": "The Test That Terence Tao Almost Failed",
        "search": "NKpta1WFK20",
        "ariaLabel": "403,328 views 1 year ago 16 minutes",
        "view": "403,328"
    },
    {
        "title": "Why Akuma Is Top Tier In Every Street Fighter Game",
        "search": "KaoxiuCF_2o",
        "ariaLabel": "349,846 views 1 month ago 11 minutes, 4 seconds",
        "view": "349,846"
    },
    {
        "title": "FULL MATCH | Dimitrij Ovtcharov vs Vladimir Samsonov | FINALS | European Games Baku Throwback",
        "search": "HOIxOrWn17A",
        "ariaLabel": "14,529 views 1 day ago 1 hour, 12 minutes",
        "view": "14,529"
    },
    {
        "title": "RESCENE(리센느) Debut Trailer - #6",
        "search": "gU5fP2e777Q",
        "ariaLabel": "53,338 views 7 days ago 19 seconds",
        "view": "53,338"
    },
    {
        "title": "All 12 Major Deaths in One Piece Explained",
        "search": "ej1m1B8vDs0",
        "ariaLabel": "1,894,115 views 9 months ago 11 minutes, 28 seconds",
        "view": "1,894,115"
    },
    {
        "title": "BLACKPINK LISA  블랙핑크 리사 'MONEY' Fancam Ver KpopHots",
        "search": "Iuf8L7e3A4M",
        "ariaLabel": "12,608 views 4 days ago 1 minute, 4 seconds",
        "view": "12,608"
    },
    {
        "title": "Mr. 13 Draws Nami (3 Different Versions)",
        "search": "xFVnHjEkU8E",
        "ariaLabel": "6,857 views 1 year ago 1 minute, 35 seconds",
        "view": "6,857"
    },
    {
        "title": "2016 WTTTC (MT-SF1) China Vs Korea [HD] [Full Match/Chinese]",
        "search": "NkgJg_e_tp4",
        "ariaLabel": "513,975 views 7 years ago 1 hour, 55 minutes",
        "view": "513,975"
    },
    {
        "title": "Huge STEAM Updates and News - MASSIVE FREE Update + Game Getting REMOVED!",
        "search": "bYkwac2tKUo",
        "ariaLabel": "6,885 views 12 hours ago 8 minutes, 18 seconds",
        "view": "6,885"
    },
    {
        "title": "15 Devil Fruits That Would BREAK One Piece If Real",
        "search": "J0XmbWBVT0A",
        "ariaLabel": "1,006,451 views 3 months ago 24 minutes",
        "view": "1,006,451"
    },
    {
        "title": "【真理】はい、極悪終了。ワルりんぶっ壊れ。GG。†環境最強†【パズドラ　極悪チャレンジ】",
        "search": "nvexfQ9F8UM",
        "ariaLabel": "106,972 views 17 hours ago 16 minutes",
        "view": "106,972"
    },
    {
        "title": "Shh.. (Feat. HYEIN, WONSUN JOE & Special Narr. Patti Kim) (Shh.. (Feat. 혜인(HYEIN), 조원선...",
        "search": "fZ2WGp5EshM",
        "ariaLabel": "1,686,498 views 8 days ago 3 minutes, 47 seconds",
        "view": "1,686,498"
    },
    {
        "title": "240224 ITZY - CAKE / SNEAKERS live @ Jamsil Arena, Seoul 4K Fancam",
        "search": "zabWenshzY0",
        "ariaLabel": "9,531 views 3 days ago 8 minutes, 29 seconds",
        "view": "9,531"
    },
    {
        "title": "This Game Is Pure INSANITY: Final Fantasy VII Rebirth Review (NO spoilers)",
        "search": "B7BOJpkLLqE",
        "ariaLabel": "53,429 views 1 day ago 10 minutes, 50 seconds",
        "view": "53,429"
    },
    {
        "title": "트와이스의 찬란한 청춘을 한눈에✨ ‘OOH-AHH하게’부터 ‘SET ME FREE’까지 트와이스 무대 몰아보기 | TWICE Stage Compilation",
        "search": "S-OtFc2zcJs",
        "ariaLabel": "82,895 views 7 days ago 2 hours, 2 minutes",
        "view": "82,895"
    },
    {
        "title": "BEST MOMENTS TABLE TENNIS Russian Club Championships Table Tennis",
        "search": "pstCYEwzNHA",
        "ariaLabel": "252,606 views 9 years ago 12 minutes, 32 seconds",
        "view": "252,606"
    },
    {
        "title": "‘EASY’ Stage Cam @ LE SSERAFIM COMEBACK SHOWCASE ‘EASY’",
        "search": "S2QF2IbCulE",
        "ariaLabel": "52,213 views 14 hours ago 2 minutes, 52 seconds",
        "view": "52,213"
    },
    {
        "title": "The most creative Table Tennis Player ever?",
        "search": "Q1cZqWDGnNg",
        "ariaLabel": "2,407,121 views 1 year ago 8 minutes, 50 seconds",
        "view": "2,407,121"
    },
    {
        "title": "Law vs Blackbeard Fight (1093 ep) Full fight Awakened Law Vs Blackbeard",
        "search": "HT1SGyqVJ6s",
        "ariaLabel": "142,557 views 2 weeks ago 2 minutes, 21 seconds",
        "view": "142,557"
    },
    {
        "title": "TAEYEON 태연 - To. X @ 2024 SMCU PALACE TOKYO",
        "search": "k6MD3H0L3Ok",
        "ariaLabel": "50,930 views 6 days ago 2 minutes, 41 seconds",
        "view": "50,930"
    },
    {
        "title": "Yamato uses conquerors haki",
        "search": "otKGPk_DULA",
        "ariaLabel": "1,754,796 views 1 year ago 1 minute, 15 seconds",
        "view": "1,754,796"
    },
    {
        "title": "‘Smart’ Stage Cam @ LE SSERAFIM COMEBACK SHOWCASE ‘EASY’",
        "search": "CepCkb8epPY",
        "ariaLabel": "421,026 views 14 hours ago 2 minutes, 51 seconds",
        "view": "421,026"
    },
    {
        "title": "20240217 IVE - After Like [SHOW WHAT I HAVE in KL]",
        "search": "h1PcEJIBVic",
        "ariaLabel": "2,531 views 10 days ago 2 minutes, 56 seconds",
        "view": "2,531"
    },
    {
        "title": "Felix Lebrun vs Lin Yun-Ju ITTF Worlds 2024 Busan",
        "search": "p7DMU-E9_Tg",
        "ariaLabel": "522 views 2 days ago 1 minute, 49 seconds",
        "view": "522"
    },
    {
        "title": "LOLIPOP Serve | Table Tennis | Alexis Lebrun Vs Ma Long  | Amazing",
        "search": "zN6jQztkG-w",
        "ariaLabel": "15,403 views 4 months ago 1 minute, 2 seconds",
        "view": "15,403"
    },
    {
        "title": "[4K]240218 한터뮤직어워즈2023 - Drama 카리나 Karina 에스파 aespa FANCAM 직캠",
        "search": "cLySAfCLuKg",
        "ariaLabel": "23,575 views 5 days ago 3 minutes, 34 seconds",
        "view": "23,575"
    },
    {
        "title": "【table tennis】World champion FangBoteachs you how to exert force backhand",
        "search": "dSsyrkQ67zE",
        "ariaLabel": "1,072 views 2 days ago 7 minutes, 44 seconds",
        "view": "1,072"
    },
    {
        "title": "Hirano miu(Japan) vs ashtari(iran) Women's Teams - Group 5 Busan WTTC",
        "search": "-zCqH-Ca_LQ",
        "ariaLabel": "37,813 views 10 days ago 45 minutes",
        "view": "37,813"
    },
    {
        "title": "Fan Zhendong (CHN) vs Alexis Lebrun (FRA) | MT Final - Match 2 | #ITTFWorlds2024",
        "search": "NOsMWmrUOFc",
        "ariaLabel": "146,272 views 3 days ago 9 minutes, 39 seconds",
        "view": "146,272"
    },
    {
        "title": "11 Minutes Of Xu Xin Destroying These Top 12 Players In Table Tennis 2020 HD",
        "search": "jbd4AH-hCFw",
        "ariaLabel": "1,689,233 views 3 years ago 9 minutes, 59 seconds",
        "view": "1,689,233"
    },
    {
        "title": "What's Up With Mihawk?",
        "search": "YBUXs4pySPM",
        "ariaLabel": "55,411 views 1 month ago 13 minutes, 12 seconds",
        "view": "55,411"
    },
    {
        "title": "230623 권은비 KWONEUNBI 'Underwater' 4K 60P 직캠 @워터밤 by DaftTaengk",
        "search": "OpJOUU5rePY",
        "ariaLabel": "5,209,306 views 8 months ago 2 minutes, 53 seconds",
        "view": "5,209,306"
    },
    {
        "title": "Burgess, Van Augur, Doc Q's introduction in Jaya Town - One Piece (English Sub)",
        "search": "rxs7fRfsEAE",
        "ariaLabel": "201,884 views 1 year ago 1 minute, 48 seconds",
        "view": "201,884"
    },
    {
        "title": "Zoro defeats every villain in One Piece 🗡️🗡️🗡️",
        "search": "Fxwt4pXmlP4",
        "ariaLabel": "71,976 views 1 day ago 28 minutes",
        "view": "71,976"
    },
    {
        "title": "Table Tennis Evolution 1930-2023",
        "search": "9MSzhCnyTcw",
        "ariaLabel": "327,204 views 1 month ago 22 minutes",
        "view": "327,204"
    },
    {
        "title": "The Brilliance In How Oda Protects Strong Characters | One Piece",
        "search": "ZJnuH8U6bI0",
        "ariaLabel": "34,534 views 10 days ago 24 minutes",
        "view": "34,534"
    },
    {
        "title": "One Piece - Official Luffy Gear Five vs Kaido Clip (English Dub) | IGN Fan Fest 2024",
        "search": "iYbDA-m1u-c",
        "ariaLabel": "42,598 views 4 days ago 2 minutes, 2 seconds",
        "view": "42,598"
    },
    {
        "title": "[FULL CONCERT] ITZY 2ND WORLD TOUR [ BORN TO BE ] in SEOUL JAMSIL INDOOR STADIUM | Day1 (Part1)",
        "search": "ahGyLQicE9g",
        "ariaLabel": "44,760 views 2 days ago 45 minutes",
        "view": "44,760"
    },
    {
        "title": "Ace shows off his marksmanship with Van Augurof the Blackbeard Pirates ONE PIECE",
        "search": "QeU4NJ6CwBo",
        "ariaLabel": "164,702 views 2 years ago 2 minutes, 33 seconds",
        "view": "164,702"
    },
    {
        "title": "FULL MATCH | Vladimir Samsonov vs Lei Kou | SEMIFINALS | European Games Baku Throwback",
        "search": "olHtdrCKecM",
        "ariaLabel": "8,739 views 2 days ago 50 minutes",
        "view": "8,739"
    },
    {
        "title": "SAKURA unveils a secret kept from LE SSERAFIM 🍜ㅣEASY-Breezy Interview",
        "search": "4fuXgpyxj1w",
        "ariaLabel": "181,301 views 3 days ago 15 minutes",
        "view": "181,301"
    },
    {
        "title": "How Many Arcs Are Left In One Piece?",
        "search": "_f4Ao9Sk8so",
        "ariaLabel": "383,240 views 1 year ago 12 minutes, 18 seconds",
        "view": "383,240"
    },
    {
        "title": "[단독샷캠4K] 있지 'UNTOUCHABLE' 단독샷 별도녹화│ITZY ONE TAKE STAGE│@SBS Inkigayo 240114",
        "search": "Cq4kbZc5sk4",
        "ariaLabel": "977,039 views 1 month ago 3 minutes, 39 seconds",
        "view": "977,039"
    },
    {
        "title": "The best table tennis match of century",
        "search": "_PmCu6D3gkI",
        "ariaLabel": "1,523,033 views 1 year ago 20 minutes",
        "view": "1,523,033"
    },
    {
        "title": "[4k] 240219 ‘Smart’ 르세라핌 김채원 KIM CHAEWON 직캠 [LE SSERAFIM COMEBACK SHOWCASE 'EASY' 컴백쇼케이스]",
        "search": "OnYwBMxFJng",
        "ariaLabel": "378,274 views 9 days ago 3 minutes, 15 seconds",
        "view": "378,274"
    },
    {
        "title": "Imu sama Destroys The Lulucia Kingdom | Sabo Reveals about Imu [English Sub]",
        "search": "cqtaIm-EYMY",
        "ariaLabel": "18,957 views 1 month ago 1 minute, 21 seconds",
        "view": "18,957"
    },
    {
        "title": "Mima Ito (JPN) VS BERNADETTE SZOCS(ROU) 2024 ITTF Team Table Tennis Championships",
        "search": "O77wg2oCggI",
        "ariaLabel": "30,378 views 6 days ago 40 minutes",
        "view": "30,378"
    },
    {
        "title": "Luffy, Law and Kidd interacting (arguing) for 13 minutes straight (ONE PIECE)",
        "search": "uZLltGtxUYc",
        "ariaLabel": "78,693 views 2 months ago 13 minutes, 29 seconds",
        "view": "78,693"
    },
    {
        "title": "My Mix",
        "search": "vu5iEVF2jYM&list",
        "ariaLabel": "",
        "view": ""
    },
    {
        "title": "220618 장원영 JANGWONYOUNG 아이브 IVE 'LOVE DIVE' 4K 60P 직캠 @드림콘서트 by DaftTaengk",
        "search": "WHTVSgU2wbE",
        "ariaLabel": "2,333,862 views 1 year ago 3 minutes, 34 seconds",
        "view": "2,333,862"
    },
    {
        "title": "Blackbeard's Bloodline: The World's Greatest Threat",
        "search": "SIx9u51FoXo",
        "ariaLabel": "86,827 views 7 days ago 24 minutes",
        "view": "86,827"
    },
    {
        "title": "What Game Theory Reveals About Life, The Universe, and Everything",
        "search": "mScpHTIi-kM",
        "ariaLabel": "5,576,676 views 2 months ago 27 minutes",
        "view": "5,576,676"
    },
    {
        "title": "Play PINGPONG for Physical and Mental Fitness",
        "search": "f885y347c2M",
        "ariaLabel": "2,546 views 3 weeks ago 26 seconds",
        "view": "2,546"
    }
]

    const handleMakeSubmitted = () =>{
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const videoInfo = {
          title: element.title,
          url: `https://www.youtube.com/watch?v=${element.search}`,
          description: element.title
        };
        postVideo(videoInfo)
      }
    }

  const likedInfo = {
    userId:user,
    videoId: 3,
    liked: false,
  };

  const commentInfo = {
    text: 'tests',
  };


  useEffect(() => {
    console.log("Updated global state user:", user);
    console.log("Updated global state token:", token);
  }, [user, token]);

  const  handleSubmitLogin  = async (event) => {
    event.preventDefault();
    // Handle the login logic here
    let data = await loginUser("asdasd2@gmail.com", 'asdasd')
    console.log(data)
    setUser(data.user.id)
    setToken(data.jwtToken)
  };

  

  
  
  
  const handleUpdateVideo = () => {
    updateVideo(2,videoInfo)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
        title,
        url,
        description: description || 'No description provided',
    });
    alert('Video info submitted! Check console for details.');
  };

  const seedInfo = {
    seed:213213,
    page:1,
    size:10
  }

  return (
    <div className="flex-wrap justify-center items-center h-screen ">
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"  onClick={() => { postVideo(videoInfo); }}>Post Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"  onClick={() => { getUserVideos(user); }}>Get User Video</button>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleUpdateVideo()}>Update Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideo(289)}>Delete Video</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getVideo(3)}>Get Video info</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => addLiked(likedInfo)}>addLiked</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getLiked(3)}>getLiked</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => createComment(commentInfo)}>addComment</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={handleSubmitLogin}>Login</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => logOut()}>Logout</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getComments(3)}>GetComments</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteComment(98)}>deleteCommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => updateComment(354,commentInfo)}>Edit CommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleMakeSubmitted}>Make Array</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => fetchVideos("123123213",2)}>getHomePageVideo</button>

    </div>
  );
}

export default Register;
