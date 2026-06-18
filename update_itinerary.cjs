const fs = require('fs');

const indexTsPath = 'd:\\121\\client121\\rj\\src\\app\\data\\index.ts';
let content = fs.readFileSync(indexTsPath, 'utf8');

const itineraries = {
  1: [
    { day: "Day 1", title: "Arrival & City Tour", description: "Check-in Hotel, Kashi Vishwanath Temple, Dashashwamedh Ghat, Ganga Aarti, Local Market" },
    { day: "Day 2", title: "Temples & Forts", description: "Assi Ghat, Tulsi Manas Mandir, Sankat Mochan Temple, Banaras Hindu University, Ramnagar Fort" },
    { day: "Day 3", title: "Sarnath Excursion", description: "Sarnath, Dhamek Stupa, Archaeological Museum, Chauk Market" },
    { day: "Day 4", title: "Departure", description: "Sunrise Boat Ride, Shopping, Check-out" }
  ],
  2: [
    { day: "Day 1", title: "Arrival & Heritage Tour", description: "City Palace, Jantar Mantar, Hawa Mahal, Bapu Bazaar" },
    { day: "Day 2", title: "Forts of Jaipur", description: "Amber Fort, Jaigarh Fort, Nahargarh Fort, Jal Mahal" },
    { day: "Day 3", title: "Culture & Museums", description: "Albert Hall Museum, Birla Temple, Patrika Gate, Chokhi Dhani" },
    { day: "Day 4", title: "Departure", description: "Local Shopping, Check-out" }
  ],
  3: [
    { day: "Day 1", title: "Arrival in Leh", description: "Leh Palace, Shanti Stupa, Leh Market" },
    { day: "Day 2", title: "Local Sightseeing", description: "Hall of Fame, Magnetic Hill, Sangam View Point, Gurudwara Pathar Sahib" },
    { day: "Day 3", title: "Monasteries & Palaces", description: "Thiksey Monastery, Shey Palace, Stok Village" },
    { day: "Day 4", title: "Departure", description: "Local Market, Check-out" }
  ],
  4: [
    { day: "Day 1", title: "Shimla Arrival", description: "Mall Road, Christ Church, Ridge, Lakkar Bazaar" },
    { day: "Day 2", title: "Kufri Excursion", description: "Kufri, Green Valley, Jakhoo Temple" },
    { day: "Day 3", title: "Manali Sightseeing", description: "Hadimba Temple, Club House, Mall Road, Van Vihar" },
    { day: "Day 4", title: "Departure", description: "Vashisht Temple, Check-out" }
  ],
  5: [
    { day: "Day 1", title: "Houseboat Experience", description: "Houseboat Check-in, Backwater Cruise, Village Tour" },
    { day: "Day 2", title: "Alleppey Exploration", description: "Alleppey Beach, Lighthouse, Coir Museum" },
    { day: "Day 3", title: "Nature & Birdwatching", description: "Kumarakom Bird Sanctuary, Vembanad Lake" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  6: [
    { day: "Day 1", title: "Arrival & Ruins", description: "Virupaksha Temple, Hampi Bazaar, Hemakuta Hill" },
    { day: "Day 2", title: "Temple Trail", description: "Vittala Temple, Stone Chariot, King's Balance" },
    { day: "Day 3", title: "Royal Enclosure", description: "Lotus Mahal, Elephant Stables, Queen's Bath" },
    { day: "Day 4", title: "Departure", description: "Matanga Hill Sunrise, Check-out" }
  ],
  7: [
    { day: "Day 1", title: "French Quarter", description: "Promenade Beach, Rock Beach, French Quarter" },
    { day: "Day 2", title: "Spiritual & Heritage", description: "Aurobindo Ashram, Bharathi Park, Basilica Church" },
    { day: "Day 3", title: "Beaches & Backwaters", description: "Paradise Beach, Chunnambar Boat House, Serenity Beach" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  8: [
    { day: "Day 1", title: "Arrival in Coorg", description: "Raja's Seat, Madikeri Fort, Omkareshwara Temple" },
    { day: "Day 2", title: "Nature Trails", description: "Abbey Falls, Coffee Plantation, Nisargadhama" },
    { day: "Day 3", title: "Wildlife Encounters", description: "Dubare Elephant Camp, Harangi Dam" },
    { day: "Day 4", title: "Departure", description: "Local Market, Check-out" }
  ],
  9: [
    { day: "Day 1", title: "Arrival in Darjeeling", description: "Mall Road, Chowrasta, Peace Pagoda" },
    { day: "Day 2", title: "Sunrise & Monasteries", description: "Tiger Hill, Batasia Loop, Ghoom Monastery" },
    { day: "Day 3", title: "Museum & Tea Gardens", description: "Himalayan Mountaineering Institute, Padmaja Naidu Zoo, Tea Garden" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  10: [
    { day: "Day 1", title: "Bhubaneswar Temples", description: "Lingaraj Temple, Mukteshwar Temple, Rajarani Temple" },
    { day: "Day 2", title: "Caves & History", description: "Dhauli, Khandagiri, Udayagiri Caves" },
    { day: "Day 3", title: "Wildlife & Handicrafts", description: "Nandankanan Zoo, Ekamra Haat" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  11: [
    { day: "Day 1", title: "North Goa Beaches", description: "Calangute Beach, Baga Beach, Tito's Lane" },
    { day: "Day 2", title: "Forts & Shores", description: "Fort Aguada, Candolim Beach, Sinquerim Beach" },
    { day: "Day 3", title: "Vagator & Anjuna", description: "Anjuna Beach, Vagator Beach, Chapora Fort" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  12: [
    { day: "Day 1", title: "Arrival at Rann", description: "White Rann, Sunset Point" },
    { day: "Day 2", title: "Hills & Borders", description: "Kala Dungar, India Bridge (Permit Area)" },
    { day: "Day 3", title: "Cultural Villages", description: "Hodka Village, Craft Village" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  13: [
    { day: "Day 1", title: "Arrival in Shillong", description: "Ward's Lake, Police Bazaar, Cathedral Church" },
    { day: "Day 2", title: "Waterfalls & Parks", description: "Elephant Falls, Shillong Peak, Lady Hydari Park" },
    { day: "Day 3", title: "Canyons & Forests", description: "Mawphlang Sacred Forest, Laitlum Canyon" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  14: [
    { day: "Day 1", title: "Arrival in Kaziranga", description: "Jeep Safari, Orchid Park" },
    { day: "Day 2", title: "Safari & Nature", description: "Elephant Safari, Central Range" },
    { day: "Day 3", title: "Tea & Village Life", description: "Tea Garden Tour, Local Village" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ],
  15: [
    { day: "Day 1", title: "Arrival in Gangtok", description: "MG Marg, Flower Exhibition Centre, Ropeway" },
    { day: "Day 2", title: "Lakes & Temples", description: "Tsomgo Lake, Baba Mandir" },
    { day: "Day 3", title: "Monasteries & Falls", description: "Rumtek Monastery, Banjhakri Falls, Tashi View Point" },
    { day: "Day 4", title: "Departure", description: "Shopping, Check-out" }
  ]
};

// We will use regex to find each destination block and replace duration and itinerary.
// We can iterate over the IDs.
for (let id = 1; id <= 15; id++) {
  const idRegex = new RegExp(`id:\\s*${id},\\s*name:\\s*"([^"]+)",[\\s\\S]*?duration:\\s*"([^"]+)",[\\s\\S]*?itinerary:\\s*\\[([\\s\\S]*?)\\](?:,|\\n\\s*\\})`, 'g');
  
  content = content.replace(idRegex, (match, name, oldDuration, oldItinerary) => {
    const itineryStr = JSON.stringify(itineraries[id], null, 10).replace(/"day"/g, 'day').replace(/"title"/g, 'title').replace(/"description"/g, 'description');
    
    // Let's replace within the matched block
    let newBlock = match.replace(/duration:\s*"[^"]+"/, `duration: "4 Days / 3 Nights"`);
    
    // Now replace the itinerary array
    const itineraryRegex = /itinerary:\s*\[[\s\S]*?\]/;
    newBlock = newBlock.replace(itineraryRegex, `itinerary: ${JSON.stringify(itineraries[id], null, 8)}`);
    
    return newBlock;
  });
}

fs.writeFileSync(indexTsPath, content, 'utf8');
console.log("Updated index.ts");
