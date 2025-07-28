'use client'

import "aos/dist/aos.css"
import React from "react"
import AHeader from "./components/AHeader"
import dynamic from "next/dynamic"
const AROPod = dynamic(() => import('./components/AROPod'), { ssr: false });

export default function Home() {

  return <div>
    <AHeader />
    <AROPod />

  </div>

}
