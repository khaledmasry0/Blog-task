import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      &copy; {new Date().getFullYear()} My Blog. All rights reserved.
    </footer>
  );
};

export default Footer;
