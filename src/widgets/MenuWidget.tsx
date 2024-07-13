"use client"

import { Nav, NavItem, NavLink } from "reactstrap"

export default function MenuWidget() {
  return (
    <section>
      <Nav>
        <NavItem>
          <NavLink href="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/shopping-cart">
            Shopping Cart
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/inventory">
            Inventory
          </NavLink>
        </NavItem>
      </Nav>
    </section>
  )
}