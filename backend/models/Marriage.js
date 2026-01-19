import mongoose from "mongoose";

const marriageSchema = new mongoose.Schema({
  marriage_id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  spouse1_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member',
    required: true 
  },
  spouse1: { 
    type: String, 
    required: true 
  },
  spouse2_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member',
    required: true 
  },
  spouse2: { 
    type: String, 
    required: true 
  },
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