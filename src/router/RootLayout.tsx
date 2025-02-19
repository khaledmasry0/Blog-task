import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* <div className="pr-[50px] milgg:pr-[20%] milgg:pl-[20%] pl-[50px] miilg:pr-[20px] miilg:pl-[20px] bg-[#f2fbfc]"> */}
      <Header />
      {/* </div> */}
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      {/* <div className="pr-[50px] milgg:pr-[20%] milgg:pl-[20%] pl-[50px] miilg:pr-[20px] miilg:pl-[20px] bg-[#f2fbfc] miillg:pb-[110px]"> */}
      <Footer />
      {/* // </div> */}
    </>
  );
}

export default RootLayout;
