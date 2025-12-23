export type Lang = "en" | "bn";

type Copy = {
  nav: {
    prayer: string;
    donate: string;
    campaigns: string;
    hadith: string;
    guides: string;
    admin: string;
    home: string;
  };
  brand: {
    name: string;
    address: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    friday: string;
    highlightsTitle: string;
    highlights: string[];
  };
  prayer: {
    title: string;
    subtitle: string;
    table: {
      prayer: string;
      adhan: string;
      iqamah: string;
    };
  };
  donate: {
    title: string;
    subtitle: string;
    formTitle: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
    empty: string;
    table: {
      name: string;
      amount: string;
      date: string;
    };
    fields: {
      campaign: string;
      name: string;
      amount: string;
      bkash: string;
      trx: string;
      note: string;
      submit: string;
    };
  };
  campaigns: {
    title: string;
    subtitle: string;
    viewAll: string;
    noActive: string;
    goal: string;
    collected: string;
    remaining: string;
    viewCampaign: string;
  };
  hadith: {
    title: string;
    subtitle: string;
  };
  footer: {
    title: string;
    address: string;
    contact: string;
    phone: string;
    email: string;
    website: string;
    quick: string;
    quickItems: string[];
  };
  location: {
    title: string;
    subtitle: string;
  };
  guides: {
    title: string;
    subtitle: string;
    namazTitle: string;
    namazSubtitle: string;
    namazCta: string;
    hadithTitle: string;
    hadithSubtitle: string;
    hadithCta: string;
  };
  teacher: {
    title: string;
    subtitle: string;
    nameLabel: string;
    postLabel: string;
    phoneLabel: string;
    name: string;
    post: string;
    phone: string;
  };
  events: {
    title: string;
    subtitle: string;
    items: { title: string; time: string }[];
  };
  namazGuide: {
    title: string;
    subtitle: string;
    rakahTitle: string;
    rakahNote: string;
    rakahItems: { name: string; detail: string }[];
    rulesTitle: string;
    rules: string[];
    duasTitle: string;
    transliterationEnLabel: string;
    transliterationBnLabel: string;
    meaningEnLabel: string;
    meaningBnLabel: string;
    hadithLabel: string;
    specialTitle: string;
    specialSubtitle: string;
    duasItems: {
      name: string;
      arabic: string;
      transliterationEn: string;
      translationEn: string;
      transliterationBn: string;
      translationBn: string;
    }[];
    specialItems: {
      name: string;
      arabic: string;
      transliterationEn: string;
      translationEn: string;
      transliterationBn: string;
      translationBn: string;
      hadiths: { text: string; ref: string }[];
    }[];
  };
  hadithLibrary: {
    title: string;
    subtitle: string;
    categories: { title: string; items: { text: string; ref: string }[] }[];
  };
  prayerDisplay: {
    kicker: string;
    today: string;
    adhan: string;
    iqamah: string;
    timeLeft: string;
    next: string;
    friday: string;
    fridayOnly: string;
  };
  poster: {
    kicker: string;
    ctaTitle: string;
    ctaSubtitle: string;
    bkashLabel: string;
    scan: string;
    scanHint: string;
    print: string;
    download: string;
    downloading: string;
  };
  campaignDetail: {
    label: string;
    donateTitle: string;
    donateSubtitle: string;
    bkashTitle: string;
    bkashSubtitle: string;
    supportNote: string;
    shareTitle: string;
    shareButton: string;
    shareCopied: string;
  };
  announcementLabel: string;
  admin: {
    title: string;
    subtitle: string;
    nav: {
      prayer: string;
      donations: string;
      campaigns: string;
      hadiths: string;
      announcements: string;
      displays: string;
    };
    logout: string;
    prayer: {
      title: string;
      hint: string;
      updated: string;
      table: {
        prayer: string;
        prayerBn: string;
        adhan: string;
        iqamah: string;
        update: string;
      };
      save: string;
    };
    donations: {
      addTitle: string;
      addHint: string;
      pendingTitle: string;
      pendingHint: string;
      confirmedTitle: string;
      confirmedHint: string;
      fields: {
        name: string;
        amount: string;
        campaign: string;
        bkash: string;
        trx: string;
        note: string;
        submit: string;
      };
      table: {
        name: string;
        amount: string;
        bkash: string;
        trx: string;
        confirm: string;
        delete: string;
        empty: string;
      };
      confirm: string;
      delete: string;
      deleteTitle: string;
      deleteMessage: string;
      deleteCancel: string;
      deleteConfirm: string;
    };
    campaigns: {
      title: string;
      create: string;
      fields: {
        title: string;
        goal: string;
        description: string;
      };
      table: {
        title: string;
        goal: string;
        progress: string;
        status: string;
        assets: string;
        action: string;
        empty: string;
      };
      qrEn: string;
      qrBn: string;
      posterEn: string;
      posterBn: string;
      archive: string;
      restore: string;
      active: string;
      archived: string;
    };
    hadiths: {
      title: string;
      fields: {
        text: string;
        source: string;
      };
      add: string;
      table: {
        text: string;
        source: string;
        remove: string;
      };
      delete: string;
    };
    announcements: {
      title: string;
      create: string;
      fields: {
        title: string;
        titleBn: string;
        message: string;
        messageBn: string;
        start: string;
        end: string;
      };
      table: {
        title: string;
        period: string;
        status: string;
        action: string;
        empty: string;
      };
      active: string;
      archived: string;
      archive: string;
      restore: string;
      delete: string;
    };
    displays: {
      title: string;
      subtitle: string;
      prayerTitle: string;
      prayerSubtitle: string;
      qrEn: string;
      qrBn: string;
      posterEn: string;
      posterBn: string;
      posterHint: string;
      openLink: string;
      qrLabel: string;
      qrHint: string;
      posterKicker: string;
      posterTitle: string;
      posterCardTitle: string;
      posterCardBody: string;
      posterScanTitle: string;
      posterScanHint: string;
    };
  };
  login: {
    title: string;
    subtitle: string;
    username: string;
    password: string;
    button: string;
    back: string;
    show: string;
    hide: string;
    error: string;
  };
  language: {
    label: string;
    english: string;
    bangla: string;
  };
  menu: {
    open: string;
    close: string;
  };
  loading: string;
};

