import React, { useState, useRef, forwardRef } from "react";
import "../../../../../../styles/actions/_action_color.scss";
import PropTypes from "prop-types";
import Item from "../../Layouts/Item";
// import ColorsLibrary from "../../../../Popups/ColorsLibrary";

import Tooltip from "../../../../../Elements/Tooltip";
import ButtonWrapper from "../../../../../Layouts/Buttons/ButtonWrapper";
import { HexColorPicker } from "react-colorful";

/**
 * Цвет выделенного текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Color = forwardRef((props) => {
  const { onChange, value } = props;
  const [isOpenColorLibrary, setOpenColorLibrary] = useState(false);
  const node = useRef(null);
  const [color, setColor] = useState(value || "#000000");

  const openColorLibrary = () => {
    setOpenColorLibrary((prevState) => !prevState);
  };

  return (
    <>
      <Item onClick={() => openColorLibrary()}>
        <Tooltip text="Colors" offset={12}>
          <ButtonWrapper>
            <div className="wysiwyg-actions__item-color" ref={node}>
              <div
                className="wysiwyg-actions__item-color-preview"
                style={{ backgroundColor: value || "transparent" }}
              />
            </div>
          </ButtonWrapper>
        </Tooltip>
      </Item>

      {isOpenColorLibrary && (
        <div style={{ position: "absolute", zIndex: 999 }}>
          <HexColorPicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor);
              onChange("color", newColor);
            }}
          />
        </div>
      )}
    </>
  );
});

Color.propTypes = {
  /**
   * Передаем ключ colors для EditorState
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Цвет выделенного текста
   */
  value: PropTypes.string,
};

Color.defaultProps = {};

export default Color;
