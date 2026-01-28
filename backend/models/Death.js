import mongoose from "mongoose";

const DeathRecordSchema = new mongoose.Schema({
  sl_no: {
    type: Number,
    required: true,
    unique: true,
  },

  // 🔑 Key switch
  isParishioner: {
    type: Boolean,
    required: true,
  },

  // -------------------
  // Parishioner only
  // -------------------
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  family_no: {
    type: String,
  },

  // -------------------
  // Common Person Info
  // -------------------
  name: {
    type: String,
    required: true,
  },
  house_name: {
    type: String,
  },
  address_place: {
    type: String,
  },
  father_husband_name: {
    type: String,
  },
  mother_wife_name: {
    type: String,
  },

  // -------------------
  // Death Details
  // -------------------
  death_date: {
    type: Date,
    required: true,
  },
  burial_date: {
    type: Date,
  },
  age: {
    type: Number,
  },
  conducted_by: {
    type: String,
  },
  cause_of_death: {
    type: String,
  },
  cell_no: {
    type: String,
  },
  remarks: {
    type: String,
  }

}, { timestamps: true });

export default mongoose.model("DeathRecord", DeathRecordSchema);
