"use client"

import { useRef, useEffect, useState, ChangeEvent } from "react"
import QrScanner from "qr-scanner"

export default function ScannerView() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string>("")

  const handleScan = () => {
    setScanning(true)
    const interval = setInterval(() => {
      if (videoRef.current) {
        const qrScanner = new QrScanner(
          videoRef.current,
          (result) => {
            setResult(String(result))
            qrScanner.stop()
            setScanning(false)
          },
          {
            onDecodeError: (error) => console.error(error),
          }
        )
        qrScanner.start()
        clearInterval(interval)
      }
    }, 100)
  }

  return (
    <div>
      <button onClick={handleScan} disabled={scanning}>
        {scanning ? "Scanning..." : "Scan QR Code"}
      </button>
      <br />
      {result && <p>Result: {result}</p>}
      {scanning && <video ref={videoRef} className="scanner-video"></video>}
      
    </div>
  )
}
