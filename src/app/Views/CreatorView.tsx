"use client"

import { useRef, useEffect, useState, ChangeEvent } from "react"
import QrCreator from "qr-creator"

export default function CreatorView() {
  const [qrText, setQrText] = useState("test")
  const qrRef: any = useRef(null)

  const handleCreateQr = () => {
    QrCreator.render(
      {
        text: qrText,
        radius: 0.5, // 0.0 to 0.5
        ecLevel: "H", // L, M, Q, H
        fill: "#536DFE", // foreground color
        background: null, // color or null for transparent
        size: 128, // in pixels
      },
      qrRef.current
    )

    setQrText("cek-" + Math.random())
  }

  const handleInputChange = (event: any) => {
    setQrText(event.target.value)
  }

  return (
    <div>
      <div ref={qrRef}></div>
      <input type="text" onChange={handleInputChange} value={qrText} />
      <button onClick={handleCreateQr}>create qr</button>
    </div>
  )
}
