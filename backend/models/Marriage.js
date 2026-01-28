import mongoose from "mongoose";

const marriageSchema = new mongoose.Schema({
  marriage_id: {
    type: String,
    required: true,
    unique: true
  },

  // -------------------
  // Spouse 1
  // -------------------
  spouse1_isParishioner: {
    type: Boolean,
    required: true
  },
  spouse1_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
  spouse1_name: {
    type: String,
    required: true
  },
  spouse1_home_parish: {
    type: String
  },

  // -------------------
  // Spouse 2
  // -------------------
  spouse2_isParishioner: {
    type: Boolean,
    required: true
  },
  spouse2_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
  spouse2_name: {
    type: String,
    required: true
  },
  spouse2_home_parish: {
    type: String
  },

  // -------------------
  // Marriage Details
  // -------------------
  date: {
    type: Date,
    required: true
  },
  place: {
    type: String
  },
  officiant_number: {
    type: String
  }

}, { timestamps: true });

export default mongoose.model("Marriage", marriageSchema);
