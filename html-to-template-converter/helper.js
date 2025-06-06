const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// 👇 Setup global DOM before loading html-to-draftjs
const { window } = new JSDOM(``);
global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;
global.Node = window.Node;

const { ContentState, convertToRaw } = require("draft-js");
const htmlToDraft = require("html-to-draftjs").default;

function htmlToDraftRaw(html) {
  const contentBlock = htmlToDraft(html);
  if (
    !contentBlock ||
    !contentBlock.contentBlocks ||
    contentBlock.contentBlocks.length === 0
  ) {
    return null;
  }
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
    contentBlock.entityMap
  );
  return convertToRaw(contentState);
}

function getAllFilesPath(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function getAllFileNamesWithoutExtensions(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFileNamesWithoutExtensions(fullPath, fileList);
    } else {
      const fileName = path.parse(fullPath).name;
      fileList.push(fileName);
    }
  });

  return fileList;
}

module.exports = {
  htmlToDraftRaw,
  getAllFilesPath,
  getAllFileNamesWithoutExtensions,
};
