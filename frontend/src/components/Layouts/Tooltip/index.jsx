// @ts-ignore
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "./_tooltip.scss";
import classNames from "classnames";

export const TooltipWrapper = forwardRef((props, ref) => {
  let styles = {};

  // @ts-ignore
  if (props.position) {
    styles = {
      ...props.styles,
      // @ts-ignore
      ...props.position,
    };
  }

  return (
    <div
      className={classNames(
        "editor__toolbar animated fadeIn faster-3 animate-transition-03",
        {
          [props.className]: props.className,
        }
      )}
      ref={ref}
      style={props.style}
    >
      {props.children}
    </div>
  );
});

TooltipWrapper.defaultProps = {
  // @ts-ignore
  classNames: "",
};

TooltipWrapper.propTypes = {
  // @ts-ignore
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.node,
  ]),
};

// @ts-ignore
export const TooltipBody = ({ children, className }) => (
  <div
    className={classNames("editor__toolbar-body", {
      [className]: className,
    })}
  >
    {children}
  </div>
);

TooltipBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.node,
  ]),
  className: PropTypes.string,
};
