import 'bootstrap/dist/css/bootstrap.min.css'

import "@/styles/main.css"
import MenuWidget from "@/widgets/MenuWidget"
import { Col, Container, Row } from 'reactstrap'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Container>
          <Row>
            <Col className="bg-light border">
              <MenuWidget />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: 80 }}>
              {children}
            </Col>
          </Row>
        </Container>
      </body>
    </html>

  )
}