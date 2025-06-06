import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ALIGN_LEFT } from "../../../../../../assets/img/wysiwyg/alight_left.svg";
import { ReactComponent as ALIGN_CENTER } from "../../../../../../assets/img/wysiwyg/alight_center.svg";
import { ReactComponent as ALIGN_RIGHT } from "../../../../../../assets/img/wysiwyg/alight_right.svg";
import { ReactComponent as ALIGN_JUSTIFY } from "../../../../../../assets/img/wysiwyg/align_justify.svg";
import Item from "../../Layouts/Item";
import ItemClose from "../../Layouts/ItemClose";

import Tooltip from "../../../../../Elements/Tooltip";
import ButtonWrapper from "../../../../../Layouts/Buttons/ButtonWrapper";

const list = [
  {
    value: "center",
    icon: <ALIGN_CENTER />,
  },
  {
    value: "left",
    icon: <ALIGN_LEFT />,
  },
  {
    value: "right",
    icon: <ALIGN_RIGHT />,
  },
  {
    value: "justify",
    icon: <ALIGN_JUSTIFY />,
  },
];

/**
 * Список Align
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const AlignList = ({ onChange, onClose, value }) => (
  <>
    {list.map((item, index) => {
      const active = !!(value && value === item.value);
      return (
        <ButtonWrapper>
          <Item
            key={index}
            onClick={() => onChange(item.value)}
            active={active}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Tooltip
              text={item.value[0].toUpperCase() + item.value.substr(1)}
              offset={8}
            >
              {item.icon}
            </Tooltip>
          </Item>
        </ButtonWrapper>
      );
    })}
    <Tooltip text="Back" offset={8}>
      <ItemClose onClick={onClose} />
    </Tooltip>
  </>
);

AlignList.propTypes = {
  /**
   * Возвзрат значения center | left | right | justify
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Закрыть список с выбором Align
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Значение Align center | left | right | justify
   */
  value: PropTypes.string,
};

AlignList.defaultProps = {};

export default AlignList;
