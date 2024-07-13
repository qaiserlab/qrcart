import "@/styles/main.css"
import MenuWidget from "@/widgets/MenuWidget"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <section>
          <MenuWidget />

          {children}
        </section>
      </body>
    </html>

  )
}