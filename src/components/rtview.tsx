import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

function RightView() {
  // let cursocket: any = null;
  const [showView, setShowView] = useState(false);
  const frameRef: any = useRef(null);

  return <div className="mika-mona-right-view" id="previewFrame"></div>;
}

export default observer(RightView);
