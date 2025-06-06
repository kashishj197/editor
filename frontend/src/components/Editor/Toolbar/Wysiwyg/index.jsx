import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { RichUtils, Modifier, EditorState } from "draft-js";
import clearFormatting from "draft-js-clear-formatting";
import usePortal from "react-useportal";
import "./_wysiwyg.scss";

import { TooltipBody, TooltipWrapper } from "../../../Layouts/Tooltip";

import Wrapper from "./Layouts/Wrapper";
import HeaderList from "./actions/Headers/List";
import AlignList from "./actions/Align/List";
import FontSizeList from "./actions/FontSize/List";
import LetterSpacingList from "./actions/LetterSpacing/List";
import LineHeightList from "./actions/LineHeight/List";

import ActionAlign from "./actions/Align";
import ButtonBold from "./actions/Bold";
import ButtonItalic from "./actions/Italic";
import ButtonUnderline from "./actions/Underline";
import ButtonStrikethrough from "./actions/Strikethrough";
import Headers from "./actions/Headers";
import ButtonUppercase from "./actions/Uppercase";
import ButtonFontSize from "./actions/FontSize";
import ButtonLineHeight from "./actions/LineHeight";
import ButtonLetterSpacing from "./actions/LetterSpacing";
import ButtonLink from "./actions/Link";
import ButtonListOL from "./actions/ListOL";
import ButtonListUl from "./actions/ListUL";
import ButtonColor from "./actions/Color";
import ButtonClear from "./actions/Clear";

import {
  CUSTOM_STYLES_JS,
  DEFAULT_STYLES,
  ExtendedRichUtils,
  toolbarClass,
} from "../../../../utils/core/config";
import { getSelectionValues } from "../../../../utils/core/getSelectionValues";
import { isClickToToolbarNode } from "../../../../utils/helpers/helper";
import { getToolbarCoords } from "../../../../utils/helpers/getToolbarCoords";
import ButtonWrapper from "../../../Layouts/Buttons/ButtonWrapper";

/**
 * Wysiwyg
 *
 * @component
 * @category Components
 * @subcategory Tooltips main
 *
 */
