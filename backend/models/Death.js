import mongoose from "mongoose";

const DeathRecordSchema = new mongoose.Schema({
  sl_no: {
    type: Number,
    required: true,
    unique: true,
  },
  family_no: {
    type: String,
    required: true,
  },
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
  },
}, { timestamps: true });

export default mongoose.model("DeathRecord", DeathRecordSchema);
