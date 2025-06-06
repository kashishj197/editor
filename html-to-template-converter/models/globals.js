const mongoose = require("mongoose");

const GlobalTemplateSchema = new mongoose.Schema(
  {
    block_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    layout_id: { type: Object, required: true },
    settings: {
      type: Object,
      default: {
        paddings: {
          top: 80,
          bottom: 80,
        },
        background: {
          type: "color",
          background_color_id: null,
        },
      },
    },
    data: { type: Object, required: true, default: {} },
    createdAt: { type: Date, default: Date.now },
    access: {
      type: Object,
      default: { duplicate: false, delete: true, sortable: true },
    },
    unique: { type: Boolean, default: false },
    location: {
      type: String,
      enum: ["header", "footer", "page"],
      default: "page",
    },
  },
  { collection: "globals", versionKey: false }
);

module.exports = mongoose.model("GlobalModel", GlobalTemplateSchema);