const Toolbar = ({ tooltip, selectionRangeObj, onClose, ...props }) => {
  const { editorState, styles, onChange } = props;

  const toolbarNode = useRef(null);
  const { Portal } = usePortal();

  const activeValues = getSelectionValues(editorState);
  const [activeAction, setActiveAction] = useState(false);
  const [position, setPosition] = useState({});
  const [tooltipBody, setTooltipBody] = useState("");

  const [toolbarSettings, setToolbarSettings] = useState({
    init: false,
    toolBarBounds: false,
    selectRangeBounds: false,
  });

  useEffect(() => {
    document.addEventListener("mousedown", outSideClick);

    setToolbarSettings({
      init: true,
      toolBarBounds: toolbarNode.current.getBoundingClientRect(),
      selectRangeBounds: selectionRangeObj,
    });
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outSideClick = (e) => {
    if (toolbarNode.current && toolbarNode.current.contains(e.target)) {
      return false;
    }
    const isClick = isClickToToolbarNode(toolbarClass, e.target);
    if (isClick) {
      return false;
    }

    return onClose();
  };

  const onChangeInlineStyle = (code) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, code);
    onChange(newEditorState);
  };

  const onChangeBlockType = (styles) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, styles);
    onChange(newEditorState);
  };

  const onChangeCustomStyles = (key, value) => {
    // console.log(value);
    onChange(styles[key].toggle(editorState, value));
    onChangeTooltipBody(key);
  };

  const onChangeAlignment = (value) => {
    const valueToUpperCase = value.toUpperCase();
    const newEditorState = styles.textAlign.toggle(
      editorState,
      valueToUpperCase
    );
    onChange(
      ExtendedRichUtils.toggleAlignment(newEditorState, valueToUpperCase)
    );
  };

  const onClearStyles = () => {
    const currentInlineStyleList = editorState
      .getCurrentInlineStyle()
      .toList()
      .toJS();
    const allStyles = [
      ...new Set(currentInlineStyleList.concat(DEFAULT_STYLES)),
    ];

    const contentState = editorState.getCurrentContent();

    const contentWithoutStyles = allStyles.reduce(
      (newContentState, style) =>
        Modifier.removeInlineStyle(
          newContentState,
          editorState.getSelection(),
          style
        ),
      contentState
    );

    const newEditorState = EditorState.push(
      editorState,
      contentWithoutStyles,
      "change-inline-style"
    );
    const options = {
      inline: true,
      entities: true,
      lists: true,
    };

    let EditorStateRemoveStyles = newEditorState;
    CUSTOM_STYLES_JS.forEach((item) => {
      EditorStateRemoveStyles = styles[item].remove(EditorStateRemoveStyles);
    });

    onChange(clearFormatting(EditorStateRemoveStyles, options));
  };

  const onChangeTooltipBody = (value) => {
    setTooltipBody(value);
  };

  useEffect(() => {
    if (toolbarSettings.toolBarBounds) {
      const coords = getToolbarCoords(
        toolbarNode.current.getBoundingClientRect(),
        selectionRangeObj
      );
      setPosition(coords);
      setToolbarSettings((prevState) => ({
        ...prevState,
        init: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    toolbarSettings.toolBarBounds.width,
    toolbarSettings.selectRangeBounds.width,
    selectionRangeObj.width,
    selectionRangeObj.height,
    tooltipBody,
  ]);

  const onChangeLink = (link) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url: link.value,
        ...link,
      }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const _newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    const newEditorState = RichUtils.toggleLink(
      _newEditorState,
      _newEditorState.getSelection(),
      entityKey
    );
    onChange(newEditorState);
  };

  const options = tooltip && tooltip.options ? tooltip.options : false;

  const onChangeActive = (value) => {
    setActiveAction(value);
  };

  return (
    <Portal>
      <TooltipWrapper
        ref={toolbarNode}
        style={{
          display: "inline-block",
          visibility:
            toolbarSettings.init && position && position.top !== 2
              ? "visible"
              : "hidden",
          ...position,
        }}
        classNames={toolbarClass}
      >
        <TooltipBody>
          {(() => {
            switch (tooltipBody) {
              case "headers":
                return (
                  <HeaderList
                    onClose={() => onChangeTooltipBody(false)}
                    onChange={onChangeBlockType}
                    value={activeValues.HEADER}
                  />
                );

              case "align":
                return (
                  <AlignList
                    onClose={() => onChangeTooltipBody(false)}
                    onChange={onChangeAlignment}
                    value={activeValues.ALIGN}
                  />
                );

              case "fontSize":
                return (
                  <FontSizeList
                    onClose={() => onChangeTooltipBody(false)}
                    onChange={onChangeCustomStyles}
                    value={activeValues.FONT_SIZE}
                    headers={activeValues.HEADER}
                  />
                );

              case "letterSpacing":
                return (
                  <LetterSpacingList
                    onClose={() => onChangeTooltipBody(false)}
                    onChange={onChangeCustomStyles}
                    value={activeValues.LETTER_SPACING}
                  />
                );

              case "lineHeight":
                return (
                  <LineHeightList
                    onClose={() => onChangeTooltipBody(false)}
                    onChange={onChangeCustomStyles}
                    value={activeValues.LINE_HEIGHT}
                    headers={activeValues.HEADER}
                  />
                );
              default:
                return (
                  <>
                    {options &&
                      Object.keys(options).map((item, index) => {
                        switch (item) {
                          case "headers":
                            return (
                              <ButtonWrapper>
                                <Headers
                                  key={`actions-button-${index}`}
                                  onClick={() => onChangeTooltipBody(item)}
                                  value={activeValues.HEADER}
                                />
                              </ButtonWrapper>
                            );
                          case "bold":
                            return (
                              <ButtonWrapper>
                                <ButtonBold
                                  key={`actions-button-${index}`}
                                  onClick={onChangeInlineStyle}
                                  value={activeValues.BOLD}
                                />
                              </ButtonWrapper>
                            );
                          case "italic":
                            return (
                              <ButtonWrapper>
                                <ButtonItalic
                                  key={`actions-button-${index}`}
                                  onClick={onChangeInlineStyle}
                                  value={activeValues.ITALIC}
                                />
                              </ButtonWrapper>
                            );
                          case "underline":
                            return (
                              <ButtonWrapper>
                                <ButtonUnderline
                                  key={`actions-button-${index}`}
                                  onClick={onChangeInlineStyle}
                                  value={activeValues.UNDERLINE}
                                />
                              </ButtonWrapper>
                            );
                          case "strikethrough":
                            return (
                              <ButtonWrapper>
                                <ButtonStrikethrough
                                  key={`actions-button-${index}`}
                                  onClick={onChangeInlineStyle}
                                  value={activeValues.STRIKETHROUGH}
                                />
                              </ButtonWrapper>
                            );
                          case "uppercase":
                            return (
                              <ButtonWrapper>
                                <ButtonUppercase
                                  key={`actions-button-${index}`}
                                  onClick={onChangeCustomStyles}
                                  value={activeValues.TEXT_TRANSFORM}
                                />
                              </ButtonWrapper>
                            );
                          case "fontSize":
                            return (
                              <ButtonWrapper>
                                <ButtonFontSize
                                  key={`actions-button-${index}`}
                                  onClick={() => onChangeTooltipBody(item)}
                                  value={activeValues.FONT_SIZE}
                                />
                              </ButtonWrapper>
                            );
                          case "lineHeight":
                            return (
                              <ButtonWrapper>
                                <ButtonLineHeight
                                  key={`actions-button-${index}`}
                                  onClick={() => onChangeTooltipBody(item)}
                                  value={activeValues.LINE_HEIGHT}
                                />
                              </ButtonWrapper>
                            );
                          case "letterSpacing":
                            return (
                              <ButtonWrapper>
                                <ButtonLetterSpacing
                                  key={`actions-button-${index}`}
                                  onClick={() => onChangeTooltipBody(item)}
                                  value={activeValues.LETTER_SPACING}
                                />
                              </ButtonWrapper>
                            );
                          case "align":
                            return (
                              <ButtonWrapper>
                                <ActionAlign
                                  key={`actions-button-${index}`}
                                  onClick={() => onChangeTooltipBody(item)}
                                />
                              </ButtonWrapper>
                            );
                          case "link":
                            return (
                              <ButtonWrapper>
                                <ButtonLink
                                  key={`actions-button-${index}`}
                                  onChange={onChangeLink}
                                  value={activeValues.LINK}
                                />
                              </ButtonWrapper>
                            );
                          case "ol":
                            return (
                              <ButtonWrapper>
                                <ButtonListOL
                                  key={`actions-button-${index}`}
                                  onClick={onChangeBlockType}
                                  value={activeValues.OL}
                                />
                              </ButtonWrapper>
                            );
                          case "ul":
                            return (
                              <ButtonWrapper>
                                <ButtonListUl
                                  key={`actions-button-${index}`}
                                  onClick={onChangeBlockType}
                                  value={activeValues.UL}
                                />
                              </ButtonWrapper>
                            );
                          case "color":
                            return (
                              <ButtonWrapper>
                                <ButtonColor
                                  key={`actions-button-${index}`}
                                  onChange={onChangeCustomStyles}
                                  value={activeValues.COLOR}
                                />
                              </ButtonWrapper>
                            );
                          case "clear":
                            return (
                              <ButtonWrapper>
                                <ButtonClear
                                  key={`actions-button-${index}`}
                                  onClick={onClearStyles}
                                />
                              </ButtonWrapper>
                            );
                            return (
                              <ButtonClear
                                key={`actions-button-${index}`}
                                onClick={onClearStyles}
                              />
                            );
                          default:
                            return null;
                        }
                      })}
                  </>
                );
            }
          })()}
        </TooltipBody>
      </TooltipWrapper>
    </Portal>
  );
};

Toolbar.defaultProps = {};

export default Toolbar;
