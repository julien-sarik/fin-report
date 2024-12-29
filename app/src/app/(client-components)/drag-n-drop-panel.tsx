'use client'

import { useState } from "react";
import FileDrop from "./drag-n-drop";
import Report from "./report";

export default function FileDropArea() {
  const [report, setReport] = useState<string>();

  return ( 
    <div>
      <FileDrop onNewFile={setReport}/>
      <Report csv={report}/>
    </div>
  );
}
