import React from "react";
import useMobile from "../hooks/isMobile";

import DesktopMestre from "./DesktopMestre";
import MobileMestre from "./MobileMestre";

export default function Mestre() {
  const isMobile = useMobile();

  return (
    <React.Fragment>
      {isMobile ? <MobileMestre /> : <DesktopMestre />}
    </React.Fragment>
  );
}
