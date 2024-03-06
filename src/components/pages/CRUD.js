// LoginPage.jsx
import React, { useState,useEffect } from 'react';
import { postVideo,getUserVideos,updateVideo,deleteVideo,getVideo, fetchVideos, getSearchVideo } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext'; 
import { createComment,getComments,deleteComment, updateComment } from '../../utils/commentUtils';
import { loginUser,logOut } from '../../utils/authUtils';
import { addToPlaylist, createPlaylist, deleteVideoFromPlaylist, getPlaylistVideo } from '../../utils/playlist';
import NavBar from '../navBar/NavBar';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user,token,setUser, setToken } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  
  console.log(user, token);


  const arr =  [
    {
        "title": "RESCENE(리센느) ‘YoYo’ MV",
        "search": "uDYy2UyO1X4",
        "ariaLabel": "5,628 views 1 hour ago 1 minute, 48 seconds",
        "view": "5,628"
    },
    {
        "title": "Timo Boll + Dimitrij Ovtcharov l Highlights Table Tennis Training 2021",
        "search": "t50hBB1n6dE",
        "ariaLabel": "176,737 views 2 years ago 6 minutes, 41 seconds",
        "view": "176,737"
    },
    {
        "title": "Why Kuma Might Have Been The Strongest Character In One Piece",
        "search": "_LKXevv_DDI",
        "ariaLabel": "244,449 views 3 months ago 16 minutes",
        "view": "244,449"
    },
    {
        "title": "240224 ITZY Yuna Fancam - LOVE is live @ Jamsil Arena, Seoul",
        "search": "WfGscL5as_c",
        "ariaLabel": "944 views 3 days ago 3 minutes, 44 seconds",
        "view": "944"
    },
    {
        "title": "#tabletennis Felix Lebrum the new king of Europe?",
        "search": "xcJ3l5CWhn8",
        "ariaLabel": "492 views 3 days ago 10 minutes, 5 seconds",
        "view": "492"
    },
    {
        "title": "Forehand topspin vs backspin - Amateur vs Pro technique in slow motion",
        "search": "54G98gEIy00&t",
        "ariaLabel": "320,960 views 1 year ago 8 minutes, 11 seconds",
        "view": "320,960"
    },
    {
        "title": "Last Battle of  Garp \"The Hero\" - Garp vs Aokiji and the Blackbeard Pirates",
        "search": "gwBtFwXT_R8",
        "ariaLabel": "98,100 views 2 months ago 15 minutes",
        "view": "98,100"
    },
    {
        "title": "[입덕직캠] 르세라핌 홍은채 직캠 4K 'EASY' (HONGEUNCHAE FanCam)| @MCOUNTDOWN_2024.2.22",
        "search": "ZlgD4lfpZpk",
        "ariaLabel": "15,533 views 6 days ago 4 minutes, 3 seconds",
        "view": "15,533"
    },
    {
        "title": "아이브 안유진 IVE YUJIN  Milan Fashion Week 21 february 2024 show Fendi",
        "search": "6394rNYZe0k",
        "ariaLabel": "4,281 views 5 days ago 1 minute, 39 seconds",
        "view": "4,281"
    },
    {
        "title": "2024 WTTTC Chen Meng vs Miwa Harimoto (Final) 2, 3 set",
        "search": "sl_f3tDMpTE",
        "ariaLabel": "22,483 views 4 days ago 27 minutes",
        "view": "22,483"
    },
    {
        "title": "If THIS Was the Void Century, then I See How Joyboy LOST",
        "search": "XZECH3O-1wM",
        "ariaLabel": "977,746 views 1 year ago 29 minutes",
        "view": "977,746"
    },
    {
        "title": "LE SSERAFIM (르세라핌) - EASY [8D USE HEADPHONES] 🎧",
        "search": "75SKLSy9crA",
        "ariaLabel": "13,800 views 9 days ago 2 minutes, 45 seconds",
        "view": "13,800"
    },
    {
        "title": "Top 25 Angry Moment in table tennis",
        "search": "nb4RO3L42XM",
        "ariaLabel": "134,033 views 2 years ago 6 minutes, 47 seconds",
        "view": "134,033"
    },
    {
        "title": "Tim Cudjoe vs Felix Lartey (Pro)",
        "search": "l_pIeeA0-8Q",
        "ariaLabel": "187 views 3 days ago 4 minutes, 47 seconds",
        "view": "187"
    },
    {
        "title": "Blackbeard's SECRET LINEAGE Revealed?!?",
        "search": "9KD75FsPRE4",
        "ariaLabel": "53,741 views 10 days ago 19 minutes",
        "view": "53,741"
    },
    {
        "title": "[K-Fancam] 르세라핌 김채원 직캠 'Swan Song'(LE SSERAFIM KIM CHAEWON Fancam) @뮤직뱅크(Music Bank) 240223",
        "search": "TodpQBcyCUk",
        "ariaLabel": "31,958 views 5 days ago 3 minutes, 1 second",
        "view": "31,958"
    },
    {
        "title": "Oda, The Foreshadow Genius",
        "search": "jLvVjKFKfOI",
        "ariaLabel": "634,911 views 1 year ago 28 seconds",
        "view": "634,911"
    },
    {
        "title": "Tomokazu Harimoto (JPN) vs Lin Yun-Ju  (TPE) | MT G5 - Match 4 | #ITTFWorlds2024",
        "search": "-61RoyBlzsc",
        "ariaLabel": "27,740 views 10 days ago 8 minutes, 19 seconds",
        "view": "27,740"
    },
    {
        "title": "240217 IVE (아이브) - Kitsch | IVE World Tour Show Me What I Have in KL",
        "search": "qcgX-WgZW6g",
        "ariaLabel": "3,985 views 10 days ago 3 minutes, 15 seconds",
        "view": "3,985"
    },
    {
        "title": "hanni pham 🦭 when a dog is around 🐶 #newjeans #hanni",
        "search": "nXjuboemSEQ",
        "ariaLabel": "16,371 views 4 months ago 1 minute, 14 seconds",
        "view": "16,371"
    },
    {
        "title": "The Kingdom That Never Existed | One Piece | Clip | Netflix Anime",
        "search": "_PKEaqRwOdA",
        "ariaLabel": "37,329 views 18 hours ago 2 minutes, 5 seconds",
        "view": "37,329"
    },
    {
        "title": "Table tennis growth; Ma Long's backhand strong  initiates sideways play.",
        "search": "8JAINXRlla0",
        "ariaLabel": "2,693 views 2 days ago 31 minutes",
        "view": "2,693"
    },
    {
        "title": "TAEYEON 태연 - To. X @ 2024 SMCU PALACE TOKYO",
        "search": "k6MD3H0L3Ok",
        "ariaLabel": "51,695 views 6 days ago 2 minutes, 41 seconds",
        "view": "51,695"
    },
    {
        "title": "The purest coding style, where bugs are near impossible",
        "search": "HlgG395PQWw",
        "ariaLabel": "695,171 views 5 months ago 10 minutes, 25 seconds",
        "view": "695,171"
    },
    {
        "title": "ITZY Airport Deaparture to Taipei @ ICN｜240217",
        "search": "-5Zc-vg2KO4",
        "ariaLabel": "4,882 views 12 days ago 2 minutes, 25 seconds",
        "view": "4,882"
    },
    {
        "title": "Pirate King Luffy (25) visits the old bartender in Loguetown | FAN ANIMATION",
        "search": "Z6JrKNvCUxI",
        "ariaLabel": "1,623,459 views 9 months ago 47 seconds",
        "view": "1,623,459"
    },
    {
        "title": "[방송원본] 속보📢 전세계인들 💘아이유(IU)보고  심(장)쿵해,,💘 징쨩의 좋은 날(Good DAY)~🌸| KBS 130225 방송",
        "search": "kYzz24-6qyo",
        "ariaLabel": "2,025,229 views 1 year ago 3 minutes, 49 seconds",
        "view": "2,025,229"
    },
    {
        "title": "Swimmer gets disqualified for celebrating (Uncut)",
        "search": "yFahLMLHke4",
        "ariaLabel": "764,776 views 3 days ago 5 minutes, 7 seconds",
        "view": "764,776"
    },
    {
        "title": "Tyrant Kuma talks to Gecko Moria about Black Beard & Luffy (English Dubbed)",
        "search": "jhLVleMxp08",
        "ariaLabel": "424,967 views 11 months ago 2 minutes, 27 seconds",
        "view": "424,967"
    },
    {
        "title": "PAD パズドラ 再抽歷世與神創19抽！ 實測屎坑抽蛋大法！結果竟然意想不到？！",
        "search": "gdSj_53SR_c",
        "ariaLabel": "5,524 views 14 hours ago 6 minutes, 5 seconds",
        "view": "5,524"
    },
    {
        "title": "[Live] Gyubin (규빈) - Really Like You (English Ver.) [DJ Ashley's Radio' Clock]",
        "search": "9UrWI1auao4",
        "ariaLabel": "12,647 views 6 days ago 3 minutes, 5 seconds",
        "view": "12,647"
    },
    {
        "title": "aespa x Happy Collections - Interview",
        "search": "ON2-a6vKG0c",
        "ariaLabel": "14,246 views 2 weeks ago 1 minute, 3 seconds",
        "view": "14,246"
    },
    {
        "title": "世界卓球2024団体戦 日本代表帰国記者会見",
        "search": "Y8iDbYEIygE",
        "ariaLabel": "69,184 views Streamed 2 days ago 3 hours, 55 minutes",
        "view": "69,184"
    },
    {
        "title": "카라멜 마끼아또",
        "search": "7brrFkHZMV4",
        "ariaLabel": "40,159 views 8 days ago 17 minutes",
        "view": "40,159"
    },
    {
        "title": "Why do A24 Films look like that?",
        "search": "Y4EFuZxEtNI",
        "ariaLabel": "1,758,937 views 2 weeks ago 10 minutes, 2 seconds",
        "view": "1,758,937"
    },
    {
        "title": "TWICE (TZUYU) - “ONE SPARK” Dance Challenge (챌린지 촬영중인 트와이스 쯔위) | 키스더라디오 • 240227",
        "search": "ng-sre8z1kU",
        "ariaLabel": "22,845 views 1 day ago 3 minutes, 27 seconds",
        "view": "22,845"
    },
    {
        "title": "TIMO BOLL Slow Motion Training - High Quality Technique Analyse",
        "search": "0MF4sRGGN6E&t",
        "ariaLabel": "70,665 views 5 years ago 10 minutes, 38 seconds",
        "view": "70,665"
    },
    {
        "title": "BHUNIVELZE | Lightning Returns FF XIII PART 26 FINALE (NG Normal) No Commentary Gameplay Walkthrough",
        "search": "mXOYXRVLbVg",
        "ariaLabel": "10,548 views 3 years ago 1 hour, 1 minute",
        "view": "10,548"
    },
    {
        "title": "유메데 키스미🌸 / 夢で Kiss me (가사/번역/발음",
        "search": "EmUFiQbbdX0",
        "ariaLabel": "288,891 views 1 year ago 3 minutes, 11 seconds",
        "view": "288,891"
    },
    {
        "title": "Law vs Blackbeard Fight (1093 ep) Full fight Awakened Law Vs Blackbeard",
        "search": "HT1SGyqVJ6s",
        "ariaLabel": "150,553 views 2 weeks ago 2 minutes, 21 seconds",
        "view": "150,553"
    },
    {
        "title": "What If Luffy Was Actually Raised By Dragon?",
        "search": "_3UVS-0JZTc",
        "ariaLabel": "439,644 views 2 months ago 17 minutes",
        "view": "439,644"
    },
    {
        "title": "[안방1열 직캠4K] 르세라핌 홍은채 'EASY' (LE SSERAFIM HONG EUNCHAE FanCam) @SBS Inkigayo 240225",
        "search": "Dw-auoE-s5w",
        "ariaLabel": "22,730 views 3 days ago 3 minutes, 16 seconds",
        "view": "22,730"
    },
    {
        "title": "240227 아이사 ISA 스테이씨 STAYC Full ver 'Teddy Bear + RUN2U + Bubble + SO WHAT + ASAP' 4K 60P 직캠 @대진대 OT",
        "search": "Pbt0DIho87w",
        "ariaLabel": "11,798 views 1 day ago 28 minutes",
        "view": "11,798"
    },
    {
        "title": "FULL MATCH Darko Jorgic vs Truls Moregard | FINALS 2024 Europe Top 16 Cup",
        "search": "05vDZr0UIyA",
        "ariaLabel": "74,637 views 1 month ago 28 minutes",
        "view": "74,637"
    },
    {
        "title": "【極惡】始祖鬼龍隊新最佳配置！搭新角酒吧始祖鬼龍火力壓制極惡稱號關 [ PAD ]",
        "search": "1G62Ei9EIEU",
        "ariaLabel": "2,178 views 13 hours ago 22 minutes",
        "view": "2,178"
    },
    {
        "title": "Shiryu of the Rain",
        "search": "r35Og_K3Pys",
        "ariaLabel": "5,067,702 views 12 years ago 1 minute, 53 seconds",
        "view": "5,067,702"
    },
    {
        "title": "[AI COVER] NewJeans - ‘EASY’ by LE SSERAFIM | seulgisun",
        "search": "2zCPFE-9Vkw",
        "ariaLabel": "59,153 views 8 days ago 2 minutes, 45 seconds",
        "view": "59,153"
    },
    {
        "title": "[4K] 231102 비비지 엄지 직캠 'MANIAC' VIVIZ(UMJI) Fancam @미니앨범 VERSUS 발매 기념 게릴라 공연  By 벤뎅이",
        "search": "NIpPRd2j6y0",
        "ariaLabel": "358,260 views 3 months ago 3 minutes, 16 seconds",
        "view": "358,260"
    },
    {
        "title": "【全国３位】宮地選手と対戦【バック表】",
        "search": "qHMZaNgQgEw",
        "ariaLabel": "10,714 views 1 year ago 9 minutes",
        "view": "10,714"
    },
    {
        "title": "Is Keens Steakhouse Worth The Hype? Revisiting NYC's Iconic Steakhouse",
        "search": "6HiYDFPashE",
        "ariaLabel": "13,088 views 5 hours ago 20 minutes",
        "view": "13,088"
    },
    {
        "title": "240217 소연- Wife Live ((여자)아이들((G)I-DLE)",
        "search": "9ggpO2Cwe5E",
        "ariaLabel": "47,459 views 11 days ago 3 minutes, 5 seconds",
        "view": "47,459"
    },
    {
        "title": "FINAL FANTASY VII REBIRTH - Launch Trailer",
        "search": "KOhs9ZLImgE",
        "ariaLabel": "28,071 views 3 hours ago 1 minute, 42 seconds",
        "view": "28,071"
    },
    {
        "title": "240218 에스파 윈터 aespa WINTER 🎵Trick or Trick 직캠 FANCAM @HMA2023 4K60P HDR",
        "search": "H41y8u1V72k",
        "ariaLabel": "51,362 views 10 days ago 2 minutes, 45 seconds",
        "view": "51,362"
    },
    {
        "title": "버티는 모든 인생을 위한 해원(HAEWON)의 응원가♬ 'Viva La Vida'｜비긴어게인 오픈마이크",
        "search": "IFGdVij7zcs",
        "ariaLabel": "135,807 views 2 days ago 7 minutes, 56 seconds",
        "view": "135,807"
    },
    {
        "title": "Retired Dancer's Reaction— LE SSERAFIM \"Easy (The Garage)\", \"Smart\" Showcase, \"Swan Song\" Stage",
        "search": "YGmpZndjecg",
        "ariaLabel": "17,526 views 14 hours ago 28 minutes",
        "view": "17,526"
    },
    {
        "title": "11 Minutes Of Xu Xin Destroying These Top 12 Players In Table Tennis 2020 HD",
        "search": "jbd4AH-hCFw",
        "ariaLabel": "1,689,342 views 3 years ago 9 minutes, 59 seconds",
        "view": "1,689,342"
    },
    {
        "title": "The King of the Pirates!",
        "search": "JB7wZMIO-SY",
        "ariaLabel": "33,448 views 1 month ago 1 minute, 4 seconds",
        "view": "33,448"
    },
    {
        "title": "BLACKPINK LISA  블랙핑크 리사 'MONEY' Fancam Ver KpopHots",
        "search": "Iuf8L7e3A4M",
        "ariaLabel": "13,311 views 4 days ago 1 minute, 4 seconds",
        "view": "13,311"
    },
    {
        "title": "Shh.. (Feat. HYEIN, WONSUN JOE & Special Narr. Patti Kim) (Shh.. (Feat. 혜인(HYEIN), 조원선...",
        "search": "fZ2WGp5EshM",
        "ariaLabel": "1,697,814 views 8 days ago 3 minutes, 47 seconds",
        "view": "1,697,814"
    },
    {
        "title": "10 React Antipatterns to Avoid - Code This, Not That!",
        "search": "b0IZo2Aho9Y",
        "ariaLabel": "676,228 views 1 year ago 8 minutes, 55 seconds",
        "view": "676,228"
    },
    {
        "title": "르세라핌 이지 EASY (240219 쇼케이스)",
        "search": "G-eseZBcqxE",
        "ariaLabel": "678 views 6 days ago 2 minutes, 27 seconds",
        "view": "678"
    },
    {
        "title": "[ENG] [썸썸썸] 썸네일 주인공? 쉽지 않음 르세라핌이 쉽게 EASY | LE SSERAFIM - EASY 썸네일 쟁탈전",
        "search": "_ye12TIQtdc",
        "ariaLabel": "27,021 views 15 hours ago 4 minutes, 31 seconds",
        "view": "27,021"
    },
    {
        "title": "3 tips från Jan-Ove Waldner",
        "search": "glRG_eZWA4k",
        "ariaLabel": "19,614 views 5 years ago 1 minute, 1 second",
        "view": "19,614"
    },
    {
        "title": "Imu sama Destroys The Lulucia Kingdom | Sabo Reveals about Imu [English Sub]",
        "search": "cqtaIm-EYMY",
        "ariaLabel": "18,976 views 1 month ago 1 minute, 21 seconds",
        "view": "18,976"
    },
    {
        "title": "I'LL-IT 아일릿 members arrival @ Paris Fashion Week 28 february 2024 show Acne ILLIT",
        "search": "okEvhe0rwbk",
        "ariaLabel": "3,142 views 10 hours ago 50 seconds",
        "view": "3,142"
    },
    {
        "title": "[Sub] 이 짤이 그렇게 EASY하게 나온 건 아니에요😂 LE SSERAFIM(르세라핌)밈 탄생비화‼️ 사쿠라, 김채원, 카즈하, 허윤진, 홍은채의 짤터뷰 | ELLE KOREA",
        "search": "IydbZwCAhtc",
        "ariaLabel": "117,532 views 19 hours ago 9 minutes, 59 seconds",
        "view": "117,532"
    },
    {
        "title": "Camila's Journey to VCHA | A2K Project CAMILA EDITION",
        "search": "xmzVy4MxCHE",
        "ariaLabel": "28,928 views 5 months ago 42 minutes",
        "view": "28,928"
    },
    {
        "title": "Wang Chuqin, Fan Zhendong training at World Championships 2024",
        "search": "lTBc3K3SuWA",
        "ariaLabel": "13,538 views 16 hours ago 16 minutes",
        "view": "13,538"
    },
    {
        "title": "IVE 아이브 'LOVE ME' MV",
        "search": "TeGfG4M-U4A",
        "ariaLabel": "119,482 views 3 weeks ago 3 minutes, 5 seconds",
        "view": "119,482"
    },
    {
        "title": "韓系髮型｜如何隱藏分線｜別犯這3種錯誤",
        "search": "MxO2erzmAnY",
        "ariaLabel": "27,083 views 4 days ago 6 minutes, 35 seconds",
        "view": "27,083"
    },
    {
        "title": "Cillian Murphy's first reaction to \"Oppenheimer\" script",
        "search": "ChRCmTPExqM",
        "ariaLabel": "135,850 views 10 days ago 1 minute, 24 seconds",
        "view": "135,850"
    },
    {
        "title": "Blackbeard Reveals Why He Always Feared the Dark King Rayleigh - One Piece",
        "search": "fmrB6kZ-HkI",
        "ariaLabel": "131,723 views 2 months ago 8 minutes, 25 seconds",
        "view": "131,723"
    },
    {
        "title": "19-Year-Old ROGER FEDERER defeats King Of Wimbledon (2001)",
        "search": "qBbFm38dsNw",
        "ariaLabel": "1,084,550 views 7 months ago 35 minutes",
        "view": "1,084,550"
    },
    {
        "title": "채원이가 말아주는 〈비비지 - 매니악♪〉 팝 유어 옹동 포포몬쓰 기다린 사람🙋‍?#놀라운토요일 | amazingsaturday EP.303 | tvN 240224 방송",
        "search": "HB0_OOiJF6U",
        "ariaLabel": "151,571 views 4 days ago 9 minutes, 32 seconds",
        "view": "151,571"
    },
    {
        "title": "鄧麗君  Teresa Teng 星，1984年1月17日吉隆坡演唱會 Star (Subaru) at Kuala Lumpur, January 17, 1984",
        "search": "EI4G0ccbgkg",
        "ariaLabel": "16,600 views 2 years ago 2 minutes, 8 seconds",
        "view": "16,600"
    },
    {
        "title": "3 Trick Serves - Add these to your game",
        "search": "A-AfUFpuRMs",
        "ariaLabel": "164,891 views 3 months ago 10 minutes, 45 seconds",
        "view": "164,891"
    },
    {
        "title": "This is the reason why Kazuha motivated them to have abs",
        "search": "R5NzdMGsok8",
        "ariaLabel": "732,326 views 1 year ago 35 seconds",
        "view": "732,326"
    },
    {
        "title": "單局比分19比17這麼激烈，黃鎮廷VS張宇鎮，黃金視角的乒乓盛宴！",
        "search": "sFL7k1Yywbc",
        "ariaLabel": "2,108 views 16 hours ago 6 minutes, 39 seconds",
        "view": "2,108"
    },
    {
        "title": "Ace vs Van Augur",
        "search": "4dvToJnX_Lw",
        "ariaLabel": "283,724 views 1 year ago 46 seconds",
        "view": "283,724"
    },
    {
        "title": "240224 엔믹스(NMIXX) 'Comment full ver.' 4K30p 직캠(fancam) @Mini Fanmeeting S-Plex",
        "search": "TY1jtQCdDrE",
        "ariaLabel": "14,268 views 4 days ago 55 minutes",
        "view": "14,268"
    },
    {
        "title": "カズハの発言で爆笑するメンバー【Le Sserafim / ルセラフィム/日本語字幕】#lesserafim  #ルセラフィム   #ルセラフィム切り抜き #ウンチェ #ユンジン#ルセラ #カズハ",
        "search": "JaIDCol-0B4",
        "ariaLabel": "22,783 views 7 days ago 1 minute, 14 seconds",
        "view": "22,783"
    },
    {
        "title": "What Game Theory Reveals About Life, The Universe, and Everything",
        "search": "mScpHTIi-kM",
        "ariaLabel": "5,579,235 views 2 months ago 27 minutes",
        "view": "5,579,235"
    },
    {
        "title": "The best table tennis match of century",
        "search": "_PmCu6D3gkI",
        "ariaLabel": "1,523,180 views 1 year ago 20 minutes",
        "view": "1,523,180"
    },
    {
        "title": "LUFFY vs EVERYONE HE FACED Power Levels | One Piece Power Scale",
        "search": "ti6l8HIxLoQ",
        "ariaLabel": "132,751 views 2 months ago 15 minutes",
        "view": "132,751"
    },
    {
        "title": "라이브로 듣는 엔믹스 팬송 'XOXO' Live Ver.",
        "search": "RF2lgikzgxo",
        "ariaLabel": "40,210 views 6 days ago 2 minutes, 43 seconds",
        "view": "40,210"
    },
    {
        "title": "The Brilliance In How Oda Protects Strong Characters | One Piece",
        "search": "ZJnuH8U6bI0",
        "ariaLabel": "34,945 views 10 days ago 24 minutes",
        "view": "34,945"
    },
    {
        "title": "BEST MOMENTS TABLE TENNIS Russian Club Championships Table Tennis",
        "search": "pstCYEwzNHA",
        "ariaLabel": "252,608 views 9 years ago 12 minutes, 32 seconds",
        "view": "252,608"
    },
    {
        "title": "[4K] ITZY(있지) - 'WANNABE' || Seoul Concert 240224",
        "search": "K8lXnO-IaHM",
        "ariaLabel": "26,516 views 4 days ago 3 minutes, 16 seconds",
        "view": "26,516"
    },
    {
        "title": "ITZY.zip 📂 DALLA DALLA(달라달라)부터 UNTOUCHABLE까지 | Show! MusicCore",
        "search": "i1Fsv_jiYeI",
        "ariaLabel": "195,977 views 1 month ago 44 minutes",
        "view": "195,977"
    },
    {
        "title": "[C.C.] LE SSERAFIM stylishly transforming for their ⟪EASY⟫ performance #LESSERAFIM",
        "search": "opV9rvotTg4",
        "ariaLabel": "228,592 views 3 days ago 9 minutes, 29 seconds",
        "view": "228,592"
    },
    {
        "title": "aespa (NINGNING) 에스파 닝닝 ‘매일매일 예뻐지는 중’ 출국 Departure 직캠 | 김포공항 • 240220",
        "search": "ZdTRYpjDFm8",
        "ariaLabel": "3,621 views 9 days ago 1 minute, 37 seconds",
        "view": "3,621"
    },
    {
        "title": "Westchester Table Tennis Center February 2024 Open Singles Finals - Enzo Angles vs Esteban Dorr",
        "search": "LdJpmWhVXVk",
        "ariaLabel": "1,743 views 2 days ago 17 minutes",
        "view": "1,743"
    },
    {
        "title": "[플리캠 4K 가로] Billlie TSUKI 'GingaMingaYo(the strange world)'(빌리 츠키 직캠) l Simply K-Pop CON-TOUR Ep.508",
        "search": "mpCM_NDyPuI",
        "ariaLabel": "13,743,486 views 2 years ago 3 minutes, 40 seconds",
        "view": "13,743,486"
    },
    {
        "title": "Le sserafim members covering Garam’s lines (Fearless, Blue Flame, Sour Grapes)",
        "search": "VKed3X0Cs2Y",
        "ariaLabel": "188,021 views 1 year ago 3 minutes, 31 seconds",
        "view": "188,021"
    },
    {
        "title": "The most creative Table Tennis Player ever?",
        "search": "Q1cZqWDGnNg",
        "ariaLabel": "2,407,347 views 1 year ago 8 minutes, 50 seconds",
        "view": "2,407,347"
    },
    {
        "title": "minji speaking english but it sounds expensive",
        "search": "9vLa1C8HoDU",
        "ariaLabel": "7,455 views 1 day ago 2 minutes, 14 seconds",
        "view": "7,455"
    },
    {
        "title": "How Chaewon Rebranded herself.",
        "search": "aFyI1_VP_gs",
        "ariaLabel": "365,712 views 1 year ago 11 minutes, 7 seconds",
        "view": "365,712"
    },
    {
        "title": "[짧] 윈터 혼자 부르는 Thirsty AI COVER",
        "search": "X4XakUqH57k",
        "ariaLabel": "867 views 22 hours ago 1 minute, 29 seconds",
        "view": "867"
    },
    {
        "title": "BUTTERFLY Welcome Party at 2024 WTTC in Busan  #世界卓球2024",
        "search": "aml39yH1_q0",
        "ariaLabel": "42,374 views 13 days ago 3 minutes, 13 seconds",
        "view": "42,374"
    },
    {
        "title": "[FULL CONCERT] ITZY 2ND WORLD TOUR [ BORN TO BE ] in SEOUL JAMSIL INDOOR STADIUM | Day1 (Part2)",
        "search": "EDivvAcej38",
        "ariaLabel": "18,260 views 1 day ago 1 hour, 23 minutes",
        "view": "18,260"
    },
    {
        "title": "How Many Arcs Are Left In One Piece?",
        "search": "_f4Ao9Sk8so",
        "ariaLabel": "383,286 views 1 year ago 12 minutes, 18 seconds",
        "view": "383,286"
    },
    {
        "title": "Table Tennis Evolution 1930-2023",
        "search": "9MSzhCnyTcw",
        "ariaLabel": "327,340 views 1 month ago 22 minutes",
        "view": "327,340"
    },
    {
        "title": "Gol D. Roger Lives Life At Top Speed | One Piece",
        "search": "YuYJdTUDTTo",
        "ariaLabel": "348,272 views 2 years ago 2 minutes, 48 seconds",
        "view": "348,272"
    },
    {
        "title": "‘EASY’ Stage Cam @ LE SSERAFIM COMEBACK SHOWCASE ‘EASY’",
        "search": "S2QF2IbCulE",
        "ariaLabel": "57,691 views 16 hours ago 2 minutes, 52 seconds",
        "view": "57,691"
    },
    {
        "title": "[K-Fancam] 르세라핌 카즈하 직캠 'EASY'(LE SSERAFIM KAZUHA Fancam) @뮤직뱅크(Music Bank) 240223",
        "search": "-bumnIXayNk",
        "ariaLabel": "25,047 views 5 days ago 3 minutes, 8 seconds",
        "view": "25,047"
    },
    {
        "title": "Best points from Jan Ove Waldner's career",
        "search": "eg57RDU_2aQ",
        "ariaLabel": "44,225 views 3 weeks ago 17 minutes",
        "view": "44,225"
    },
    {
        "title": "240222 SMTOWN LIVE 2024 SMCU PALACE TOKYO | aespa - Spicy",
        "search": "33CiaF-Gul0",
        "ariaLabel": "22,102 views 6 days ago 3 minutes, 24 seconds",
        "view": "22,102"
    },
    {
        "title": "FULL MATCH | Sora MATSUSHIMA vs FAN Zhendong | MT QF | #ITTFWorlds2024",
        "search": "TrcrUW77uf8",
        "ariaLabel": "19,980 views 5 days ago 32 minutes",
        "view": "19,980"
    },
    {
        "title": "‘Perfect Night’ Stage Cam @ LE SSERAFIM COMEBACK SHOWCASE ‘EASY’",
        "search": "A5JkJFPzh74",
        "ariaLabel": "100,265 views 16 hours ago 2 minutes, 46 seconds",
        "view": "100,265"
    },
    {
        "title": "[입덕직캠] 르세라핌 김채원 직캠 4K '이브, 프시케 그리고 푸른 수염의 아내' (KIM CHAEWON FanCam) | @MCOUNTDOWN_2023.5.25",
        "search": "nfFnTkX2ULM",
        "ariaLabel": "659,215 views 9 months ago 6 minutes, 19 seconds",
        "view": "659,215"
    },
    {
        "title": "wang hao service",
        "search": "3HlZi7dTCV8",
        "ariaLabel": "130,764 views 15 years ago 1 minute",
        "view": "130,764"
    },
    {
        "title": "20240217 IVE - After Like [SHOW WHAT I HAVE in KL]",
        "search": "h1PcEJIBVic",
        "ariaLabel": "2,555 views 10 days ago 2 minutes, 56 seconds",
        "view": "2,555"
    },
    {
        "title": "Serve Tips No One Tells You With Seth Pech",
        "search": "7_0mRZhd1Gk",
        "ariaLabel": "85,424 views 2 years ago 15 minutes",
        "view": "85,424"
    },
    {
        "title": "LE SSERAFIM (르세라핌) 'EASY' l Original Stage ‘KIM CHAEWON'",
        "search": "ogsCsuf2aOo",
        "ariaLabel": "556,599 views 8 days ago 2 minutes, 52 seconds",
        "view": "556,599"
    },
    {
        "title": "[4K] 240219 LE SSERAFIM(르세라핌) - SMART @ ‘EASY’ COMEBACK SHOWCASE FANCAM",
        "search": "lYGJEGPny54",
        "ariaLabel": "30,504 views 8 days ago 3 minutes, 18 seconds",
        "view": "30,504"
    },
    {
        "title": "[UNFILTERED CAM]  LE SSERAFIM KIM CHAEWON(김채원) 'EASY' 4K | BE ORIGINAL",
        "search": "XFTBLbuIHSs",
        "ariaLabel": "69,259 views 5 days ago 3 minutes, 6 seconds",
        "view": "69,259"
    },
    {
        "title": "FULL MATCH | Vladimir Samsonov vs Lei Kou | SEMIFINALS | European Games Baku Throwback",
        "search": "olHtdrCKecM",
        "ariaLabel": "8,897 views 2 days ago 50 minutes",
        "view": "8,897"
    },
    {
        "title": "15 Devil Fruits That Would BREAK One Piece If Real",
        "search": "J0XmbWBVT0A",
        "ariaLabel": "1,006,584 views 3 months ago 24 minutes",
        "view": "1,006,584"
    },
    {
        "title": "Top 10 Table Tennis Players of All Time [HD]",
        "search": "1oyotAgJA1s",
        "ariaLabel": "188,222 views 1 year ago 9 minutes, 37 seconds",
        "view": "188,222"
    },
    {
        "title": "[4k] 240219 ‘Swan Song’ 르세라핌 김채원 KIM CHAEWON 직캠 [LE SSERAFIM COMEBACK SHOWCASE  'EASY' 컴백쇼케이스]",
        "search": "KaU3yZnNBWs",
        "ariaLabel": "4,874 views 9 days ago 2 minutes, 32 seconds",
        "view": "4,874"
    },
    {
        "title": "[예능연구소] LE SSERAFIM KAZUHA - Swan Song FanCam | Show! MusicCore | MBC240224onair",
        "search": "p6yg2cqIE7k",
        "ariaLabel": "29,195 views 4 days ago 2 minutes, 55 seconds",
        "view": "29,195"
    },
    {
        "title": "2016 WTTTC (MT-SF1) China Vs Korea [HD] [Full Match/Chinese]",
        "search": "NkgJg_e_tp4",
        "ariaLabel": "513,980 views 7 years ago 1 hour, 55 minutes",
        "view": "513,980"
    },
    {
        "title": "Retired Dancer's Reaction— LE SSERAFIM \"Easy\" M/V",
        "search": "3CngQb8IGDU",
        "ariaLabel": "46,764 views 8 days ago 19 minutes",
        "view": "46,764"
    },
    {
        "title": "Top 5 Creative Table Tennis Serves",
        "search": "wG27Nv28FmY",
        "ariaLabel": "413,791 views 7 months ago 3 minutes, 30 seconds",
        "view": "413,791"
    },
    {
        "title": "[안방1열 직캠4K] 르세라핌 카즈하 'EASY' (LE SSERAFIM KAZUHA FanCam) @SBS Inkigayo 240225",
        "search": "A600xrHgsKE",
        "ariaLabel": "28,383 views 3 days ago 3 minutes, 11 seconds",
        "view": "28,383"
    },
    {
        "title": "Burgess, Van Augur, Doc Q's introduction in Jaya Town - One Piece (English Sub)",
        "search": "rxs7fRfsEAE",
        "ariaLabel": "202,134 views 1 year ago 1 minute, 48 seconds",
        "view": "202,134"
    },
    {
        "title": "Finals Alexis Lebrun vs Fan Zhendong ITTF Worlds 2024 Busan",
        "search": "8l4Rr0LLRFU",
        "ariaLabel": "603 views 14 hours ago 3 minutes, 38 seconds",
        "view": "603"
    },
    {
        "title": "LE SSERAFIM (르세라핌) - Swan Song | Show! MusicCore | MBC240224방송",
        "search": "LexyYhZyQUc",
        "ariaLabel": "238,141 views 4 days ago 2 minutes, 39 seconds",
        "view": "238,141"
    },
    {
        "title": "＜オープニング映像フル＞TVアニメ「ONE PIECE」／オープニングテーマ「あーーっす！」歌：きただにひろし",
        "search": "YFbno_aPm0w",
        "ariaLabel": "11,694,770 views 1 month ago 1 minute, 31 seconds",
        "view": "11,694,770"
    },
    {
        "title": "[페이스캠4K] 에스파 윈터 'Thirsty' (aespa WINTER FaceCam) @SBS Inkigayo 230514",
        "search": "yBgIfACPqgM",
        "ariaLabel": "1,029,199 views 9 months ago 3 minutes, 48 seconds",
        "view": "1,029,199"
    },
    {
        "title": "Kpop Songs Made By Shinsadong Tiger (2008-2023)",
        "search": "Ot5_Vid2WCY",
        "ariaLabel": "19,448 views 1 month ago 11 minutes, 19 seconds",
        "view": "19,448"
    },
    {
        "title": "Ace shows off his marksmanship with Van Augurof the Blackbeard Pirates ONE PIECE",
        "search": "QeU4NJ6CwBo",
        "ariaLabel": "165,194 views 2 years ago 2 minutes, 33 seconds",
        "view": "165,194"
    },
    {
        "title": "Messed Up One Piece Frames",
        "search": "Pqb9QiozYYA",
        "ariaLabel": "25,959 views 2 months ago 35 seconds",
        "view": "25,959"
    },
    {
        "title": "Hirano miu(Japan) vs ashtari(iran) Women's Teams - Group 5 Busan WTTC",
        "search": "-zCqH-Ca_LQ",
        "ariaLabel": "38,011 views 10 days ago 45 minutes",
        "view": "38,011"
    },
    {
        "title": "SAKURA unveils a secret kept from LE SSERAFIM 🍜ㅣEASY-Breezy Interview",
        "search": "4fuXgpyxj1w",
        "ariaLabel": "182,408 views 3 days ago 15 minutes",
        "view": "182,408"
    },
    {
        "title": "[4K]240218 한터뮤직어워즈2023 - Drama 카리나 Karina 에스파 aespa FANCAM 직캠",
        "search": "cLySAfCLuKg",
        "ariaLabel": "24,050 views 5 days ago 3 minutes, 34 seconds",
        "view": "24,050"
    },
    {
        "title": "FULL MATCH | Dimitrij Ovtcharov vs Paul Drinkhall | SEMIFINALS | European Games Baku Throwback",
        "search": "977NEeyVV50",
        "ariaLabel": "6,717 views 4 days ago 50 minutes",
        "view": "6,717"
    },
    {
        "title": "Shh - IU 이지은 (Feat. HYEIN, 조원선 & Special Narr. 패티김) Easy Lyrics- INDO SUB",
        "search": "GPQ9KFPDnSA",
        "ariaLabel": "408 views 4 days ago 4 minutes, 8 seconds",
        "view": "408"
    },
    {
        "title": "유나 Focus - Untouchable + Gas Me Up + Dynamite  있지 ITZY 2ND WORLD TOUR ‘BORN TO BE’ in SEOUL 240224",
        "search": "s5VHgIGDg4w",
        "ariaLabel": "28,158 views 4 days ago 8 minutes, 50 seconds",
        "view": "28,158"
    },
    {
        "title": "Japanese Translator explains what happened during the Void Century!",
        "search": "oRMJgGhqtOM",
        "ariaLabel": "120,358 views 1 month ago 40 minutes",
        "view": "120,358"
    },
    {
        "title": "Mima Ito (JPN) VS BERNADETTE SZOCS(ROU) 2024 ITTF Team Table Tennis Championships",
        "search": "O77wg2oCggI",
        "ariaLabel": "31,668 views 6 days ago 40 minutes",
        "view": "31,668"
    },
    {
        "title": "(4K60P)231210 K-LINK FESTIVAL aespa 에스파 karina 카리나 직캠",
        "search": "I4o-eYYAs0M",
        "ariaLabel": "487,759 views 2 months ago 16 minutes",
        "view": "487,759"
    },
    {
        "title": "Mr. 13 Draws Nami (3 Different Versions)",
        "search": "xFVnHjEkU8E",
        "ariaLabel": "6,906 views 1 year ago 1 minute, 35 seconds",
        "view": "6,906"
    },
    {
        "title": "HOW TO RETURN ANY SERVE | STEP-BY-STEP GUIDE",
        "search": "mHPaZtx5fXc",
        "ariaLabel": "395,132 views 10 months ago 9 minutes, 23 seconds",
        "view": "395,132"
    },
    {
        "title": "[4k] 240219 ‘No Celestial+Fire in the belly’ 르세라핌 김채원 KIM CHAEWON 직캠 [LE SSERAFIM COMEBACK SHOWCASE]",
        "search": "-H3HFgSvQn0",
        "ariaLabel": "5,179 views 9 days ago 4 minutes, 4 seconds",
        "view": "5,179"
    },
    {
        "title": "To. X - 태연 (cover - sua)",
        "search": "bo9kZ96meMg",
        "ariaLabel": "67,206 views 1 month ago 2 minutes, 55 seconds",
        "view": "67,206"
    },
    {
        "title": "VIVIZ (비비지) Cheer Up Concert Full Ver. ( MANIAC + PULL UP + 늘 지금처럼 + LOVE LOVE LOVE + BOP BOP!)",
        "search": "bKNG1vzw-3E",
        "ariaLabel": "16,518 views 8 days ago 28 minutes",
        "view": "16,518"
    },
    {
        "title": "220618 장원영 JANGWONYOUNG 아이브 IVE 'LOVE DIVE' 4K 60P 직캠 @드림콘서트 by DaftTaengk",
        "search": "WHTVSgU2wbE",
        "ariaLabel": "2,334,075 views 1 year ago 3 minutes, 34 seconds",
        "view": "2,334,075"
    },
    {
        "title": "[4K] aespa - “Thirsty & Spicy” Band LIVE Concert [it's Live] K-POP live music show",
        "search": "WJMBzYraE7I",
        "ariaLabel": "8,034,358 views 9 months ago 10 minutes, 39 seconds",
        "view": "8,034,358"
    },
    {
        "title": "LIVE! | T2 | Day 1 | ITTF World Team Table Tennis Championships Finals Busan 2024 | FRA vs DEN (M)",
        "search": "04LSMB_il-E",
        "ariaLabel": "90,990 views Streamed 12 days ago 2 hours, 22 minutes",
        "view": "90,990"
    },
    {
        "title": "These two songs have the same bpm-",
        "search": "QQ4YDbPrjnE",
        "ariaLabel": "710,657 views 2 years ago 47 seconds",
        "view": "710,657"
    },
    {
        "title": "Week 11 | West Division | Texas vs. Bay Area",
        "search": "EvUxN6Vd_r8",
        "ariaLabel": "811 views 3 days ago 2 hours, 10 minutes",
        "view": "811"
    },
    {
        "title": "Zoro defeats every villain in One Piece 🗡️🗡️🗡️",
        "search": "Fxwt4pXmlP4",
        "ariaLabel": "74,211 views 1 day ago 28 minutes",
        "view": "74,211"
    },
    {
        "title": "240219 르세라핌(LE SSERAFIM) 'EASY COMEBACK SHOWCASE' 카즈하(KAZUHA) Swan Song 직캠 by 김이모 - 4K",
        "search": "aay4vtf-urw",
        "ariaLabel": "748 views 1 day ago 2 minutes, 34 seconds",
        "view": "748"
    },
    {
        "title": "STAYC in Singapore FULL CONCERT - STAYC WORLD TOUR [TEENFRESH] (021624) [4K]",
        "search": "XXYH4hpRAVY",
        "ariaLabel": "5,933 views 8 days ago 1 hour, 43 minutes",
        "view": "5,933"
    },
    {
        "title": "Pre debut Yeji Dance Video (she was 17 yrs old)",
        "search": "jUSOMUaRpTw",
        "ariaLabel": "776,892 views 1 year ago 1 minute, 32 seconds",
        "view": "776,892"
    },
    {
        "title": "Lesserafim's Yunjin gorgeous voice in produce 48!! (predebut Yunjin)",
        "search": "5dzOo4v9qto",
        "ariaLabel": "518,103 views 1 year ago 29 seconds",
        "view": "518,103"
    },
    {
        "title": "Awakenings Explained - One Piece",
        "search": "ibNh9goXYOU",
        "ariaLabel": "7,715 views 1 month ago 5 minutes, 50 seconds",
        "view": "7,715"
    },
    {
        "title": "TOP 10 PLAYS -- Everett, WA (Week 11)",
        "search": "XYoOqWfloso",
        "ariaLabel": "412 views 9 hours ago 6 minutes, 27 seconds",
        "view": "412"
    },
    {
        "title": "NewJeans SURPRISE Ceo Min Hee Jin for Her Birthday...",
        "search": "1VdzCD9yGVw",
        "ariaLabel": "2,624 views 9 hours ago 42 seconds",
        "view": "2,624"
    },
    {
        "title": "Blackbeard's Bloodline: The World's Greatest Threat",
        "search": "SIx9u51FoXo",
        "ariaLabel": "86,970 views 7 days ago 24 minutes",
        "view": "86,970"
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
  
  const handleCreatePlaylist = () => {
    let playlistInfo = {
      title:"teasdsfsdf"
    }
    createPlaylist(playlistInfo)
  }

  const handleAddToPlaylist = () => {
    let playlistInfo = {
      playlistTitleId:69,
      videoId:186
    }
    addToPlaylist(playlistInfo)
  }

  return (
    <div className="flex-wrap justify-center items-center h-screen ">
    <NavBar/>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"  onClick={() => { postVideo(videoInfo); }}>Post Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"  onClick={() => { getUserVideos(user); }}>Get User Video</button>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleUpdateVideo()}>Update Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideo(184)}>Delete Video</button>
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
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleCreatePlaylist}>createPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleAddToPlaylist}>addToPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getPlaylistVideo(69)}>getPlaylistVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideoFromPlaylist(69,186)}>deleteVideoFromPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>

    </div>
  );
}

export default Register;
