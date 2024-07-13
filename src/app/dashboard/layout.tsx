import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard/shopping-cart">
              Shopping Cart
            </Link>
          </li>
          <li>
            <Link href="/dashboard/inventory">
              Inventory
            </Link>
          </li>
        </ul>
      </nav>
 
      {children}
    </section>
  )
}