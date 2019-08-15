import React from "react";
import "../style/button.scss";

function Button({ icon, iconName, children, ...props }) {
  if (icon) {
    return (
      <button className="hover-button" {...props}>
        {children}{" "}
        <span role="img" aria-label={iconName}>
          {icon}
        </span>
      </button>
    );
  } else {
    return (
      <button className="hover-button" {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
