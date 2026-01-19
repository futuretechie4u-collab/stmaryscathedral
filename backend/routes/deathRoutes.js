import express from "express";
import Death from "../models/Death.js";
import Member from "../models/Member.js";

const router = express.Router();

// ➕ Add Death Record
router.post("/", async (req, res) => {
  try {
    // Separate memberId and nextHofId from the death record data
    const { memberId, nextHofId, ...deathData } = req.body;
    
    // Get the family number from the death data
    const familyNumber = deathData.family_no;

    if (!memberId || !familyNumber) {
      return res.status(400).json({
        error: "Missing required fields: memberId and family_no are required."
      });
    }

    // Find the member *before* updating to check their HoF status
    const memberToDecease = await Member.findById(memberId);
    if (!memberToDecease) {
      return res.status(404).json({ error: "Member not found" });
    }

    const wasHof = memberToDecease.hof; // Store their original HoF status

    // Save the death record
    const newDeath = new Death(deathData);
    await newDeath.save();

    // Mark the member as deceased and remove HOF status
    await Member.findByIdAndUpdate(
      memberId,
      { hof: false, deceased: true }
    );

    // If deceased *was* HoF → assign new HoF
    if (wasHof) {
      let newHof;
      
      // If a specific next HOF was selected, use it
      if (nextHofId) {
        newHof = await Member.findByIdAndUpdate(
          nextHofId,
          { hof: true },
          { new: true }
        );
        
        if (!newHof) {
          return res.status(404).json({ error: "Selected next HOF not found" });
        }
        
        console.log(`✅ New HoF manually selected for family ${familyNumber}: ${newHof.name}`);
      } else {
        // Otherwise, auto-select based on oldest non-deceased member
        newHof = await Member.findOneAndUpdate(
          {
            family_number: familyNumber,
            _id: { $ne: memberId },  
            deceased: { $ne: true },
          },
          { hof: true },
          {
            new: true,
            sort: { dob: 1 } // Oldest first
          }
        );
        
        if (!newHof) {
          console.warn(`⚠️ No eligible new HoF found for family ${familyNumber}`);
        } else {
          console.log(`✅ New HoF auto-selected for family ${familyNumber}: ${newHof.name}`);
        }
      }
    }

    res.status(201).json({ 
      message: "Death record added successfully", 
      death: newDeath 
    });
    
  } catch (err) {
    console.error("Error adding death record:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: err.message 
      });
    }
    
    if (err.code === 11000) {
      return res.status(409).json({ 
        error: "A death record with this sl_no already exists." 
      });
    }
    
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// 📜 Get All Death Records
router.get("/", async (req, res) => {
  try {
    const deaths = await Death.find().sort({ death_date: -1 });
    res.json(deaths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📜 Get One Death Record
router.get("/:id", async (req, res) => {
  try {
    const death = await Death.findById(req.params.id);
    if (!death) {
      return res.status(404).json({ error: "Death record not found" });
    }
    res.json(death);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Death Record
router.put("/:id", async (req, res) => {
  try {
    const updatedDeath = await Death.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedDeath) {
      return res.status(404).json({ error: "Death record not found" });
    }
    
    res.json(updatedDeath);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete Death Record
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await Death.findByIdAndDelete(req.params.id);
    
    if (!deletedRecord) {
      return res.status(404).json({ error: "Death record not found" });
    }
    
    res.json({ message: "Death record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;