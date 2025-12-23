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
            }
          ]
        },
        {
          title: "Charity",
          items: [
            { text: "Charity does not decrease wealth.", ref: "Sahih Muslim 2588" },
            { text: "The believer’s shade on the Day of Resurrection will be his charity.", ref: "Jami` at-Tirmidhi 604" }
          ]
        },
        {
          title: "Knowledge",
          items: [
            { text: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.", ref: "Sahih Muslim 2699" },
            { text: "The best among you are those who learn the Qur'an and teach it.", ref: "Sahih al-Bukhari 5027" }
          ]
        },
        {
          title: "Character",
          items: [
            { text: "The heaviest thing on the believer’s scale is good character.", ref: "Jami` at-Tirmidhi 2003" },
            { text: "None of you truly believes until he loves for his brother what he loves for himself.", ref: "Sahih al-Bukhari 13" }
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
            }
          ]
        },
        {
          title: "দান",
          items: [
            { text: "সদকা সম্পদ কমায় না।", ref: "সহিহ মুসলিম ২৫৮৮" },
            { text: "কিয়ামতের দিনে মুমিনের ছায়া হবে তার সদকা।", ref: "জামি` আত-তিরমিজি ৬০৪" }
          ]
        },
        {
          title: "জ্ঞান",
          items: [
            { text: "যে ব্যক্তি জ্ঞান অর্জনের পথে চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।", ref: "সহিহ মুসলিম ২৬৯৯" },
            { text: "তোমাদের মধ্যে উত্তম সে, যে কুরআন শেখে ও শেখায়।", ref: "সহিহ আল-বুখারি ৫০২৭" }
          ]
        },
        {
          title: "আখলাক",
          items: [
            { text: "মুমিনের আমলনামায় সবচেয়ে ভারী হবে উত্তম চরিত্র।", ref: "জামি` আত-তিরমিজি ২০০৩" },
            { text: "তোমাদের কেউ ঈমানদার হবে না যতক্ষণ না সে নিজের জন্য যা ভালবাসে, তার ভাইয়ের জন্যও তা ভালবাসে।", ref: "সহিহ আল-বুখারি ১৩" }
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