export const translations: Record<Lang, Copy> = {
  en: {
    nav: {
      prayer: "Prayer Time",
      donate: "Donate",
      campaigns: "Campaigns",
      hadith: "Hadith",
      guides: "Guides",
      admin: "Admin",
      home: "Home"
    },
    brand: {
      name: "Baitun Najat Jame Mosjid",
      address: "Kharampotty, Kishoreganj, Dhaka Division"
    },
    hero: {
      title: "In the name of Allah, the Most Merciful.",
      subtitle:
        "Welcome to our community mosque. We host daily prayers, Qur'an learning, and social services for the people of Kharampotty.",
      cta: "Join Our Community",
      friday: "Every Friday: Jumu'ah at 1:30 PM",
      highlightsTitle: "Community Highlights",
      highlights: ["Daily Salah & Jumu'ah prayers", "Evening Qur'an classes", "Monthly charity drives"]
    },
    prayer: {
      title: "Prayer Timing",
      subtitle:
        "Updated prayer schedule for Baitun Najat Jame Mosjid. Please check the notice board for special announcements.",
      table: {
        prayer: "Prayer",
        adhan: "Adhan Time",
        iqamah: "Iqamah Time"
      }
    },
    donate: {
      title: "Make Your Donation",
      subtitle:
        "Support the mosque with your bKash donation. Use the number below and submit your transaction details. The admin will confirm once received.",
      formTitle: "Donation Form",
      confirmedTitle: "Confirmed Donations",
      confirmedSubtitle: "Donations confirmed by the admin are listed below with donor names.",
      empty: "No confirmed donations yet.",
      table: {
        name: "Name",
        amount: "Amount",
        date: "Date"
      },
      fields: {
        campaign: "Select donation campaign (optional)",
        name: "Full name",
        amount: "Amount (BDT)",
        bkash: "Your bKash number",
        trx: "Transaction ID",
        note: "Note (optional)",
        submit: "Submit Donation"
      }
    },
    campaigns: {
      title: "Donation Campaigns",
      subtitle: "Ongoing campaigns that support our mosque and community.",
      viewAll: "View all",
      noActive: "No active campaigns right now.",
      goal: "Goal",
      collected: "Collected",
      remaining: "Remaining",
      viewCampaign: "View campaign →"
    },
    hadith: {
      title: "Daily Hadith",
      subtitle: "Reflections that inspire our community."
    },
    footer: {
      title: "Baitun Najat Jame Mosjid",
      address: "Kharampotty, Kishoreganj, Dhaka Division, Bangladesh",
      contact: "Contact",
      phone: "Phone: +880 1XXXXXXXXX",
      email: "Email: info@baitunnajat.org",
      website: "Website",
      quick: "Quick Links",
      quickItems: ["Prayer Times", "Donations", "Community Updates"]
    },
    location: {
      title: "Mosque Location",
      subtitle: "Find Baitun Najat Jame Mosjid in Kharampotty, Kishoreganj."
    },
    guides: {
      title: "Guides & Learning",
      subtitle: "Quick references for prayer and authentic hadith collections.",
      namazTitle: "Namaz: Rakah & Rules",
      namazSubtitle: "Rakah counts and core rules for daily prayers.",
      namazCta: "View Namaz Guide",
      hadithTitle: "Authentic Hadiths",
      hadithSubtitle: "Verified hadiths by topic with references.",
      hadithCta: "View Hadith Library"
    },
    teacher: {
      title: "Qur'an & Hadith Learning Support",
      subtitle: "For learning the Qur'an and hadiths for yourself or your children, contact:",
      nameLabel: "Name",
      postLabel: "Post",
      phoneLabel: "Number",
      name: "Md Abdul Sunny",
      post: "Muazzin, Baitun Najat Jame Mosjid",
      phone: "+8801948008918"
    },
    events: {
      title: "Daily & Weekly Programs",
      subtitle: "Regular activities at the mosque.",
      items: [
        { title: "Daily Mashohara", time: "After Fajr Prayer (Everyday)" },
        { title: "Weekly Dawah Program", time: "Wednesday After Asr Prayer" },
        { title: "Weekly Deen Discussion", time: "Wednesday After Maghrib Prayer" },
        { title: "Daily Hadith Recitation", time: "After Isha Prayer" }
      ]
    },
    namazGuide: {
      title: "Namaz: Rakah & Rules",
      subtitle: "A simple reference for daily prayers.",
      rakahTitle: "Rakah Counts",
      rakahNote: "Counts may vary by sunnah and nafl practices.",
      rakahItems: [
        { name: "Fajr", detail: "2 Sunnah + 2 Fard" },
        { name: "Dhuhr", detail: "4 Sunnah + 4 Fard + 2 Sunnah" },
        { name: "Asr", detail: "4 Sunnah + 4 Fard" },
        { name: "Maghrib", detail: "3 Fard + 2 Sunnah" },
        { name: "Isha", detail: "4 Sunnah + 4 Fard + 2 Sunnah + Witr" },
        { name: "Jumu'ah (Friday)", detail: "Replaces Dhuhr: 2 Fard after khutbah" }
      ],
      rulesTitle: "Core Rules",
      rules: [
        "Perform wudu and ensure cleanliness of body, clothes, and place.",
        "Pray within the correct time for each salah.",
        "Face the Qiblah and make intention (niyyah).",
        "Maintain khushu (focus), avoid unnecessary movements or speech.",
        "Complete all pillars (standing, ruku, sujud, and tashahhud)."
      ],
      duasTitle: "Essential Duas & Recitations",
      transliterationEnLabel: "Transliteration (English)",
      transliterationBnLabel: "উচ্চারণ (বাংলা)",
      meaningEnLabel: "Meaning (English)",
      meaningBnLabel: "অর্থ (বাংলা)",
      hadithLabel: "Authentic Hadith",
      specialTitle: "Post-Prayer Adhkar",
      specialSubtitle: "Highlighted recitations with authentic hadith references.",
      duasItems: [
        {
          name: "Opening (Thana)",
          arabic:
            "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ",
          transliterationEn:
            "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",
          translationEn:
            "Glory is to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty, and none has the right to be worshiped but You.",
          transliterationBn: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা‘আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুকা।",
          translationBn: "হে আল্লাহ! তুমি পবিত্র, তোমারই প্রশংসা। তোমার নাম বরকতময়, তোমার মর্যাদা উচ্চ, এবং তুমি ছাড়া কোন ইলাহ নেই।"
        },
        {
          name: "Ruku",
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          transliterationEn: "Subhana Rabbiyal Azim.",
          translationEn: "Glory is to my Lord, the Most Great.",
          transliterationBn: "সুবহানা রব্বিয়াল আযীম।",
          translationBn: "আমার মহান রব পবিত্র।"
        },
        {
          name: "Sujud",
          arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
          transliterationEn: "Subhana Rabbiyal A'la.",
          translationEn: "Glory is to my Lord, the Most High.",
          transliterationBn: "সুবহানা রব্বিয়াল আ‘লা।",
          translationBn: "আমার সর্বোচ্চ রব পবিত্র।"
        },
        {
          name: "Tashahhud",
          arabic:
            "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
          transliterationEn:
            "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
          translationEn:
            "All greetings, prayers, and good deeds are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.",
          transliterationBn:
            "আত্তাহিয়্যাতু লিল্লাহি ওয়াসসালাওয়াতু ওয়াত্তয়্যিবাত। আসসালামু আলাইকা আইয়্যুহান্নাবিয়্যু ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহ। আসসালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহিন। আশহাদু আল্লাহা ইল্লাল্লাহ, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহ।",
          translationBn:
            "সব সম্মান, নামাজ ও পবিত্র কথা আল্লাহর জন্য। হে নবী! আপনার উপর শান্তি বর্ষিত হোক এবং আল্লাহর রহমত ও বরকত। আমাদের উপর এবং আল্লাহর সৎ বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া আর কোনো ইলাহ নেই এবং মুহাম্মদ তাঁর বান্দা ও রাসূল।"
        },
        {
          name: "Durood Ibrahim",
          arabic:
            "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
          transliterationEn:
            "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad, kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik 'ala Muhammad wa 'ala ali Muhammad, kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid.",
          translationEn:
            "O Allah, send prayers upon Muhammad and the family of Muhammad as You sent prayers upon إبراهيم and the family of إبراهيم. You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed إبراهيم and the family of إبراهيم. You are Praiseworthy and Glorious.",
          transliterationBn:
            "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদ ওয়া আলা আলি মুহাম্মাদ, কামা সাল্লাইতা আলা ইব্রাহিম ওয়া আলা আলি ইব্রাহিম, ইন্নাকা হামিদুম মজিদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদ ওয়া আলা আলি মুহাম্মাদ, কামা বারাকতা আলা ইব্রাহিম ওয়া আলা আলি ইব্রাহিম, ইন্নাকা হামিদুম মজিদ।",
          translationBn:
            "হে আল্লাহ! মুহাম্মদ ও তাঁর পরিবারকে দরুদ পাঠ করুন যেমন আপনি ইব্রাহিম ও তাঁর পরিবারকে দরুদ পাঠ করেছেন। আপনি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! মুহাম্মদ ও তাঁর পরিবারকে বরকত দিন যেমন আপনি ইব্রাহিম ও তাঁর পরিবারকে বরকত দিয়েছেন।"
        },
        {
          name: "Qunoot (Witr)",
          arabic:
            "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ، وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ، وَنُثْنِي عَلَيْكَ الْخَيْرَ، وَنَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ. اللَّهُمَّ إِيَّاكَ نَعْبُدُ، وَلَكَ نُصَلِّي وَنَسْجُدُ، وَإِلَيْكَ نَسْعَى وَنَحْفِدُ، وَنَرْجُو رَحْمَتَكَ، وَنَخْشَى عَذَابَكَ، إِنَّ عَذَابَكَ الْجِدَّ بِالْكُفَّارِ مُلْحِقٌ",
          transliterationEn:
            "Allahumma inna nasta'inuka wa nastaghfiruk, wa nu'minu bika wa natawakkalu 'alayk, wa nuthni 'alaykal khayr, wa nashkuruka wa la nakfuruk, wa nakhla'u wa natruku man yafjuruk. Allahumma iyyaka na'budu, wa laka nusalli wa nasjudu, wa ilayka nas'a wa nahfidu, wa narju rahmataka, wa nakhsha 'adhabaka, inna 'adhabaka al-jidda bil-kuffari mulhiq.",
          translationEn:
            "O Allah, we seek Your help and Your forgiveness. We believe in You and rely on You. We praise You with all goodness, we thank You and do not deny You. We disassociate from and abandon whoever disobeys You. O Allah, You alone we worship; to You we pray and prostrate, towards You we strive and hasten. We hope for Your mercy and fear Your punishment. Indeed, Your severe punishment will overtake the disbelievers.",
          transliterationBn:
            "আল্লাহুম্মা ইন্না নাস্তা‘ইনুকা ওয়া নাস্তাগফিরুকা, ওয়া নু’মিনু বিকা ওয়া নাতাওয়াক্কালু ‘আলাইক, ওয়া নুছনি ‘আলাইকাল খাইর, ওয়া নাশকুরুকা ওয়া লা নাকফুরুকা, ওয়া নাখলাউ ওয়া নাতরুকু মান ইয়াফজুরুকা। আল্লাহুম্মা ইইয়াকা না‘বুদু, ওয়া লাকা নুসাল্লি ওয়া নাসজুদু, ওয়া ইলাইকা নাস‘আ ওয়া নাহফিদু, ওয়া নারজু রাহমাতাকা, ওয়া নাখশা আযাবাকা, ইন্না আযাবাকা আল-জিদ্দা বিল-কুফফারি মুলহিক।",
          translationBn:
            "হে আল্লাহ! আমরা আপনার সাহায্য চাই এবং আপনার ক্ষমা প্রার্থনা করি। আমরা আপনার ওপর ঈমান রাখি ও আপনার ওপর ভরসা করি। আমরা আপনার প্রশংসা করি উত্তম কথায়, আপনার শোকর করি এবং অকৃতজ্ঞ হই না। আমরা তাদের থেকে বিচ্ছিন্ন হই ও ত্যাগ করি যারা আপনার অবাধ্য হয়। হে আল্লাহ! আমরা কেবল আপনারই ইবাদত করি, আপনারই জন্য নামাজ পড়ি ও সিজদা করি। আপনার দিকেই আমরা ছুটে যাই ও সেবায় দ্রুত অগ্রসর হই। আমরা আপনার রহমত আশা করি এবং আপনার শাস্তিকে ভয় করি। নিশ্চয়ই আপনার কঠিন শাস্তি কাফেরদের ওপর পতিত হবে।"
        },
        {
          name: "Rabbana (Between Two Sujud)",
          arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي",
          transliterationEn: "Rabbighfir li warhamni wahdini wa 'afini warzuqni.",
          translationEn: "My Lord, forgive me, have mercy on me, guide me, grant me well-being, and provide for me.",
          transliterationBn: "রব্বিগফির লি ওয়ারহামনি ওয়াহদিনি ওয়া ‘আফিনি ওয়ারযুকনি।",
          translationBn: "হে আমার রব! আমাকে ক্ষমা করুন, দয়া করুন, হেদায়েত দিন, সুস্থতা দিন এবং রিজিক দিন।"
        },
        {
          name: "Masura Dua",
          arabic:
            "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
          transliterationEn:
            "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal khasirin.",
          translationEn:
            "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy on us, we will surely be among the losers.",
          transliterationBn:
            "রব্বানা জালামনা আনফুসানা ওয়া ইন লাম তাগফির লানা ওয়া তারহামনা লানাকুনান্না মিনাল খাসিরিন।",
          translationBn:
            "হে আমাদের রব! আমরা নিজেদের উপর জুলুম করেছি। আপনি যদি আমাদের ক্ষমা না করেন ও দয়া না করেন তবে আমরা অবশ্যই ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।"
        },
      ],
      specialItems: [
        {
          name: "Ayatul Kursi",
          arabic:
            "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          transliterationEn:
            "Allahu la ilaha illa Huwa al-Hayyul Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bishay'in min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifzuhuma. Wa Huwal 'Aliyyul 'Azim.",
          translationEn:
            "Allah—there is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation does not tire Him. And He is the Most High, the Most Great.",
          transliterationBn:
            "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়্যুল কাইয়্যুম। লা তা’খুজুহু সিনাতুন ওয়া লা নাওম। লাহু মা ফিস্-সামাওয়াতি ওয়া মা ফিল-আরদ। মান্‌যাল্লাজি ইয়াশফা‘উ ‘ইনদাহু ইল্লা বিইযনিহ। ইয়ালামু মা বাইনা আইদিহিম ওয়া মা খালফাহুম। ওয়া লা ইয়ুহিতুনা বিশাই’ইম মিন ‘ইলমিহি ইল্লা বিমা শা’আ। ওয়াসি‘আ কুরসিয়্যুহুস্-সামাওয়াতি ওয়াল-আরদ। ওয়া লা ইয়াউদুহু হিফজুহুমা। ওয়া হুয়াল ‘আলিয়্যুল ‘আজিম।",
          translationBn:
            "আল্লাহ—তিনি ছাড়া কোনো ইলাহ নেই; তিনি চিরঞ্জীব, সর্বপ্রতিষ্ঠিত। তাঁকে তন্দ্রা বা নিদ্রা স্পর্শ করে না। আসমানসমূহ ও জমিনে যা কিছু আছে সবই তাঁর। তাঁর অনুমতি ছাড়া কে তাঁর কাছে সুপারিশ করবে? তিনি জানেন তাদের সামনে ও পেছনে যা আছে। তাঁর জ্ঞানের কিছুই তারা আয়ত্ত করতে পারে না—যতটুকু তিনি চান। তাঁর কুরসী আসমানসমূহ ও জমিনকে পরিব্যাপ্ত করে আছে, আর এদের হেফাজত তাঁকে ক্লান্ত করে না। আর তিনি সর্বোচ্চ, মহান।",
          hadiths: [
            {
              text: "Whoever recites Ayat al-Kursi at night will have a protector from Allah and no devil will approach him until morning.",
              ref: "Sahih al-Bukhari 2311"
            },
            {
              text: "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing prevents him from entering Paradise except death.",
              ref: "Sunan an-Nasa'i 992"
            }
          ]
        },
        {
          name: "Sayyidul Istighfar",
          arabic:
            "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
          transliterationEn:
            "Allahumma anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu. A'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bi dhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta.",
          translationEn:
            "O Allah, You are my Lord. None has the right to be worshiped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
          transliterationBn:
            "আল্লাহুম্মা আনতা রব্বি লা ইলাহা ইল্লা আনতা, খালাকতানি ওয়া আনা ‘আবদুকা, ওয়া আনা ‘আলা ‘আহদিকা ওয়া ওয়া‘দিকা মস্তাতা‘তু। আ‘উযু বিকা মিন শার্রি মা সান‘তু, আবু’উ লাকা বিনি‘মাতিকা ‘আলাইয়া, ওয়া আবু’উ বিযাম্বি ফাগফির লি, ফা ইন্নাহু লা ইয়াগফিরুধ্-ধুনুবা ইল্লা আনতা।",
          translationBn:
            "হে আল্লাহ! আপনি আমার রব; আপনি ছাড়া কোনো ইলাহ নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা। আমি যতটুকু পারি আপনার অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে আপনার আশ্রয় চাই। আমি আপনার দয়া স্বীকার করছি এবং আমার গুনাহ স্বীকার করছি; অতএব আমাকে ক্ষমা করুন। আপনি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না।",
          hadiths: [
            {
              text: "Whoever says this in the morning with firm belief and dies before evening will enter Paradise; and whoever says it in the evening with firm belief and dies before morning will enter Paradise.",
              ref: "Sahih al-Bukhari 6306"
            }
          ]
        }
      ]
    },
    hadithLibrary: {
      title: "Authentic Hadith Library",
      subtitle: "Selected authentic hadiths by topic.",
      categories: [
        {
          title: "Prayer",
          items: [
            {
              text: "The first matter that the slave will be brought to account for on the Day of Resurrection is the prayer.",
              ref: "Sunan Abu Dawud 864"
            },
            {
              text: "The closest that a servant comes to his Lord is when he is prostrating.",
              ref: "Sahih Muslim 482"
            },
            {
              text: "Straighten your rows, for straightening the rows is part of establishing the prayer.",
              ref: "Sahih al-Bukhari 722"
            },
            {
              text: "Between a man and shirk and kufr is the abandonment of prayer.",
              ref: "Sahih Muslim 82"
            },
            {
              text: "If people knew the reward of the call to prayer and the first row, they would draw lots for it.",
              ref: "Sahih al-Bukhari 615"
            }
          ]
        },
        {
          title: "Charity",
          items: [
            { text: "Charity does not decrease wealth.", ref: "Sahih Muslim 2588" },
            { text: "The believer’s shade on the Day of Resurrection will be his charity.", ref: "Jami` at-Tirmidhi 604" },
            { text: "Protect yourselves from the Fire, even with half a date.", ref: "Sahih al-Bukhari 1417" },
            { text: "Every good deed is charity.", ref: "Sahih al-Bukhari 6021" },
            { text: "Charity extinguishes sin as water extinguishes fire.", ref: "Jami` at-Tirmidhi 614" }
          ]
        },
        {
          title: "Knowledge",
          items: [
            { text: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.", ref: "Sahih Muslim 2699" },
            { text: "The best among you are those who learn the Qur'an and teach it.", ref: "Sahih al-Bukhari 5027" },
            { text: "Seeking knowledge is an obligation upon every Muslim.", ref: "Sunan Ibn Majah 224" },
            { text: "The scholars are the heirs of the prophets.", ref: "Sunan Abu Dawud 3641" },
            { text: "The angels lower their wings for the seeker of knowledge.", ref: "Jami` at-Tirmidhi 2682" }
          ]
        },
        {
          title: "Character",
          items: [
            { text: "The heaviest thing on the believer’s scale is good character.", ref: "Jami` at-Tirmidhi 2003" },
            { text: "None of you truly believes until he loves for his brother what he loves for himself.", ref: "Sahih al-Bukhari 13" },
            { text: "The most beloved to me and nearest to me on the Day of Resurrection are those of you who have the best character.", ref: "Jami` at-Tirmidhi 2018" },
            { text: "The best of you are those who are best in character.", ref: "Sahih al-Bukhari 6029" },
            { text: "The strong is not the one who overcomes people by his strength, but the one who controls himself while in anger.", ref: "Sahih al-Bukhari 6114" }
          ]
        }
      ]
    },
    prayerDisplay: {
      kicker: "Prayer Schedule",
      today: "Today",
      adhan: "Adhan",
      iqamah: "Iqamah",
      timeLeft: "Time left",
      next: "Next",
      friday: "Friday",
      fridayOnly: "Friday only"
    },
    poster: {
      kicker: "Donation Campaign",
      ctaTitle: "Support the Mosque",
      ctaSubtitle: "Scan the QR code or use bKash to donate.",
      bkashLabel: "bKash Number",
      scan: "Scan to donate",
      scanHint: "Open your camera or any QR scanner.",
      print: "Print Poster",
      download: "Download Poster",
      downloading: "Preparing..."
    },
    campaignDetail: {
      label: "Donation Campaign",
      donateTitle: "Donate to this campaign",
      donateSubtitle:
        "Send your bKash donation and submit the transaction details. The admin will confirm once received.",
      bkashTitle: "bKash Number",
      bkashSubtitle: "Send your donation to the number below, then submit the transaction ID.",
      supportNote: "Need help? Contact the mosque office for guidance.",
      shareTitle: "Share this campaign",
      shareButton: "Copy link",
      shareCopied: "Copied"
    },
    language: {
      label: "Language",
      english: "English",
      bangla: "বাংলা"
    },
    menu: {
      open: "Menu",
      close: "Close"
    },
    loading: "Loading...",
    announcementLabel: "Announcement",
    admin: {
      title: "Admin Dashboard",
      subtitle: "Manage prayer times, confirm donations, and update hadiths.",
      nav: {
        prayer: "Prayer Times",
        donations: "Donations",
        campaigns: "Campaigns",
        hadiths: "Hadiths",
        announcements: "Announcements",
        displays: "Displays"
      },
      logout: "Log out",
      prayer: {
        title: "Prayer Times",
        hint: "Edit & save per row",
        updated: "Prayer times updated.",
        table: {
          prayer: "Prayer",
          prayerBn: "Bangla Name",
          adhan: "Adhan Time",
          iqamah: "Iqamah Time",
          update: "Update"
        },
        save: "Save"
      },
      donations: {
        addTitle: "Add Donation",
        addHint: "Creates a confirmed entry",
        pendingTitle: "Pending Donations",
        pendingHint: "Confirm when received",
        confirmedTitle: "Approved Donations",
        confirmedHint: "Visible on the public site",
        fields: {
          name: "Donor name",
          amount: "Amount (BDT)",
          campaign: "Select campaign (optional)",
          bkash: "bKash number",
          trx: "Transaction ID",
          note: "Note (optional)",
          submit: "Add Donation"
        },
        table: {
          name: "Name",
          amount: "Amount",
          bkash: "bKash",
          trx: "Transaction",
          confirm: "Confirm",
          delete: "Delete",
          empty: "No pending donations."
        },
        confirm: "Confirm",
        delete: "Delete",
        deleteTitle: "Delete donation?",
        deleteMessage: "This will remove the donation permanently.",
        deleteCancel: "Cancel",
        deleteConfirm: "Delete"
      },
      campaigns: {
        title: "Donation Campaigns",
        create: "Create",
        fields: {
          title: "Campaign title",
          goal: "Goal amount (BDT)",
          description: "Campaign description"
        },
        table: {
          title: "Title",
          goal: "Goal",
          progress: "Progress",
          status: "Status",
          assets: "QR & Poster",
          action: "Action",
          empty: "No campaigns yet."
        },
        qrEn: "QR EN",
        qrBn: "QR BN",
        posterEn: "Poster EN",
        posterBn: "Poster BN",
        archive: "Archive",
        restore: "Restore",
        active: "Active",
        archived: "Archived"
      },
      hadiths: {
        title: "Hadiths",
        fields: {
          text: "Hadith text",
          source: "Source"
        },
        add: "Add Hadith",
        table: {
          text: "Hadith",
          source: "Source",
          remove: "Remove"
        },
        delete: "Delete"
      },
      announcements: {
        title: "Announcements",
        create: "Create",
        fields: {
          title: "Title",
          titleBn: "Title (Bangla)",
          message: "Message",
          messageBn: "Message (Bangla)",
          start: "Start date & time",
          end: "End date & time"
        },
        table: {
          title: "Title",
          period: "Period",
          status: "Status",
          action: "Action",
          empty: "No announcements yet."
        },
        active: "Active",
        archived: "Archived",
        archive: "Archive",
        restore: "Restore",
        delete: "Delete"
      },
      displays: {
        title: "Display Posters",
        subtitle: "Generate QR codes and posters for mosque display screens.",
        prayerTitle: "Prayer Time Display",
        prayerSubtitle: "Use this QR code for the digital prayer display page.",
        qrEn: "QR EN",
        qrBn: "QR BN",
        posterEn: "Poster EN",
        posterBn: "Poster BN",
        posterHint: "Share the prayer schedule screen for the mosque.",
        openLink: "Open with QR",
        qrLabel: "Display QR",
        qrHint: "Scan to open the prayer display",
        posterKicker: "Prayer Display",
        posterTitle: "Prayer Time Schedule",
        posterCardTitle: "For Mosque Display",
        posterCardBody: "Scan this QR to open the digital prayer schedule.",
        posterScanTitle: "Scan to open",
        posterScanHint: "Use any camera or QR scanner."
      }
    },
    login: {
      title: "Admin Login",
      subtitle: "Use the fixed credentials to access the dashboard.",
      username: "Username",
      password: "Password",
      button: "Login",
      back: "Back to homepage",
      show: "Show",
      hide: "Hide",
      error: "Invalid credentials."
    }
  },
  bn: {
    nav: {
      prayer: "নামাজের সময়",
      donate: "দান করুন",
      campaigns: "ক্যাম্পেইন",
      hadith: "হাদিস",
      guides: "গাইড",
      admin: "এডমিন",
      home: "হোম"
    },
    brand: {
      name: "বাইতুন নাজাত জামে মসজিদ",
      address: "খারামপট্টি, কিশোরগঞ্জ, ঢাকা বিভাগ"
    },
    hero: {
      title: "আল্লাহর নামে, যিনি পরম করুণাময়।",
      subtitle:
        "বাইতুন নাজাত জামে মসজিদে আপনাকে স্বাগতম। এখানে নিয়মিত নামাজ, কুরআন শিক্ষা এবং সামাজিক সেবা পরিচালিত হয়।",
      cta: "আমাদের কমিউনিটিতে যোগ দিন",
      friday: "প্রতি শুক্রবার: জুমুআ ১:৩০ PM",
      highlightsTitle: "কমিউনিটি হাইলাইটস",
      highlights: ["প্রতিদিনের সালাত ও জুমুআ", "সন্ধ্যার কুরআন ক্লাস", "মাসিক দান কার্যক্রম"]
    },
    prayer: {
      title: "নামাজের সময়সূচি",
      subtitle:
        "বাইতুন নাজাত জামে মসজিদের হালনাগাদ সময়সূচি। বিশেষ ঘোষণার জন্য নোটিশ বোর্ড দেখুন।",
      table: {
        prayer: "ওয়াক্ত",
        adhan: "আজান সময়",
        iqamah: "ইকামত সময়"
      }
    },
    donate: {
      title: "দান করুন",
      subtitle:
        "বিকাশের মাধ্যমে দান করুন। নিচের নম্বরে পাঠিয়ে লেনদেনের তথ্য জমা দিন। এডমিন নিশ্চিত করলে তালিকায় দেখাবে।",
      formTitle: "দান ফর্ম",
      confirmedTitle: "নিশ্চিত দান",
      confirmedSubtitle: "এডমিন দ্বারা নিশ্চিত দানগুলো এখানে দাতার নামসহ দেখানো হয়।",
      empty: "এখনও কোনো নিশ্চিত দান নেই।",
      table: {
        name: "নাম",
        amount: "পরিমাণ",
        date: "তারিখ"
      },
      fields: {
        campaign: "দান ক্যাম্পেইন নির্বাচন করুন (ঐচ্ছিক)",
        name: "পূর্ণ নাম",
        amount: "পরিমাণ (BDT)",
        bkash: "আপনার বিকাশ নম্বর",
        trx: "ট্রানজাকশন আইডি",
        note: "মন্তব্য (ঐচ্ছিক)",
        submit: "দান জমা দিন"
      }
    },
    campaigns: {
      title: "দান ক্যাম্পেইন",
      subtitle: "মসজিদ ও কমিউনিটির জন্য চলমান দান ক্যাম্পেইনসমূহ।",
      viewAll: "সব দেখুন",
      noActive: "এখন কোনো সক্রিয় ক্যাম্পেইন নেই।",
      goal: "লক্ষ্য",
      collected: "সংগ্রহ",
      remaining: "অবশিষ্ট",
      viewCampaign: "ক্যাম্পেইন দেখুন →"
    },
    hadith: {
      title: "আজকের হাদিস",
      subtitle: "যা আমাদের কমিউনিটিকে অনুপ্রাণিত করে।"
    },
    footer: {
      title: "বাইতুন নাজাত জামে মসজিদ",
      address: "খারামপট্টি, কিশোরগঞ্জ, ঢাকা বিভাগ, বাংলাদেশ",
      contact: "যোগাযোগ",
      phone: "ফোন: +৮৮০ ১XXXXXXXXX",
      email: "ইমেইল: info@baitunnajat.org",
      website: "ওয়েবসাইট",
      quick: "দ্রুত লিংক",
      quickItems: ["নামাজের সময়", "দান", "কমিউনিটি আপডেট"]
    },
    location: {
      title: "মসজিদের অবস্থান",
      subtitle: "খারামপট্টি, কিশোরগঞ্জে বাইতুন নাজাত জামে মসজিদ।"
    },
    guides: {
      title: "গাইড ও শিক্ষা",
      subtitle: "নামাজ ও সহিহ হাদিসের দ্রুত রেফারেন্স।",
      namazTitle: "নামাজ: রাকাত ও নিয়ম",
      namazSubtitle: "দৈনিক নামাজের রাকাত ও মূল নিয়মাবলি।",
      namazCta: "নামাজ গাইড দেখুন",
      hadithTitle: "সহিহ হাদিস",
      hadithSubtitle: "বিষয়ভিত্তিক সহিহ হাদিসের তালিকা।",
      hadithCta: "হাদিস লাইব্রেরি দেখুন"
    },
    teacher: {
      title: "কুরআন ও হাদিস শিক্ষা সহায়তা",
      subtitle: "নিজে বা শিশুদের কুরআন ও হাদিস শিখতে যোগাযোগ করুন:",
      nameLabel: "নাম",
      postLabel: "পদবী",
      phoneLabel: "নম্বর",
      name: "Md Abdul Sunny",
      post: "মুয়াজ্জিন, বাইতুন নাজাত জামে মসজিদ",
      phone: "+8801948008918"
    },
    events: {
      title: "দৈনিক ও সাপ্তাহিক আয়োজন",
      subtitle: "মসজিদে নিয়মিত কার্যক্রম।",
      items: [
        { title: "দৈনিক মাসহোয়ারা", time: "ফজরের পর প্রতিদিন" },
        { title: "সাপ্তাহিক দাওয়াহ প্রোগ্রাম", time: "বুধবার আসরের পর" },
        { title: "সাপ্তাহিক দ্বীন আলোচনা", time: "বুধবার মাগরিবের পর" },
        { title: "দৈনিক হাদিস পাঠ", time: "ইশার পর" }
      ]
    },
    namazGuide: {
      title: "নামাজ: রাকাত ও নিয়ম",
      subtitle: "দৈনিক নামাজের সহজ রেফারেন্স।",
      rakahTitle: "রাকাত সংখ্যা",
      rakahNote: "সুন্নত ও নফল রাকাত ভিন্ন হতে পারে।",
      rakahItems: [
        { name: "ফজর", detail: "২ সুন্নত + ২ ফরজ" },
        { name: "যোহর", detail: "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত" },
        { name: "আসর", detail: "৪ সুন্নত + ৪ ফরজ" },
        { name: "মাগরিব", detail: "৩ ফরজ + ২ সুন্নত" },
        { name: "এশা", detail: "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + বিতর" },
        { name: "জুমুআ (শুক্রবার)", detail: "যোহরের পরিবর্তে: খুতবার পর ২ ফরজ" }
      ],
      rulesTitle: "মূল নিয়মাবলি",
      rules: [
        "ওজু করে শরীর, পোশাক ও জায়গা পরিষ্কার রাখুন।",
        "প্রতিটি নামাজের নির্ধারিত সময়ে আদায় করুন।",
        "কিবলার দিকে মুখ করে নিয়ত করুন।",
        "খুশু বজায় রাখুন, অপ্রয়োজনীয় কাজ এড়িয়ে চলুন।",
        "রুকু, সিজদা ও তাশাহহুদসহ সব ফরজ ঠিকভাবে করুন।"
      ],
      duasTitle: "প্রয়োজনীয় দোয়া ও তিলাওয়াত",
      transliterationEnLabel: "উচ্চারণ (English)",
      transliterationBnLabel: "উচ্চারণ (বাংলা)",
      meaningEnLabel: "অর্থ (English)",
      meaningBnLabel: "অর্থ (বাংলা)",
      hadithLabel: "সহিহ হাদিস",
      specialTitle: "নামাজ-পরবর্তী আমল",
      specialSubtitle: "সহিহ হাদিসের আলোকে গুরুত্বপূর্ণ তিলাওয়াত।",
      duasItems: [
        {
          name: "সানা",
          arabic:
            "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ",
          transliterationEn:
            "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",
          translationEn:
            "Glory is to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty, and none has the right to be worshiped but You.",
          transliterationBn: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা‘আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুকা।",
          translationBn: "হে আল্লাহ! তুমি পবিত্র, তোমারই প্রশংসা। তোমার নাম বরকতময়, তোমার মর্যাদা উচ্চ, এবং তুমি ছাড়া কোন ইলাহ নেই।"
        },
        {
          name: "রুকু",
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          transliterationEn: "Subhana Rabbiyal Azim.",
          translationEn: "Glory is to my Lord, the Most Great.",
          transliterationBn: "সুবহানা রব্বিয়াল আযীম।",
          translationBn: "আমার মহান রব পবিত্র।"
        },
        {
          name: "সিজদা",
          arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
          transliterationEn: "Subhana Rabbiyal A'la.",
          translationEn: "Glory is to my Lord, the Most High.",
          transliterationBn: "সুবহানা রব্বিয়াল আ‘লা।",
          translationBn: "আমার সর্বোচ্চ রব পবিত্র।"
        },
        {
          name: "তাশাহহুদ",
          arabic:
            "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
          transliterationEn:
            "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
          translationEn:
            "All greetings, prayers, and good deeds are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.",
          transliterationBn:
            "আত্তাহিয়্যাতু লিল্লাহি ওয়াসসালাওয়াতু ওয়াত্তয়্যিবাত। আসসালামু আলাইকা আইয়্যুহান্নাবিয়্যু ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহ। আসসালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহিন। আশহাদু আল্লাহা ইল্লাল্লাহ, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহ।",
          translationBn:
            "সব সম্মান, নামাজ ও পবিত্র কথা আল্লাহর জন্য। হে নবী! আপনার উপর শান্তি বর্ষিত হোক এবং আল্লাহর রহমত ও বরকত। আমাদের উপর এবং আল্লাহর সৎ বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া আর কোনো ইলাহ নেই এবং মুহাম্মদ তাঁর বান্দা ও রাসূল।"
        },
        {
          name: "দরুদ ইব্রাহিম",
          arabic:
            "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
          transliterationEn:
            "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad, kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik 'ala Muhammad wa 'ala ali Muhammad, kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid.",
          translationEn:
            "O Allah, send prayers upon Muhammad and the family of Muhammad as You sent prayers upon Ibrahim and the family of Ibrahim. You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Ibrahim and the family of Ibrahim.",
          transliterationBn:
            "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদ ওয়া আলা আলি মুহাম্মাদ, কামা সাল্লাইতা আলা ইব্রাহিম ওয়া আলা আলি ইব্রাহিম, ইন্নাকা হামিদুম মজিদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদ ওয়া আলা আলি মুহাম্মাদ, কামা বারাকতা আলা ইব্রাহিম ওয়া আলা আলি ইব্রাহিম, ইন্নাকা হামিদুম মজিদ।",
          translationBn:
            "হে আল্লাহ! মুহাম্মদ ও তাঁর পরিবারকে দরুদ পাঠ করুন যেমন আপনি ইব্রাহিম ও তাঁর পরিবারকে দরুদ পাঠ করেছেন। আপনি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! মুহাম্মদ ও তাঁর পরিবারকে বরকত দিন যেমন আপনি ইব্রাহিম ও তাঁর পরিবারকে বরকত দিয়েছেন।"
        },
        {
          name: "কুনুত (বিতর)",
          arabic:
            "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ، وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ، وَنُثْنِي عَلَيْكَ الْخَيْرَ، وَنَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ. اللَّهُمَّ إِيَّاكَ نَعْبُدُ، وَلَكَ نُصَلِّي وَنَسْجُدُ، وَإِلَيْكَ نَسْعَى وَنَحْفِدُ, وَنَرْجُو رَحْمَتَكَ، وَنَخْشَى عَذَابَكَ، إِنَّ عَذَابَكَ الْجِدَّ بِالْكُفَّارِ مُلْحِقٌ",
          transliterationEn:
            "Allahumma inna nasta'inuka wa nastaghfiruk, wa nu'minu bika wa natawakkalu 'alayk, wa nuthni 'alaykal khayr, wa nashkuruka wa la nakfuruk, wa nakhla'u wa natruku man yafjuruk. Allahumma iyyaka na'budu, wa laka nusalli wa nasjudu, wa ilayka nas'a wa nahfidu, wa narju rahmataka, wa nakhsha 'adhabaka, inna 'adhabaka al-jidda bil-kuffari mulhiq.",
          translationEn:
            "O Allah, we seek Your help and Your forgiveness. We believe in You and rely on You. We praise You with all goodness, we thank You and do not deny You. We disassociate from and abandon whoever disobeys You. O Allah, You alone we worship; to You we pray and prostrate, towards You we strive and hasten. We hope for Your mercy and fear Your punishment. Indeed, Your severe punishment will overtake the disbelievers.",
          transliterationBn:
            "আল্লাহুম্মা ইন্না নাস্তা‘ইনুকা ওয়া নাস্তাগফিরুকা, ওয়া নু’মিনু বিকা ওয়া নাতাওয়াক্কালু ‘আলাইক, ওয়া নুছনি ‘আলাইকাল খাইর, ওয়া নাশকুরুকা ওয়া লা নাকফুরুকা, ওয়া নাখলাউ ওয়া নাতরুকু মান ইয়াফজুরুকা। আল্লাহুম্মা ইইয়াকা না‘বুদু, ওয়া লাকা নুসাল্লি ওয়া নাসজুদু, ওয়া ইলাইকা নাস‘আ ওয়া নাহফিদু, ওয়া নারজু রাহমাতাকা, ওয়া নাখশা আযাবাকা, ইন্না আযাবাকা আল-জিদ্দা বিল-কুফফারি মুলহিক।",
          translationBn:
            "হে আল্লাহ! আমরা আপনার সাহায্য চাই এবং আপনার ক্ষমা প্রার্থনা করি। আমরা আপনার ওপর ঈমান রাখি ও আপনার ওপর ভরসা করি। আমরা আপনার প্রশংসা করি উত্তম কথায়, আপনার শোকর করি এবং অকৃতজ্ঞ হই না। আমরা তাদের থেকে বিচ্ছিন্ন হই ও ত্যাগ করি যারা আপনার অবাধ্য হয়। হে আল্লাহ! আমরা কেবল আপনারই ইবাদত করি, আপনারই জন্য নামাজ পড়ি ও সিজদা করি। আপনার দিকেই আমরা ছুটে যাই ও সেবায় দ্রুত অগ্রসর হই। আমরা আপনার রহমত আশা করি এবং আপনার শাস্তিকে ভয় করি। নিশ্চয়ই আপনার কঠিন শাস্তি কাফেরদের ওপর পতিত হবে।"
        },
        {
          name: "রব্বানা (দুই সিজদার মাঝে)",
          arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي",
          transliterationEn: "Rabbighfir li warhamni wahdini wa 'afini warzuqni.",
          translationEn: "My Lord, forgive me, have mercy on me, guide me, grant me well-being, and provide for me.",
          transliterationBn: "রব্বিগফির লি ওয়ারহামনি ওয়াহদিনি ওয়া ‘আফিনি ওয়ারযুকনি।",
          translationBn: "হে আমার রব! আমাকে ক্ষমা করুন, দয়া করুন, হেদায়েত দিন, সুস্থতা দিন এবং রিজিক দিন।"
        },
        {
          name: "দোয়া মাসূরা",
          arabic:
            "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
          transliterationEn:
            "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal khasirin.",
          translationEn:
            "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy on us, we will surely be among the losers.",
          transliterationBn:
            "রব্বানা জালামনা আনফুসানা ওয়া ইন লাম তাগফির লানা ওয়া তারহামনা লানাকুনান্না মিনাল খাসিরিন।",
          translationBn:
            "হে আমাদের রব! আমরা নিজেদের উপর জুলুম করেছি। আপনি যদি আমাদের ক্ষমা না করেন ও দয়া না করেন তবে আমরা অবশ্যই ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।"
        },
      ],
      specialItems: [
        {
          name: "আয়াতুল কুরসি",
          arabic:
            "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          transliterationEn:
            "Allahu la ilaha illa Huwa al-Hayyul Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bishay'in min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifzuhuma. Wa Huwal 'Aliyyul 'Azim.",
          translationEn:
            "Allah—there is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation does not tire Him. And He is the Most High, the Most Great.",
          transliterationBn:
            "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়্যুল কাইয়্যুম। লা তা’খুজুহু সিনাতুন ওয়া লা নাওম। লাহু মা ফিস্-সামাওয়াতি ওয়া মা ফিল-আরদ। মান্‌যাল্লাজি ইয়াশফা‘উ ‘ইনদাহু ইল্লা বিইযনিহ। ইয়ালামু মা বাইনা আইদিহিম ওয়া মা খালফাহুম। ওয়া লা ইয়ুহিতুনা বিশাই’ইম মিন ‘ইলমিহি ইল্লা বিমা শা’আ। ওয়াসি‘আ কুরসিয়্যুহস্-সামাওয়াতি ওয়াল-আরদ। ওয়া লা ইয়াউদুহু হিফজুহুমা। ওয়া হুয়াল ‘আলিয়্যুল ‘আজিম।",
          translationBn:
            "আল্লাহ—তিনি ছাড়া কোনো ইলাহ নেই; তিনি চিরঞ্জীব, সর্বপ্রতিষ্ঠিত। তাঁকে তন্দ্রা বা নিদ্রা স্পর্শ করে না। আসমানসমূহ ও জমিনে যা কিছু আছে সবই তাঁর। তাঁর অনুমতি ছাড়া কে তাঁর কাছে সুপারিশ করবে? তিনি জানেন তাদের সামনে ও পেছনে যা আছে। তাঁর জ্ঞানের কিছুই তারা আয়ত্ত করতে পারে না—যতটুকু তিনি চান। তাঁর কুরসী আসমানসমূহ ও জমিনকে পরিব্যাপ্ত করে আছে, আর এদের হেফাজত তাঁকে ক্লান্ত করে না। আর তিনি সর্বোচ্চ, মহান।",
          hadiths: [
            {
              text: "রাতে আয়াতুল কুরসি পড়লে আল্লাহর পক্ষ থেকে রক্ষাকারী থাকে এবং সকাল পর্যন্ত শয়তান কাছে আসে না।",
              ref: "সহিহ আল-বুখারি ২৩১১"
            },
            {
              text: "প্রত্যেক ফরজ নামাজের পর আয়াতুল কুরসি পড়লে মৃত্যু ছাড়া জান্নাতে প্রবেশে আর কিছু বাধা থাকে না।",
              ref: "সুনান আন-নাসাঈ ৯৯২"
            }
          ]
        },
        {
          name: "সাইয়্যিদুল ইস্তেগফার",
          arabic:
            "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
          transliterationEn:
            "Allahumma anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu. A'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bi dhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta.",
          translationEn:
            "O Allah, You are my Lord. None has the right to be worshiped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
          transliterationBn:
            "আল্লাহুম্মা আনতা রব্বি লা ইলাহা ইল্লা আনতা, খালাকতানি ওয়া আনা ‘আবদুকা, ওয়া আনা ‘আলা ‘আহদিকা ওয়া ওয়া‘দিকা মস্তাতা‘তু। আ‘উযু বিকা মিন শার্রি মা সান‘তু, আবু’উ লাকা বিনি‘মাতিকা ‘আলাইয়া, ওয়া আবু’উ বিযাম্বি ফাগফির লি, ফা ইন্নাহু লা ইয়াগফিরুধ্-ধুনুবা ইল্লা আনতা।",
          translationBn:
            "হে আল্লাহ! আপনি আমার রব; আপনি ছাড়া কোনো ইলাহ নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা। আমি যতটুকু পারি আপনার অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে আপনার আশ্রয় চাই। আমি আপনার দয়া স্বীকার করছি এবং আমার গুনাহ স্বীকার করছি; অতএব আমাকে ক্ষমা করুন। আপনি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না।",
          hadiths: [
            {
              text: "যে ব্যক্তি এটি সকালে দৃঢ় বিশ্বাস নিয়ে বলে এবং সন্ধ্যার আগে মারা যায়, সে জান্নাতে প্রবেশ করবে; আর যে ব্যক্তি সন্ধ্যায় বলে এবং সকাল হওয়ার আগে মারা যায়, সে জান্নাতে প্রবেশ করবে।",
              ref: "সহিহ আল-বুখারি ৬৩০৬"
            }
          ]
        }
      ]
    },
    hadithLibrary: {
      title: "সহিহ হাদিস লাইব্রেরি",
      subtitle: "বিষয়ভিত্তিক সহিহ হাদিসের নির্বাচিত তালিকা।",
      categories: [
        {
          title: "নামাজ",
          items: [
            {
              text: "কিয়ামতের দিনে বান্দার সর্বপ্রথম হিসাব নেওয়া হবে নামাজ সম্পর্কে।",
              ref: "সুনান আবু দাউদ ৮৬৪"
            },
            {
              text: "বান্দা তার রবের সবচেয়ে নিকট থাকে সিজদার অবস্থায়।",
              ref: "সহিহ মুসলিম ৪৮২"
            },
            {
              text: "কাতার সোজা করো, কেননা কাতার সোজা করা নামাজ প্রতিষ্ঠার অংশ।",
              ref: "সহিহ আল-বুখারি ৭২২"
            },
            {
              text: "নামাজ ত্যাগ করাই শিরক ও কুফরের সাথে পার্থক্য।",
              ref: "সহিহ মুসলিম ৮২"
            },
            {
              text: "যদি মানুষ আজান ও প্রথম কাতারের ফজিলত জানত, তবে তারা এর জন্য লটারিও করত।",
              ref: "সহিহ আল-বুখারি ৬১৫"
            }
          ]
        },
        {
          title: "দান",
          items: [
            { text: "সদকা সম্পদ কমায় না।", ref: "সহিহ মুসলিম ২৫৮৮" },
            { text: "কিয়ামতের দিনে মুমিনের ছায়া হবে তার সদকা।", ref: "জামি` আত-তিরমিজি ৬০৪" },
            { text: "অর্ধেক খেজুর হলেও সদকা দিয়ে আগুন থেকে বাঁচার চেষ্টা করো।", ref: "সহিহ আল-বুখারি ১৪১৭" },
            { text: "প্রতিটি ভালো কাজই সদকা।", ref: "সহিহ আল-বুখারি ৬০২১" },
            { text: "সদকা পানি যেমন আগুন নিভিয়ে দেয় তেমনি গুনাহ মুছে দেয়।", ref: "জামি` আত-তিরমিজি ৬১৪" }
          ]
        },
        {
          title: "জ্ঞান",
          items: [
            { text: "যে ব্যক্তি জ্ঞান অর্জনের পথে চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।", ref: "সহিহ মুসলিম ২৬৯৯" },
            { text: "তোমাদের মধ্যে উত্তম সে, যে কুরআন শেখে ও শেখায়।", ref: "সহিহ আল-বুখারি ৫০২৭" },
            { text: "জ্ঞান অর্জন করা প্রত্যেক মুসলিমের উপর ফরজ।", ref: "সুনান ইবনে মাজাহ ২২৪" },
            { text: "আলেমরা নবীদের উত্তরাধিকারী।", ref: "সুনান আবু দাউদ ৩৬৪১" },
            { text: "জ্ঞান অন্বেষণকারীর জন্য ফেরেশতারা তাদের পাখা বিছিয়ে দেন।", ref: "জামি` আত-তিরমিজি ২৬৮২" }
          ]
        },
        {
          title: "আখলাক",
          items: [
            { text: "মুমিনের আমলনামায় সবচেয়ে ভারী হবে উত্তম চরিত্র।", ref: "জামি` আত-তিরমিজি ২০০৩" },
            { text: "তোমাদের কেউ ঈমানদার হবে না যতক্ষণ না সে নিজের জন্য যা ভালবাসে, তার ভাইয়ের জন্যও তা ভালবাসে।", ref: "সহিহ আল-বুখারি ১৩" },
            { text: "আমার নিকট এবং কিয়ামতের দিনে আমার সবচেয়ে নিকট হবে তোমাদের মধ্যে সর্বোত্তম চরিত্রের অধিকারীরা।", ref: "জামি` আত-তিরমিজি ২০১৮" },
            { text: "তোমাদের মধ্যে উত্তম সে, যার চরিত্র সবচেয়ে উত্তম।", ref: "সহিহ আল-বুখারি ৬০২৯" },
            { text: "শক্তিশালী সে নয়, যে মানুষকে পরাজিত করতে পারে; বরং শক্তিশালী সে, যে রাগের সময় নিজেকে নিয়ন্ত্রণ করে।", ref: "সহিহ আল-বুখারি ৬১১৪" }
          ]
        }
      ]
    },
    prayerDisplay: {
      kicker: "নামাজের সময়সূচি",
      today: "আজ",
      adhan: "আজান",
      iqamah: "ইকামত",
      timeLeft: "বাকি সময়",
      next: "পরবর্তী",
      friday: "শুক্রবার",
      fridayOnly: "শুধু শুক্রবার"
    },
    poster: {
      kicker: "দান ক্যাম্পেইন",
      ctaTitle: "মসজিদের পাশে থাকুন",
      ctaSubtitle: "কিউআর স্ক্যান করুন অথবা বিকাশে দান করুন।",
      bkashLabel: "বিকাশ নম্বর",
      scan: "দান করতে স্ক্যান করুন",
      scanHint: "ক্যামেরা বা কিউআর স্ক্যানার ব্যবহার করুন।",
      print: "পোস্টার প্রিন্ট করুন",
      download: "পোস্টার ডাউনলোড",
      downloading: "তৈরি হচ্ছে..."
    },
    campaignDetail: {
      label: "দান ক্যাম্পেইন",
      donateTitle: "এই ক্যাম্পেইনে দান করুন",
      donateSubtitle: "বিকাশে দান পাঠিয়ে লেনদেনের তথ্য জমা দিন। এডমিন নিশ্চিত করবেন।",
      bkashTitle: "বিকাশ নম্বর",
      bkashSubtitle: "নিচের নম্বরে দান পাঠিয়ে ট্রানজাকশন আইডি জমা দিন।",
      supportNote: "সহায়তার জন্য মসজিদ অফিসে যোগাযোগ করুন।",
      shareTitle: "এই ক্যাম্পেইনটি শেয়ার করুন",
      shareButton: "লিংক কপি করুন",
      shareCopied: "কপি হয়েছে"
    },
    language: {
      label: "ভাষা",
      english: "English",
      bangla: "বাংলা"
    },
    menu: {
      open: "মেনু",
      close: "বন্ধ"
    },
    loading: "লোড হচ্ছে...",
    announcementLabel: "ঘোষণা",
    admin: {
      title: "এডমিন ড্যাশবোর্ড",
      subtitle: "নামাজের সময়, দান নিশ্চিতকরণ ও হাদিস পরিচালনা করুন।",
      nav: {
        prayer: "নামাজের সময়",
        donations: "দান",
        campaigns: "ক্যাম্পেইন",
        hadiths: "হাদিস",
        announcements: "ঘোষণা",
        displays: "ডিসপ্লে"
      },
      logout: "লগ আউট",
      prayer: {
        title: "নামাজের সময়সূচি",
        hint: "প্রতি সারি আপডেট ও সংরক্ষণ",
        updated: "নামাজের সময় আপডেট হয়েছে।",
        table: {
          prayer: "ওয়াক্ত",
          prayerBn: "বাংলা নাম",
          adhan: "আজান সময়",
          iqamah: "ইকামত সময়",
          update: "আপডেট"
        },
        save: "সংরক্ষণ"
      },
      donations: {
        addTitle: "দান যুক্ত করুন",
        addHint: "নিশ্চিত দান হিসেবে যোগ হবে",
        pendingTitle: "অপেক্ষমান দান",
        pendingHint: "প্রাপ্ত হলে নিশ্চিত করুন",
        confirmedTitle: "অনুমোদিত দান",
        confirmedHint: "সবার জন্য প্রদর্শিত হয়",
        fields: {
          name: "দাতার নাম",
          amount: "পরিমাণ (BDT)",
          campaign: "ক্যাম্পেইন নির্বাচন করুন (ঐচ্ছিক)",
          bkash: "বিকাশ নম্বর",
          trx: "ট্রানজাকশন আইডি",
          note: "মন্তব্য (ঐচ্ছিক)",
          submit: "দান যোগ করুন"
        },
        table: {
          name: "নাম",
          amount: "পরিমাণ",
          bkash: "বিকাশ",
          trx: "ট্রানজাকশন",
          confirm: "নিশ্চিত",
          delete: "মুছুন",
          empty: "কোনো অপেক্ষমান দান নেই।"
        },
        confirm: "নিশ্চিত",
        delete: "মুছুন",
        deleteTitle: "দান মুছবেন?",
        deleteMessage: "এটি স্থায়ীভাবে মুছে যাবে।",
        deleteCancel: "বাতিল",
        deleteConfirm: "মুছুন"
      },
      campaigns: {
        title: "দান ক্যাম্পেইন",
        create: "তৈরি করুন",
        fields: {
          title: "ক্যাম্পেইনের শিরোনাম",
          goal: "লক্ষ্য পরিমাণ (BDT)",
          description: "ক্যাম্পেইনের বর্ণনা"
        },
        table: {
          title: "শিরোনাম",
          goal: "লক্ষ্য",
          progress: "অগ্রগতি",
          status: "অবস্থা",
          assets: "কিউআর/পোস্টার",
          action: "অ্যাকশন",
          empty: "কোনো ক্যাম্পেইন নেই।"
        },
        qrEn: "কিউআর EN",
        qrBn: "কিউআর BN",
        posterEn: "পোস্টার EN",
        posterBn: "পোস্টার BN",
        archive: "আর্কাইভ",
        restore: "পুনরুদ্ধার",
        active: "সক্রিয়",
        archived: "আর্কাইভড"
      },
      hadiths: {
        title: "হাদিস",
        fields: {
          text: "হাদিসের লেখা",
          source: "সূত্র"
        },
        add: "হাদিস যোগ করুন",
        table: {
          text: "হাদিস",
          source: "সূত্র",
          remove: "মুছুন"
        },
        delete: "মুছুন"
      },
      announcements: {
        title: "ঘোষণা",
        create: "তৈরি করুন",
        fields: {
          title: "শিরোনাম",
          titleBn: "শিরোনাম (বাংলা)",
          message: "বার্তা",
          messageBn: "বার্তা (বাংলা)",
          start: "শুরুর সময়",
          end: "শেষ সময়"
        },
        table: {
          title: "শিরোনাম",
          period: "সময়সীমা",
          status: "অবস্থা",
          action: "অ্যাকশন",
          empty: "কোনো ঘোষণা নেই।"
        },
        active: "সক্রিয়",
        archived: "আর্কাইভড",
        archive: "আর্কাইভ",
        restore: "পুনরুদ্ধার",
        delete: "মুছুন"
      },
      displays: {
        title: "ডিসপ্লে পোস্টার",
        subtitle: "মসজিদের ডিসপ্লের জন্য কিউআর ও পোস্টার তৈরি করুন।",
        prayerTitle: "নামাজের সময় ডিসপ্লে",
        prayerSubtitle: "ডিজিটাল নামাজের সময়সূচির জন্য কিউআর ব্যবহার করুন।",
        qrEn: "কিউআর EN",
        qrBn: "কিউআর BN",
        posterEn: "পোস্টার EN",
        posterBn: "পোস্টার BN",
        posterHint: "মসজিদের ডিসপ্লের জন্য সময়সূচি শেয়ার করুন।",
        openLink: "কিউআর দিয়ে খুলুন",
        qrLabel: "ডিসপ্লে কিউআর",
        qrHint: "স্ক্যান করে সময়সূচি দেখুন",
        posterKicker: "নামাজ ডিসপ্লে",
        posterTitle: "নামাজের সময়সূচি",
        posterCardTitle: "মসজিদের ডিসপ্লের জন্য",
        posterCardBody: "কিউআর স্ক্যান করে নামাজের সময়সূচি খুলুন।",
        posterScanTitle: "খুলতে স্ক্যান করুন",
        posterScanHint: "ক্যামেরা বা কিউআর স্ক্যানার ব্যবহার করুন।"
      }
    },
    login: {
      title: "এডমিন লগইন",
      subtitle: "ড্যাশবোর্ডে যেতে নির্ধারিত তথ্য দিন।",
      username: "ইউজারনেম",
      password: "পাসওয়ার্ড",
      button: "লগইন",
      back: "হোমপেজে ফিরে যান",
      show: "দেখান",
      hide: "লুকান",
      error: "ভুল তথ্য দেওয়া হয়েছে।"
    }
  }
};

export function getLang(value?: string): Lang {
  return value === "bn" ? "bn" : "en";
}

export function withLang(href: string, lang: Lang) {
  if (lang === "en") return href;
  const [base, hash] = href.split("#");
  const separator = base.includes("?") ? "&" : "?";
  const url = `${base}${separator}lang=bn`;
  return hash ? `${url}#${hash}` : url;
}
