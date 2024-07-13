import dynamic from "next/dynamic"

const InventoryView = dynamic(() => import("@/views/InventoryView"), { ssr: false })

export default function InventoryPage() {
  return (
    <InventoryView />
  )
}