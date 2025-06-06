// @ts-ignore
import React, { useState, useRef } from "react";
import "../../../../../../styles/actions/_action_link.scss";
import PropTypes from "prop-types";
import { ReactComponent as LINK } from "../../../../../../assets/img/wysiwyg/link.svg";
import Item from "../../Layouts/Item";
// @ts-ignore
// import SettingsLink from "../../../../Popups/SettingsLink";

import Tooltip from "../../../../../Elements/Tooltip";

/**
 * Ссылка
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
// @ts-ignore
const Link = ({ onChange, value }) => {
  const [isOpenLink, setOpenLink] = useState(false);
  const node = useRef(null);

  return (
    <Item
      active={value || false}
      onClick={() => setOpenLink(true)}
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* {isOpenLink ? (
        <SettingsLink
          rootNode={node}
          value={value}
          onChange={onChange}
          refNode={false}
          onClose={() => setOpenLink(false)}
        />
      ) : null} */}
      <Tooltip text="Link" offset={8}>
        <LINK ref={node} />
      </Tooltip>
    </Item>
  );
};

Link.propTypes = {
  /**
   * Возвращаем новый объект ссылкой для EditorState (DraftJS)
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Ref кнопки тултипа
   */
  refNode: PropTypes.object,
  /**
   * Объект с информацией о ссылеке type | value
   */
  value: PropTypes.any,
};

Link.defaultProps = {};

export default Link;
