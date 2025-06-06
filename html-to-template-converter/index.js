const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const css = require("css");
const {
  htmlToDraftRaw,
  getAllFileNamesWithoutExtensions,
} = require("./helper");
const LayoutModel = require("./models/layouts");
const { json } = require("stream/consumers");
const { saveConvertedTemplate } = require("./controllers/layoutController");
const { saveBlockDefinition } = require("./controllers/blockController");
const connectToDB = require("./db");
const { saveGlobalDefinition } = require("./controllers/globalController");

const generateTemplates = (htmlFileName) => {
  const htmlInputPath = path.join(
    __dirname,
    `./htmlTemplates/${htmlFileName}.html`
  );
  const html = fs.readFileSync(htmlInputPath, "utf-8");
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const styleMap = {};
  const twigKeys = [];

  /** ✅ NEW: Extract styles from <style> blocks **/
  function extractStylesFromStyleTags() {
    const styleTags = Array.from(document.querySelectorAll("style"));
    for (const tag of styleTags) {
      const parsed = css.parse(tag.textContent);
      parsed.stylesheet.rules.forEach((rule) => {
        if (rule.type === "rule") {
          rule.selectors.forEach((selector) => {
            if (selector.startsWith(".")) {
              const newStyles = rule.declarations.reduce((acc, decl) => {
                if (decl.type === "declaration") {
                  acc[decl.property] = decl.value;
                }
                return acc;
              }, {});

              // 🧠 Merge with existing styles if already present
              if (!styleMap[selector]) {
                styleMap[selector] = { attributes: newStyles };
              } else {
                styleMap[selector].attributes = {
                  ...styleMap[selector].attributes,
                  ...newStyles,
                };
              }
            }
          });
        }
      });
    }
  }

  /** Traversal stays same as before, but ignores inline styles **/
  function traverseNode(node, parentKey = "") {
    if (node.nodeType === 3) return null;
    const tagName = node.tagName?.toLowerCase();
    if (!tagName) return null;

    const classList = node.classList ? Array.from(node.classList) : [];
    const dataKeyAttr = node.getAttribute("data-key");
    const dataKey = dataKeyAttr
      ? parentKey
        ? `${parentKey}_${dataKeyAttr}`
        : dataKeyAttr
      : parentKey;

    const element = {
      tagName,
      attrs: {},
    };

    if (classList.length) {
      element.attrs.className = classList;
    }

    ["colspan", "rowspan", "contenteditable"].forEach((attr) => {
      if (node.hasAttribute(attr)) {
        element.attrs[attr] = node.getAttribute(attr);
      }
    });

    const children = [];
    node.childNodes.forEach((child) => {
      const result = traverseNode(child, dataKey || parentKey);
      if (result) children.push(result);
    });

    const textContent = node.textContent?.trim();
    const hasOnlyText = textContent && children.length === 0;

    if (hasOnlyText && dataKey) {
      const key = `twig.${dataKey}`;
      const editorSupport = node.getAttribute("data-editor") ? true : null;
      let value = textContent;

      if (editorSupport) {
        const rawDraft = htmlToDraftRaw(textContent);
        value = rawDraft; // Replace plain text with draft raw content
      }
      twigKeys.push({ key, value });
      element.text = {
        editor: editorSupport,
        source: {
          typeData: "data",
          value: key,
        },
      };
      // if editor support is enabled, add options
      if (editorSupport) {
        const editorOptions = node.getAttribute("data-editor-options");
        element.text.tooltip = editorOptions ? JSON.parse(editorOptions) : {};
      }
    }

    if (children.length > 0) {
      element.children = children;
    }

    return element;
  }

  // ✅ First extract styles from <style> tags
  extractStylesFromStyleTags();

  const root = document.body.children[0];
  const jsonOutput = {
    styles: {
      children: styleMap,
      attributes: [],
    },
    template: traverseNode(root),
  };
  const outputDir = path.join(__dirname, `./generatedFiles/${htmlFileName}`);
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, `${htmlFileName}.json`),
    JSON.stringify(jsonOutput, null, 2)
  );
  console.log("✅ Generated template from → ", htmlFileName);

  // Build final data object from collected twigKeys
  const twigData = {};
  twigKeys.forEach(({ key, value }) => {
    const keyName = key.replace(/^twig\./, ""); // strip "twig." prefix
    twigData[keyName] = value;
  });

  // Write the Twig-style data JSON
  fs.writeFileSync(
    path.join(outputDir, `${htmlFileName}_twig_data.json`),
    JSON.stringify(twigData, null, 2)
  );
  console.log(
    "✅ Twig data context written → ",
    `${htmlFileName}_twig_data.json`
  );

  return { htmlFileName, twigData, jsonOutput };
};

const names = getAllFileNamesWithoutExtensions(
  path.join(__dirname, "htmlTemplates")
);

if (names.length === 0) {
  console.error("No HTML files found in the htmlTemplates directory.");
  process.exit(1);
}

const generateHtmlTemplates = () => {
  names.map(async (name) => {
    const { htmlFileName, twigData, jsonOutput } = generateTemplates(name);
    // To save and create in database
    const layout_id = await saveConvertedTemplate(
      htmlFileName,
      jsonOutput.template,
      jsonOutput.styles
    );
    if (layout_id) {
      // once layouts are saved, we can save the block definitions
      const blockDefinition = await saveBlockDefinition(
        htmlFileName,
        twigData,
        layout_id
      );
      if (
        (blockDefinition && name.toLowerCase().includes("header")) ||
        name.toLowerCase().includes("footer")
      ) {
        await saveGlobalDefinition(
          name,
          twigData,
          layout_id,
          blockDefinition._id
        );
      }
    }
  });
};

(async () => {
  await connectToDB(); // ✅ important
  generateHtmlTemplates();
})();
