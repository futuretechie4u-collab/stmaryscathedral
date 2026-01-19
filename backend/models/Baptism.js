import mongoose from "mongoose";

const BaptismSchema = new mongoose.Schema({
  sl_no: {
    type: Number,
    required: true,
    unique: true,
  },
  // Family Information
  family_number: {
    type: String,
    required: true,
    ref: 'Family'
  },
  family_name: {
    type: String,
    required: true,
  },
  hof: {
    type: String,
    required: true,
  },
  // Member Information
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  member_name: {
    type: String,
    required: true,
  },
  member_dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  // Baptism Details
  date_of_baptism: {
    type: Date,
    required: true,
  },
  place_of_baptism: {
    type: String,
  },
  church_where_baptised: {
    type: String,
  },
  bapt_name: {
    type: String,
    required: true,
  },
  // Godparent Information
  godparent_name: {
    type: String,
  },
  godparent_house_name: {
    type: String,
  },
  // Certificate Details
  certificate_number: {
    type: String,
  },
  remarks: {
    type: String,
  }
}, { timestamps: true });

// IMPORTANT: If updating existing schema, drop the collection first or use:
// db.baptismrecords.drop()
// Then restart your server

export default mongoose.model("BaptismRecord", BaptismSchema);