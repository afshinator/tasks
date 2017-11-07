import React from "react";
import * as constants from "./constants";


// Fixed Header at the very top
//

const Header = () => (
  <header
    className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l"
    style={{ top: '0', background: constants.HEADER_BKGD }}>
  </header>
);

export default Header;
