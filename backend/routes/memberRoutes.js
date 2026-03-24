import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

// Create new member
router.post("/", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all members or members by family_number
router.get("/", async (req, res) => {
  try {
    const { family_number } = req.query;

    let members;
    if (family_number) {
      // Only fetch members with this family_number
      members = await Member.find({ family_number }).lean();
    } else {
      // Fetch all members if no family_number provided
      members = await Member.find().lean();
    }

    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update member
router.put("/:id", async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      gender: req.body.gender,
      relation: req.body.relation,
      dob: req.body.dob,
      age: req.body.age,
      occupation: req.body.occupation,
      phone: req.body.phone,
      email: req.body.email,

      blood_group: req.body.blood_group,
      aadhaar: req.body.aadhaar,
      family_number: req.body.family_number,
      hof: req.body.hof,
      baptism: req.body.baptism,
      deceased: req.body.deceased
    };

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedMember);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Delete member
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
