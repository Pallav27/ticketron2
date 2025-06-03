import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema(
  {
    userId: { type: String, required: true },
    category: String,
    points: [String],
    urgency: String,
    department: String,
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
