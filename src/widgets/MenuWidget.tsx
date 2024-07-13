"use client"

import Link from "next/link"

export default function MenuWidget() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/shopping-cart">
            Shopping Cart
          </Link>
        </li>
        <li>
          <Link href="/inventory">
            Inventory
          </Link>
        </li>
      </ul>
    </nav>
  )
}