"use client"

import { useState } from "react"
import styles from "./page.module.css"
import dynamic from "next/dynamic"

const CreatorView = dynamic(() => import("./Views/CreatorView"), { ssr: false })
const ScannerView = dynamic(() => import("./Views/ScannerView"), { ssr: false })

export default function Home() {
  const [menu, setMenu] = useState("Scan")

  return (
    <main className={styles.main}>
      <div>
        <br />
        <a href="javascript:" onClick={() => setMenu("Scan")}>
          Scan
        </a>{" "}
        /
        <a href="javascript:" onClick={() => setMenu("Create")}>
          Create
        </a>
        <br />
        &nbsp;
        <br />
        &nbsp;
      </div>

      {menu === "Scan" && <ScannerView />}
      {menu === "Create" && <CreatorView />}
    </main>
  )
}
