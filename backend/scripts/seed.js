import mongoose from "mongoose";
import Family from "../models/Family.js";
import Member from "../models/Member.js";

const MONGO_URI="mongodb+srv://stmaryspallikara:iHT4De7y1lALKUIG@cluster0.ereulhw.mongodb.net/churchDB?retryWrites=true&w=majority&appName=Cluster0";

const families = [
  {
    family_number: "101004",
    name: "Parayankudy",
    hof: "Alias P P",
    count: 3,
    location: "Ramaloor",
    village: "Mortsmuni",
    contact_number: "9895754991",
    family_unit: "200",
    ward_number: "1",
    subscription: true,
  },
  {
    family_number: "101005",
    name: "Kaninadu P O",
    hof: "Alphonsa Paily",
    count: 1,
    location: "Kaninadu P O",
    village: "Mortsmuni",
    contact_number: "8086523657",
    family_unit: "200",
    ward_number: "1",
    subscription: true,
  },
  {
    family_number: "101006",
    name: "Chirapurath",
    hof: "Anish Chako",
    count: 4,
    location: "Kaninadu P O",
    village: "Mortsmuni",
    contact_number: "9020808034",
    family_unit: "200",
    ward_number: "1",
    subscription: true,
  },
  {
    family_number: "101007",
    name: "Panackal",
    hof: "Babu P I",
    count: 4,
    location: "Kaninadu P O",
    village: "Mortsmuni",
    contact_number: "4842731328",
    family_unit: "200",
    ward_number: "1",
    subscription: true,
  },
];

const members = [
  // 101004
  {
    sl_no: 1,
    name: "Alias P P",
    gender: "Male",
    relation: "HoF",
    dob: new Date("1947-11-16"),
    age: 71,
    occupation: "Pentioner",
    phone: "9895754991",
    family_number: "101004",
    hof: true,
  },
  {
    sl_no: 2,
    name: "Susan",
    gender: "Female",
    relation: "Wife",
    dob: new Date("1955-08-25"),
    age: 63,
    occupation: "House Wife",
    family_number: "101004",
  },
  {
    sl_no: 3,
    name: "Digin Peete",
    gender: "Male",
    relation: "Son",
    age: 33,
    occupation: "Nurse",
    family_number: "101004",
  },

  // 101005
  {
    sl_no: 1,
    name: "Alphonsa Paily",
    gender: "Female",
    relation: "HoF",
    age: 57,
    occupation: "House Wife",
    phone: "8086523657",
    blog_group: "B+",
    family_number: "101005",
    hof: true,
  },

  // 101006
  {
    sl_no: 1,
    name: "Anish Chako",
    gender: "Male",
    relation: "HoF",
    dob: new Date("1981-03-14"),
    age: 38,
    occupation: "Electrician",
    phone: "9020808034",
    blog_group: "O+",
    family_number: "101006",
    hof: true,
  },
  {
    sl_no: 2,
    name: "Mini Anish",
    gender: "Female",
    relation: "Wife",
    dob: new Date("1985-02-12"),
    age: 34,
    occupation: "Nurse",
    phone: "9747044170",
    blog_group: "O+",
    family_number: "101006",
  },
  {
    sl_no: 3,
    name: "Niya Susan Anish",
    gender: "Female",
    relation: "Daughter",
    dob: new Date("2011-01-07"),
    age: 8,
    occupation: "Student",
    blog_group: "O+",
    family_number: "101006",
  },
  {
    sl_no: 4,
    name: "Siya Mariya Anish",
    gender: "Female",
    relation: "Daughter",
    age: 1,
    family_number: "101006",
  },

  // 101007
  {
    sl_no: 1,
    name: "Babu P I",
    gender: "Male",
    relation: "HoF",
    dob: new Date("1962-06-04"),
    age: 56,
    occupation: "Office Servent",
    phone: "4842731328",
    email: "babupanackal@gmail.com",
    blog_group: "O-",
    family_number: "101007",
    hof: true,
  },
  {
    sl_no: 2,
    name: "Sonia Babu",
    gender: "Female",
    relation: "Wife",
    age: 49,
    occupation: "House Wife",
    blog_group: "O+",
    family_number: "101007",
  },
  {
    sl_no: 3,
    name: "Sachin Issac Babu",
    gender: "Male",
    relation: "Son",
    dob: new Date("1994-01-24"),
    age: 25,
    occupation: "Student",
    blog_group: "O+",
    family_number: "101007",
  },
  {
    sl_no: 4,
    name: "Sandra Elizabeth Babu",
    gender: "Female",
    relation: "Daughter",
    dob: new Date("1999-03-17"),
    age: 20,
    occupation: "Student",
    blog_group: "O+",
    family_number: "101007",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await Family.deleteMany();
    await Member.deleteMany();

    await Family.insertMany(families);
    await Member.insertMany(members);

    console.log("🌱 Data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seed();
