import React from "react";

const MyLink = ({ children, to }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default behavior (anchor tag behavior)

    // Change the location and reload the page
    window.location.href = to;
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
    >
      {children}
    </div>
  );
};

export default MyLink;
