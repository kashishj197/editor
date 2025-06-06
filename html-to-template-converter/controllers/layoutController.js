const LayoutModel = require("../models/layouts");

async function saveConvertedTemplate(name, template, styles) {
  try {
    const updatedTemplate = await LayoutModel.findOneAndUpdate(
      { name }, // filter
      { template, styles, updatedAt: new Date() }, // update fields
      { upsert: true, new: true } // create if not exist, return new doc
    );

    console.log(
      updatedTemplate.wasNew ? "✅ Template created" : "🔁 Template updated"
    );
    console.log("✅ Template saved:", updatedTemplate._id);
    return updatedTemplate._id;
  } catch (err) {
    console.error("❌ Failed to save template:", err.message);
  }

  return false;
}

module.exports = { saveConvertedTemplate };
