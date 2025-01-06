import React from 'react';

const Footer = () => {
  return (
    <div className="text-center p-5 bg-gray-100 mt-16">
      <p className="text-gray-700">
        © {new Date().getFullYear()} Naga Balaji. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
