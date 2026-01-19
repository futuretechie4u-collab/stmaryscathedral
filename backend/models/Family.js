import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  family_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hof: { type: String, required: true },  // Head of Family
  count: { type: Number },
  location: { type: String },
  village: { type: String },
  contact_number: { type: String },
  family_unit: { type: String },
  ward_number: { type: String },   // ✅ added
  unit_number: { type: String },   // ✅ added
  subscription: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Family", familySchema);

