export const destinations = {
  north: [
    {
      id: 1,
      name: "Varanasi",
      state: "Uttar Pradesh",
      description:
        "The spiritual capital of India, where ancient ghats meet the sacred Ganges at dawn.",
      image:
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&h=600&fit=crop&auto=format",
      tag: "Spiritual",
      duration: "4 Days / 3 Nights",
      price: "22,500",
      difficulty: "Easy",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival & City Tour",
          description:
            "Check-in Hotel, Kashi Vishwanath Temple, Dashashwamedh Ghat, Ganga Aarti, Local Market",
        },
        {
          day: "Day 2",
          title: "Temples & Forts",
          description:
            "Assi Ghat, Tulsi Manas Mandir, Sankat Mochan Temple, Banaras Hindu University, Ramnagar Fort",
        },
        {
          day: "Day 3",
          title: "Sarnath Excursion",
          description:
            "Sarnath, Dhamek Stupa, Archaeological Museum, Chauk Market",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Sunrise Boat Ride, Shopping, Check-out",
        },
      ],
    },
    {
      id: 2,
      name: "Rajasthan Royale",
      state: "Rajasthan",
      description:
        "A land of maharajas, golden deserts, and painted havelis stretching to the horizon.",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&auto=format",
      tag: "Heritage",
      duration: "4 Days / 3 Nights",
      price: "28,000",
      difficulty: "Easy",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival & Heritage Tour",
          description: "City Palace, Jantar Mantar, Hawa Mahal, Bapu Bazaar",
        },
        {
          day: "Day 2",
          title: "Forts of Jaipur",
          description: "Amber Fort, Jaigarh Fort, Nahargarh Fort, Jal Mahal",
        },
        {
          day: "Day 3",
          title: "Culture & Museums",
          description:
            "Albert Hall Museum, Birla Temple, Patrika Gate, Chokhi Dhani",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Local Shopping, Check-out",
        },
      ],
    },
    {
      id: 3,
      name: "Leh Ladakh",
      state: "Ladakh",
      description:
        "High-altitude monasteries, azure lakes, and roads that touch the sky.",
      image:
        "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&h=600&fit=crop&auto=format",
      tag: "Adventure",
      duration: "4 Days / 3 Nights",
      price: "32,000",
      difficulty: "Challenging",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Leh",
          description: "Leh Palace, Shanti Stupa, Leh Market",
        },
        {
          day: "Day 2",
          title: "Local Sightseeing",
          description:
            "Hall of Fame, Magnetic Hill, Sangam View Point, Gurudwara Pathar Sahib",
        },
        {
          day: "Day 3",
          title: "Monasteries & Palaces",
          description: "Thiksey Monastery, Shey Palace, Stok Village",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Local Market, Check-out",
        },
      ],
    },
    {
      id: 4,
      name: "Shimla & Manali",
      state: "Himachal Pradesh",
      description:
        "Colonial charm meets Himalayan grandeur in these iconic mountain retreats.",
      image:
        "https://images.unsplash.com/photo-1626016014141-2c09cca9c8e7?w=800&h=600&fit=crop&auto=format",
      tag: "Mountains",
      duration: "4 Days / 3 Nights",
      price: "24,000",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Shimla Arrival",
          description: "Mall Road, Christ Church, Ridge, Lakkar Bazaar",
        },
        {
          day: "Day 2",
          title: "Kufri Excursion",
          description: "Kufri, Green Valley, Jakhoo Temple",
        },
        {
          day: "Day 3",
          title: "Manali Sightseeing",
          description: "Hadimba Temple, Club House, Mall Road, Van Vihar",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Vashisht Temple, Check-out",
        },
      ],
    },
  ],
  south: [
    {
      id: 5,
      name: "Kerala Backwaters",
      state: "Kerala",
      description:
        "Drift through emerald waterways on a traditional kettuvallam as herons glide overhead.",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&auto=format",
      tag: "Luxury",
      duration: "4 Days / 3 Nights",
      price: "35,000",
      difficulty: "Easy",
      itinerary: [
        {
          day: "Day 1",
          title: "Houseboat Experience",
          description: "Houseboat Check-in, Backwater Cruise, Village Tour",
        },
        {
          day: "Day 2",
          title: "Alleppey Exploration",
          description: "Alleppey Beach, Lighthouse, Coir Museum",
        },
        {
          day: "Day 3",
          title: "Nature & Birdwatching",
          description: "Kumarakom Bird Sanctuary, Vembanad Lake",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
    {
      id: 6,
      name: "Hampi",
      state: "Karnataka",
      description:
        "A UNESCO World Heritage landscape of boulder-strewn ruins and Vijayanagara grandeur.",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&auto=format",
      tag: "Heritage",
      duration: "4 Days / 3 Nights",
      price: "19,500",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival & Ruins",
          description: "Virupaksha Temple, Hampi Bazaar, Hemakuta Hill",
        },
        {
          day: "Day 2",
          title: "Temple Trail",
          description: "Vittala Temple, Stone Chariot, King's Balance",
        },
        {
          day: "Day 3",
          title: "Royal Enclosure",
          description: "Lotus Mahal, Elephant Stables, Queen's Bath",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Matanga Hill Sunrise, Check-out",
        },
      ],
    },
    {
      id: 7,
      name: "Pondicherry",
      state: "Tamil Nadu",
      description:
        "French boulevards, colonial villas, and a quiet spiritual energy by the Bay of Bengal.",
      image:
        "https://images.unsplash.com/photo-1560179406-1c6c60e0faa2?w=800&h=600&fit=crop&auto=format",
      tag: "Coastal",
      duration: "4 Days / 3 Nights",
      price: "20,000",
      difficulty: "Easy",
      itinerary: [
        {
          day: "Day 1",
          title: "French Quarter",
          description: "Promenade Beach, Rock Beach, French Quarter",
        },
        {
          day: "Day 2",
          title: "Spiritual & Heritage",
          description: "Aurobindo Ashram, Bharathi Park, Basilica Church",
        },
        {
          day: "Day 3",
          title: "Beaches & Backwaters",
          description: "Paradise Beach, Chunnambar Boat House, Serenity Beach",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
    {
      id: 8,
      name: "Coorg",
      state: "Karnataka",
      description:
        "The Scotland of India — misty coffee estates, waterfalls, and forest trails.",
      image:
        "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?w=800&h=600&fit=crop&auto=format",
      tag: "Nature",
      duration: "4 Days / 3 Nights",
      price: "21,500",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Coorg",
          description: "Raja's Seat, Madikeri Fort, Omkareshwara Temple",
        },
        {
          day: "Day 2",
          title: "Nature Trails",
          description: "Abbey Falls, Coffee Plantation, Nisargadhama",
        },
        {
          day: "Day 3",
          title: "Wildlife Encounters",
          description: "Dubare Elephant Camp, Harangi Dam",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Local Market, Check-out",
        },
      ],
    },
  ],
  east: [
    {
      id: 9,
      name: "Darjeeling",
      state: "West Bengal",
      description:
        "Morning mist over tea gardens, toy trains, and Kanchenjunga at sunrise.",
      image:
        "https://images.unsplash.com/photo-1544015759-237f57b15e11?w=800&h=600&fit=crop&auto=format",
      tag: "Mountains",
      duration: "4 Days / 3 Nights",
      price: "23,000",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Darjeeling",
          description: "Mall Road, Chowrasta, Peace Pagoda",
        },
        {
          day: "Day 2",
          title: "Sunrise & Monasteries",
          description: "Tiger Hill, Batasia Loop, Ghoom Monastery",
        },
        {
          day: "Day 3",
          title: "Museum & Tea Gardens",
          description:
            "Himalayan Mountaineering Institute, Padmaja Naidu Zoo, Tea Garden",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
    {
      id: 10,
      name: "Odisha Temple Trail",
      state: "Odisha",
      description:
        "Konark's sun chariot, Puri's waves, and Bhubaneswar's ancient temple clusters.",
      image:
        "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?w=800&h=600&fit=crop&auto=format",
      tag: "Heritage",
      duration: "4 Days / 3 Nights",
      price: "20,500",
      difficulty: "Easy",
      itinerary: [
        {
          day: "Day 1",
          title: "Bhubaneswar Temples",
          description: "Lingaraj Temple, Mukteshwar Temple, Rajarani Temple",
        },
        {
          day: "Day 2",
          title: "Caves & History",
          description: "Dhauli, Khandagiri, Udayagiri Caves",
        },
        {
          day: "Day 3",
          title: "Wildlife & Handicrafts",
          description: "Nandankanan Zoo, Ekamra Haat",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
  ],
  west: [
    {
      id: 11,
      name: "Goa",
      state: "Goa",
      description:
        "Spice plantations, baroque churches, and sunsets that feel painted by hand.",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&auto=format",
      tag: "Coastal",
      duration: "4 Days / 3 Nights",
      price: "25,000",
      difficulty: "Easy",
      itinerary: [
        {
          day: "Day 1",
          title: "North Goa Beaches",
          description: "Calangute Beach, Baga Beach, Tito's Lane",
        },
        {
          day: "Day 2",
          title: "Forts & Shores",
          description: "Fort Aguada, Candolim Beach, Sinquerim Beach",
        },
        {
          day: "Day 3",
          title: "Vagator & Anjuna",
          description: "Anjuna Beach, Vagator Beach, Chapora Fort",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
    {
      id: 12,
      name: "Rann of Kutch",
      state: "Gujarat",
      description:
        "The world's largest salt desert — blinding white, endless, and hauntingly beautiful.",
      image:
        "https://images.unsplash.com/photo-1626081498144-88f5d02324df?w=800&h=600&fit=crop&auto=format",
      tag: "Adventure",
      duration: "4 Days / 3 Nights",
      price: "26,500",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival at Rann",
          description: "White Rann, Sunset Point",
        },
        {
          day: "Day 2",
          title: "Hills & Borders",
          description: "Kala Dungar, India Bridge (Permit Area)",
        },
        {
          day: "Day 3",
          title: "Cultural Villages",
          description: "Hodka Village, Craft Village",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
  ],
  northeast: [
    {
      id: 13,
      name: "Meghalaya",
      state: "Meghalaya",
      description:
        "Living root bridges, the wettest place on earth, and clouds you can touch.",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop&auto=format",
      tag: "Nature",
      duration: "4 Days / 3 Nights",
      price: "27,000",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Shillong",
          description: "Ward's Lake, Police Bazaar, Cathedral Church",
        },
        {
          day: "Day 2",
          title: "Waterfalls & Parks",
          description: "Elephant Falls, Shillong Peak, Lady Hydari Park",
        },
        {
          day: "Day 3",
          title: "Canyons & Forests",
          description: "Mawphlang Sacred Forest, Laitlum Canyon",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
    {
      id: 14,
      name: "Kaziranga",
      state: "Assam",
      description:
        "One-horned rhinos roam through tall elephant grass as the Brahmaputra winds nearby.",
      image:
        "https://images.unsplash.com/photo-1585753614930-23f5e9be1c56?w=800&h=600&fit=crop&auto=format",
      tag: "Wildlife",
      duration: "4 Days / 3 Nights",
      price: "29,500",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Kaziranga",
          description: "Jeep Safari, Orchid Park",
        },
        {
          day: "Day 2",
          title: "Safari & Nature",
          description: "Elephant Safari, Central Range",
        },
        {
          day: "Day 3",
          title: "Tea & Village Life",
          description: "Tea Garden Tour, Local Village",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
    {
      id: 15,
      name: "Sikkim",
      state: "Sikkim",
      description:
        "Prayer flags flutter over monasteries framed by the eternal snows of Kangchenjunga.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
      tag: "Spiritual",
      duration: "4 Days / 3 Nights",
      price: "26,000",
      difficulty: "Moderate",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Gangtok",
          description: "MG Marg, Flower Exhibition Centre, Ropeway",
        },
        {
          day: "Day 2",
          title: "Lakes & Temples",
          description: "Tsomgo Lake, Baba Mandir",
        },
        {
          day: "Day 3",
          title: "Monasteries & Falls",
          description: "Rumtek Monastery, Banjhakri Falls, Tashi View Point",
        },
        {
          day: "Day 4",
          title: "Departure",
          description: "Shopping, Check-out",
        },
      ],
    },
  ],
};

export const experiences = [
  {
    id: 1,
    category: "Adventure",
    title: "High-Altitude Expeditions",
    description:
      "Trek across Himalayan passes, cycle through remote Spiti, or raft the Zanskar in its icy prime.",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-secondary)",
  },
  {
    id: 2,
    category: "Heritage",
    title: "Living History Journeys",
    description:
      "Walk through royal palaces, witness centuries-old craft traditions, and dine with local nobility.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-primary)",
  },
  {
    id: 3,
    category: "Wildlife",
    title: "Wilderness Encounters",
    description:
      "Tiger safaris at dawn, elephant corridors at dusk, and birding in ancient forests.",
    image:
      "https://images.unsplash.com/photo-1615092040180-2eb3133f81e3?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-secondary)",
  },
  {
    id: 4,
    category: "Luxury Escapes",
    title: "Palace & Heritage Hotels",
    description:
      "Sleep in converted maharaja forts, wake up to courtyard fountains, and be waited on by white-gloved staff.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-primary)",
  },
  {
    id: 5,
    category: "Pilgrimage",
    title: "Sacred Circuits",
    description:
      "Char Dham, Vaishno Devi, the twelve Jyotirlingas — journeys that transcend geography.",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-secondary)",
  },
  {
    id: 6,
    category: "Road Trips",
    title: "Legendary Road Journeys",
    description:
      "Manali to Leh, the Konkan coastline, the NH44 from Srinagar to Kanyakumari.",
    image:
      "https://images.unsplash.com/photo-1626601406437-52643a60a0a5?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-primary)",
  },
  {
    id: 7,
    category: "Honeymoon",
    title: "Romantic Hideaways",
    description:
      "Private houseboat sunsets on Kerala's backwaters, candlelit dinners in Udaipur's lake palaces.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-primary)",
  },
  {
    id: 8,
    category: "Family Tours",
    title: "Journeys for Every Generation",
    description:
      "Cultural immersion, wildlife thrills, and beach play — itineraries that delight everyone.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&h=700&fit=crop&auto=format",
    accent: "var(--color-accent-secondary)",
  },
];

export const featuredJourneys = [
  {
    id: 1,
    title: "The Himalayan Arc",
    category: "Mountains",
    duration: "12 Days",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Rajasthan Royal Circuit",
    category: "Heritage",
    duration: "10 Days",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Tiger & Tribes",
    category: "Wildlife",
    duration: "8 Days",
    image:
      "https://images.unsplash.com/photo-1615092040180-2eb3133f81e3?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Sacred Ganges",
    category: "Spiritual",
    duration: "7 Days",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Kerala in Slow Motion",
    category: "Luxury",
    duration: "9 Days",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "North-East Odyssey",
    category: "Adventure",
    duration: "14 Days",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 7,
    title: "The Golden Triangle",
    category: "Heritage",
    duration: "6 Days",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 8,
    title: "Spiti Valley Expedition",
    category: "Mountains",
    duration: "10 Days",
    image:
      "https://images.unsplash.com/photo-1626601406437-52643a60a0a5?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 9,
    title: "Andaman Blue Waters",
    category: "Coastal",
    duration: "8 Days",
    image:
      "https://images.unsplash.com/photo-1560179406-1c6c60e0faa2?w=700&h=900&fit=crop&auto=format",
  },
  {
    id: 10,
    title: "Rann of Kutch Canvas",
    category: "Adventure",
    duration: "5 Days",
    image:
      "https://images.unsplash.com/photo-1626081498144-88f5d02324df?w=700&h=900&fit=crop&auto=format",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Route Story didn't book us a trip — they wrote us a chapter of our lives we will never forget.",
    author: "Priya & Arjun Mehta",
    location: "Mumbai",
    journey: "Rajasthan Royal Circuit",
  },
  {
    id: 2,
    quote:
      "Every detail was considered. Every moment felt deliberate. It was travel as it should always be.",
    author: "Kavita Sharma",
    location: "Bengaluru",
    journey: "Kerala Backwaters",
  },
  {
    id: 3,
    quote:
      "We have travelled with many companies. None understood what we were looking for until Route Story.",
    author: "Rohan & Deepa Nair",
    location: "Delhi",
    journey: "Himalayan Arc",
  },
  {
    id: 4,
    quote:
      "The local connections they have are extraordinary. We experienced India like residents, not tourists.",
    author: "Ananya Krishnan",
    location: "Chennai",
    journey: "North-East Odyssey",
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Rishabh Jain",
    role: "Founder & Operations Lead",
    bio: "Rishabh oversees the overall management and operations of Route Story. From coordinating the team and developing travel packages to ensuring smooth customer experiences, he focuses on turning every travel plan into a well-organized and memorable journey.",
    image: "",
  },
  {
    id: 2,
    name: "Vanshika Maheshwari",
    role: "Co-Founder | Client Relations & Brand Growth",
    bio: "Vanshika manages customer interactions, itinerary planning, and community engagement. She helps travelers find experiences that match their interests while also leading Route Story's social media presence and brand communication.",
    image: "",
  },
  {
    id: 3,
    name: "Khushal Chordia",
    role: "Co-Founder | Technology & Digital Experience",
    bio: "Khushal manages Route Story's website, technical infrastructure, and digital systems. He ensures a seamless online experience, secure booking processes, and reliable platform performance for every traveler.",
    image: "",
  },
];

export const faqs = [
  {
    q: "How far in advance should I plan my journey?",
    a: "We recommend reaching out at least 8–12 weeks before your intended travel dates. This allows us time to craft a truly bespoke itinerary and secure the finest accommodations.",
  },
  {
    q: "Do you handle group and corporate travel?",
    a: "Absolutely. We specialise in curated group journeys, corporate offsites, and incentive travel. Contact us with your group size and we will design accordingly.",
  },
  {
    q: "What sets Route Story apart from other travel agencies?",
    a: "We are not a booking portal. We are storytellers. Every journey is designed around your personality, interests, and pace — not pulled from a catalogue.",
  },
  {
    q: "Are your journeys only within India?",
    a: "Currently we focus exclusively on India. We believe there are lifetimes of stories within this one country, and we do not wish to dilute that focus.",
  },
  {
    q: "What is your payment and cancellation policy?",
    a: "We require a 30% deposit to begin planning. Full payment is due 45 days before travel. Cancellation terms depend on the specific journey and will be outlined clearly in your agreement.",
  },
];
