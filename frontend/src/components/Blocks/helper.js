export const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  return selection.getRangeAt(0);
};

export const getLengthOfSelectedText = (editorState) => {
  const currentSelection = editorState.getSelection();
  const isCollapsed = currentSelection.isCollapsed();

  let length = 0;

  if (!isCollapsed) {
    const currentContent = editorState.getCurrentContent();
    const startKey = currentSelection.getStartKey();
    const endKey = currentSelection.getEndKey();
    const startBlock = currentContent.getBlockForKey(startKey);
    const isStartAndEndBlockAreTheSame = startKey === endKey;
    const startBlockTextLength = startBlock.getLength();
    const startSelectedTextLength =
      startBlockTextLength - currentSelection.getStartOffset();
    const endSelectedTextLength = currentSelection.getEndOffset();
    const keyAfterEnd = currentContent.getKeyAfter(endKey);

    if (isStartAndEndBlockAreTheSame) {
      length +=
        currentSelection.getEndOffset() - currentSelection.getStartOffset();
    } else {
      let currentKey = startKey;

      while (currentKey && currentKey !== keyAfterEnd) {
        if (currentKey === startKey) {
          length += startSelectedTextLength + 1;
        } else if (currentKey === endKey) {
          length += endSelectedTextLength;
        } else {
          length += currentContent.getBlockForKey(currentKey).getLength() + 1;
        }

        currentKey = currentContent.getKeyAfter(currentKey);
      }
    }
  }

  return length;
};

export const mediaBlockRenderer = (
  block,
  getEditorState,
  onChangeEditorState
) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
      props: {
        getEditorState,
        setEditorState: onChangeEditorState,
      },
    };
  }

  return null;
};

export const convertEditorStateToHTML = (editorState) => {
  if (editorState) {
    if (_.isString(editorState)) {
      return editorState;
    }
    if (_.isObject(editorState)) {
      const inlineStyles = exporter(editorState);
      const currentContent = editorState.getCurrentContent();
      return stateToHTML(currentContent, {
        inlineStyles,
        // eslint-disable-next-line
        entityStyleFn: (entity) => {
          const entityType = entity.get("type").toLowerCase();
          if (entityType === "link") {
            const data = entity.getData();
            let href = "#";

            if (data.type === "anchor") {
              if (data.value) {
                href = `#block_${data.value}`;
              }
            } else {
              href = data.url;
            }
            return {
              element: "a",
              attributes: {
                target: data && data.blank ? "_blank" : "_self",
                href,
              },
            };
          }
        },
        // eslint-disable-next-line
        blockStyleFn: (block) => {
          const alignKey = block.getData().get(ALIGNMENT_DATA_KEY);
          if (alignKey) {
            return {
              attributes: {
                class: `text-${alignKey.toLowerCase()}`,
              },
            };
          }
        },
      });
    }
  }

  return false;
};
