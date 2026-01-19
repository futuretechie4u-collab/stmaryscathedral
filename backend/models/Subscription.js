import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  family_number: {
    type: String,
    required: true,
    ref: 'Family'
  },
  family_name: {
    type: String,
    required: true
  },
  hof: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paid: {
    type: Boolean,
    default: true,
    required: true
  },
  paid_date: {
    type: Date
  },
  receipt_number: {
    type: String
  },
  payment_method: {
    type: String,
    enum: ['Cash', 'Cheque', 'Online', 'Card'],
    default: 'Cash'
  },
  notes: {
    type: String
  }
}, { timestamps: true });

// Compound index to ensure one subscription per family per year
subscriptionSchema.index({ family_number: 1, year: 1 }, { unique: true });

// Index for faster queries
subscriptionSchema.index({ year: 1 });
subscriptionSchema.index({ paid_date: 1 });

export default mongoose.model("Subscription", subscriptionSchema);