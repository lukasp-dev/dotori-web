"use client";

import dynamic from "next/dynamic";

// SchoolMap을 클라이언트(브라우저)에서만 실행하게 만들기
const SchoolMap = dynamic(() => import("./SchoolMap"), { ssr: false });

export default SchoolMap;
