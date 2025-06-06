import React from "react";
import PropTypes from "prop-types";
import "../_wysiwyg.scss";

/**
 * Wrapper - Контейнер для списков <Items>
 *
 * @component
 * @category Components
 * @subcategory Tooltip layouts
 *
 */
// @ts-ignore
const Wrapper = ({ children }) => (
  <div className="wysiwyg-actions">{children}</div>
);

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.node,
  ]),
};

export default Wrapper;
