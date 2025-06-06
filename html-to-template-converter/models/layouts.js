// models/Template.js
const mongoose = require("mongoose");

const LayoutTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    template: { type: Object, required: true },
    styles: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "layouts", versionKey: false }
);

module.exports = mongoose.model("LayoutModel", LayoutTemplateSchema);
