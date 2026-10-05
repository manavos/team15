import mongoose, { Schema } from "mongoose";

const MenuItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ["coffee", "tea", "milktea", "pastry", "cake"] },
  available: { type: Boolean, required: true },
  imageUrl: { type: String, required: false },
});

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
