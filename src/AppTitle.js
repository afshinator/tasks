import React from "react";
const BKGD_COLOR = "#2e3e51";


// Fixed Header at the very top
//
const AppTitle = () => (
  <header
    className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l"
    style={{ top: '0', background: BKGD_COLOR }}>
  </header>
);

export default AppTitle;
