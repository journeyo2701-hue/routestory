const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/data/index.ts');
let content = fs.readFileSync(filePath, 'utf8');

// We need to inject `itinerary: [...]` into each destination object.
// Since the file is just a JS module exporting objects, we can do some regex magic or just run it, modify, and rewrite.

const itineraries = {
  "Varanasi": [
    { day: "Day 1", title: "Arrival & Evening Aarti", description: "Arrive in Varanasi. Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat in the evening." },
    { day: "Day 2", title: "Morning Boat Ride & Sarnath", description: "Early morning boat ride on the Ganges. Later, visit Sarnath where Buddha gave his first sermon." },
    { day: "Day 3", title: "Temple Tour & Weavers District", description: "Visit Kashi Vishwanath Temple and explore the alleys of the silk weavers." },
    { day: "Day 4", title: "Departure", description: "Morning at leisure. Transfer to the airport for your onward journey." }
  ],
  "Rajasthan Royale": [
    { day: "Day 1", title: "Arrival in Jaipur", description: "Welcome to the Pink City. Check-in to your heritage hotel and enjoy a royal dinner." },
    { day: "Day 2", title: "Amer Fort & City Palace", description: "Explore the majestic Amer Fort and the intricate City Palace." },
    { day: "Day 3", title: "Jodhpur Journey", description: "Drive to Jodhpur. Evening visit to the vibrant local spice markets." },
    { day: "Day 4", title: "Mehrangarh & Departure", description: "Tour the towering Mehrangarh Fort before your departure." }
  ],
  "Leh Ladakh": [
    { day: "Day 1", title: "Acclimatization in Leh", description: "Arrive in Leh and rest to acclimatize to the high altitude. Evening walk in the local market." },
    { day: "Day 2", title: "Monastery Tour", description: "Visit the ancient Thiksey and Hemis monasteries." },
    { day: "Day 3", title: "Pangong Lake Excursion", description: "Day trip to the breathtaking blue waters of Pangong Tso." },
    { day: "Day 4", title: "Departure", description: "Morning transfer to Leh airport." }
  ],
  "Shimla & Manali": [
    { day: "Day 1", title: "Arrival in Shimla", description: "Arrive in Shimla. Walk down the historic Mall Road and visit the Ridge." },
    { day: "Day 2", title: "Kufri & Surroundings", description: "Excursion to Kufri for panoramic Himalayan views." },
    { day: "Day 3", title: "Drive to Manali", description: "Scenic drive through the mountains to Manali. Evening at leisure." },
    { day: "Day 4", title: "Solang Valley & Departure", description: "Visit Solang Valley for adventure activities before departing." }
  ],
  "Kerala Backwaters": [
    { day: "Day 1", title: "Arrival in Kochi", description: "Arrive in Kochi. Explore Fort Kochi, Chinese fishing nets, and the Jewish synagogue." },
    { day: "Day 2", title: "Houseboat Boarding", description: "Drive to Alleppey and board your private luxury houseboat for an overnight cruise." },
    { day: "Day 3", title: "Kumarakom Retreat", description: "Disembark and head to a backwater resort in Kumarakom for Ayurvedic relaxation." },
    { day: "Day 4", title: "Departure", description: "Transfer back to Kochi airport for departure." }
  ],
  "Hampi": [
    { day: "Day 1", title: "Arrival in Hospet", description: "Arrive and transfer to your hotel. Evening sunset view from Hemakuta Hill." },
    { day: "Day 2", title: "Vijayanagara Ruins", description: "Explore the Virupaksha Temple, Vittala Temple, and the iconic Stone Chariot." },
    { day: "Day 3", title: "Royal Enclosure", description: "Visit the Lotus Mahal, Elephant Stables, and the Queen's Bath." },
    { day: "Day 4", title: "Departure", description: "Morning visit to the local markets and departure." }
  ],
  "Pondicherry": [
    { day: "Day 1", title: "Arrival & French Quarter", description: "Arrive in Pondicherry. Walk through the charming French Quarter and White Town." },
    { day: "Day 2", title: "Auroville Visit", description: "Spend the morning at Auroville and the Matrimandir for a spiritual experience." },
    { day: "Day 3", title: "Beach & Cafes", description: "Relax at Promenade Beach and explore local bakeries and boutiques." },
    { day: "Day 4", title: "Departure", description: "Transfer to Chennai or local airport for departure." }
  ],
  "Coorg": [
    { day: "Day 1", title: "Arrival & Coffee Estates", description: "Arrive in Coorg. Check-in to your plantation stay and enjoy a guided coffee tour." },
    { day: "Day 2", title: "Abbey Falls & Viewpoints", description: "Visit the majestic Abbey Falls and Raja's Seat for panoramic views." },
    { day: "Day 3", title: "Dubare Elephant Camp", description: "Interact with elephants at the Dubare camp and visit the Namdroling Monastery." },
    { day: "Day 4", title: "Departure", description: "Enjoy a final Coorgi breakfast before departure." }
  ],
  "Darjeeling": [
    { day: "Day 1", title: "Arrival", description: "Arrive in Darjeeling. Relax and enjoy the cool mountain air." },
    { day: "Day 2", title: "Tiger Hill Sunrise", description: "Early morning trip to Tiger Hill for sunrise over Kanchenjunga. Ride the toy train." },
    { day: "Day 3", title: "Tea Estates", description: "Visit the Happy Valley Tea Estate and the Himalayan Mountaineering Institute." },
    { day: "Day 4", title: "Departure", description: "Transfer to Bagdogra airport for departure." }
  ],
  "Odisha Temple Trail": [
    { day: "Day 1", title: "Arrival in Bhubaneswar", description: "Arrive and explore the ancient Lingaraj Temple and surrounding heritage sites." },
    { day: "Day 2", title: "Konark Sun Temple", description: "Drive to Konark to marvel at the architectural wonder of the Sun Temple." },
    { day: "Day 3", title: "Puri Pilgrimage", description: "Visit the sacred Jagannath Temple in Puri and relax by the beach." },
    { day: "Day 4", title: "Departure", description: "Transfer back to Bhubaneswar for your onward journey." }
  ],
  "Goa": [
    { day: "Day 1", title: "Arrival in South Goa", description: "Arrive and check into a luxury beachside resort. Evening at leisure." },
    { day: "Day 2", title: "Old Goa Heritage", description: "Visit the Basilica of Bom Jesus and Se Cathedral." },
    { day: "Day 3", title: "Spice Plantations", description: "Explore the lush spice plantations and enjoy a traditional Goan lunch." },
    { day: "Day 4", title: "Departure", description: "Morning beach walk and departure." }
  ],
  "Rann of Kutch": [
    { day: "Day 1", title: "Arrival in Bhuj", description: "Arrive in Bhuj and transfer to the Rann Utsav tent city." },
    { day: "Day 2", title: "White Desert Safari", description: "Explore the blinding white salt desert and witness a magical sunset." },
    { day: "Day 3", title: "Local Villages", description: "Visit nearby artisanal villages known for intricate Kutch embroidery." },
    { day: "Day 4", title: "Departure", description: "Transfer to Bhuj airport for departure." }
  ],
  "Meghalaya": [
    { day: "Day 1", title: "Arrival in Shillong", description: "Arrive and explore the 'Scotland of the East', including Umiam Lake." },
    { day: "Day 2", title: "Cherrapunji Excursion", description: "Drive to Cherrapunji. Visit the Nohkalikai Falls and Mawsmai Caves." },
    { day: "Day 3", title: "Living Root Bridges", description: "Trek to the ancient double-decker living root bridges in Nongriat." },
    { day: "Day 4", title: "Departure", description: "Transfer to Guwahati airport for your onward journey." }
  ],
  "Kaziranga": [
    { day: "Day 1", title: "Arrival", description: "Arrive in Guwahati and drive to Kaziranga National Park." },
    { day: "Day 2", title: "Jungle Safari", description: "Morning elephant safari and afternoon jeep safari to spot the one-horned rhino." },
    { day: "Day 3", title: "Orchid Park & Tea Gardens", description: "Visit the Kaziranga Orchid Park and stroll through local tea estates." },
    { day: "Day 4", title: "Departure", description: "Drive back to Guwahati for departure." }
  ],
  "Sikkim": [
    { day: "Day 1", title: "Arrival in Gangtok", description: "Arrive in Gangtok and acclimatize. Evening walk on MG Marg." },
    { day: "Day 2", title: "Tsomgo Lake", description: "Excursion to the glacial Tsomgo Lake and Baba Mandir." },
    { day: "Day 3", title: "Rumtek Monastery", description: "Visit the grand Rumtek Monastery and local viewpoints." },
    { day: "Day 4", title: "Departure", description: "Transfer to Bagdogra airport for departure." }
  ]
};

// Simple regex replace for each destination block to inject itinerary
Object.keys(itineraries).forEach(destName => {
  const itineraryStr = `itinerary: ${JSON.stringify(itineraries[destName], null, 6).replace(/\n/g, '\n      ')},`;
  const regex = new RegExp(`(name:\\s*["']${destName}["'],[\\s\\S]*?tag:\\s*["'][^"']+["'],)`, 'g');
  content = content.replace(regex, `$1\n      ${itineraryStr}`);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated index.ts with itineraries");
