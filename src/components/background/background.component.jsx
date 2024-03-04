import React from "react";
import { Outlet } from 'react-router-dom';


const BackgroundLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Outlet />
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;
