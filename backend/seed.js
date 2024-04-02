import mongoose from "mongoose";

import College from "./models/College.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});
async function seedCollegeData(products) {
  console.log(process.env.MONGO_URI_DEV);
  try {
    // Connect to MongoDB
    await mongoose
      .connect(process.env.MONGO_URI_DEV, {
        autoIndex: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
      });

    // Clear existing product data (optional, adjust based on your needs)
    // await College.deleteMany({});

    // Seed data
    await College.insertMany(products);

    console.log("College data successfully seeded!");
  } catch (error) {
    console.error("Error seeding Collegedata:", error);
  } finally {
    // Close connection
    mongoose.disconnect();
  }
}

const ObjectId = mongoose.Types.ObjectId;
const authorId = new ObjectId("65f6e048d1e3e6b6ab6ab4dd");
// Define your product data as an array of objects
const collegeData = [
  {
    collegename: "GOVT. ARTS & SCIENCE COLLEGE, MEENCHANDA, KOZHIKODE",
    type: "Government",
    place: "MEENCHANDA",
    pincode: "673603",
    phone: "0495 2320694",
    email: "gasckkdprincipal@gmail.com",
    website: "www.gasckkd.ac.in",
    departments: [],
    user: "65f6e048d1e3e6b6ab6ab4dd",
    picture: "http://localhost:3000/uploads\\1707665633053.jpg",
  },

  {
    collegename: "St. Josephs College Devagiri (Autonomous)",
    type: "Government-aided",
    place: "MEDICAL COLLEGE, KOZHIKODE",
    pincode: "673603",
    phone: "0495 235 5901",
    email: "sjcdevagiri@yahoo.co.in",
    website: "https://www.devagiricollege.org/",
    departments: [],
    user: "65f6e048d1e3e6b6ab6ab4dd",
    picture: "http://localhost:3000/uploads\\1707667770160.jpg",
  },
  {
    collegename: "MAMO College Manassery",
    type: "Aided",
    place: "THAZHECODE, MANASSERY",
    pincode: "673603",
    phone: "91 495 229 7319",
    email: "mamocollege@gmail.com",
    website: "https://www.mamocollege.org/",
    departments: [],
    user: "65f6e048d1e3e6b6ab6ab4dd",
    picture: "http://localhost:3000/uploads\\1707667894129.jpg",
  },
];

// Run the seeding function
seedCollegeData(collegeData);
