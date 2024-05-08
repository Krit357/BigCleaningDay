import React from "react";

const Header = ({ children }) => {
  return (
    <h3 className="flex bg-slate-200 h-10 justify-center items-center font-bold text-xl ">
      {children}
    </h3>
  );
};

export default Header;
