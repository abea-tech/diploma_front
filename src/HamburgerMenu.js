import React from 'react';

function HamburgerMenu(props) {
  return (
    <button
      className="hamburger-menu"
      onClick={props.onClick}
      aria-label="Toggle sidebar"
    >
      <span className="hamburger-menu-icon"></span>
    </button>
  );
}

export default HamburgerMenu;