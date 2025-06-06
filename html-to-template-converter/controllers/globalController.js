const GlobalModel = require("../models/globals"); // adjust path as needed

/**
 * Saves a twig_data block into MongoDB with logic for header/footer handling.
 * @param {Object} params - Parameters to save block.
 * @param {string} params.name - Block name.
 * @param {Object} params.twig_data - Parsed twig template.
 * @param {string} params.layout_id - Layout ID returned from Layouts collection.
 * @param {string} params.block_id - Block ID returned from BlockDefinition collection.
 */
async function saveGlobalDefinition(name, twig_data, layout_id, block_id) {
  try {
    const isHeader = name.toLowerCase().includes("header");
    const isFooter = name.toLowerCase().includes("footer");

    const location = isHeader ? "header" : isFooter ? "footer" : "page";

    const unique = isHeader || isFooter;

    const filter = { name }; // if names are unique per layout

    const update = {
      name,
      layout_id,
      block_id,
      location,
      unique,
      data: twig_data,
      updatedAt: new Date(), // optional
    };

    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };

    const result = await GlobalModel.findOneAndUpdate(filter, update, options);
    console.log("✅ Global definition saved:", result._id);
    return result;
  } catch (error) {
    console.error("❌ Failed to save global definition:", error.message);
    throw error;
  }
}

module.exports = {
  saveGlobalDefinition,
};
