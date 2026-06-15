require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

// Try to load env from server dir if not found
require("dotenv").config({ path: path.join(__dirname, "../server/.env") });

const ContentSchema = new mongoose.Schema({
  teamMembersData: mongoose.Schema.Types.Mixed,
}, { strict: false });

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function updateTeam() {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/travel-cms";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    const newTeamMembers = [
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

    const content = await Content.findOne();
    if (content) {
      content.teamMembersData = newTeamMembers;
      await content.save();
      console.log("Team members updated in MongoDB!");
    } else {
      console.log("Content document not found in MongoDB.");
    }
  } catch (error) {
    console.error("Error updating DB:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

updateTeam();
