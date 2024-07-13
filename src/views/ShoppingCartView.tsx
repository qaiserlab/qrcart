"use client"

import { useState } from "react"
import { Button, Col, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"

function AddItemModal(props: TAddItemModalProps) {
  return (
    <Modal isOpen={props.display} toggle={props.onClose}>
      <ModalHeader toggle={props.onClose}>Add Item</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={2}>#</Col>
            <Col><Input type="text" /></Col>
          </Row>
          <Row>
            <Col md={2}>Product</Col>
            <Col><Input type="text" disabled /></Col>
          </Row>
          <Row>
            <Col md={2}>Price</Col>
            <Col><Input type="text" disabled /></Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => props.onClose()}>
          Add
        </Button>{' '}
        <Button color="secondary" onClick={props.onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default function ShoppingCartView() {
  const [displayModal, setDisplayModal] = useState(false)
  const [displayAddItem, setDisplayAddItem] = useState(false)

  return (
    <div>
      <h4>Shopping Cart</h4>

      <div style={{ textAlign: "right", paddingBottom: 16 }}>
        <Button color="primary">Scan QRCode</Button>&nbsp;
        <Button color="primary" onClick={() => setDisplayAddItem(true)}>Add Item</Button>&nbsp;
        <Button color="success" onClick={() => setDisplayModal(true)}>Pay</Button>
      </div>

      <Table bordered>
        <thead>
          <tr>
            <th style={{ width: 200 }}>#</th>
            <th>Product</th>
            <th style={{ width: 160 }}>Price</th>
            <th style={{ width: 160 }}>Qty</th>
            <th style={{ width: 160 }}>Sub Total</th>
            <th style={{ width: 160 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>900123467890111555321</td>
            <td>Black Coffe</td>
            <td>15.000</td>
            <td>2</td>
            <td>30.000</td>
            <td>
              <a href="javascript:">Delete</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total</th>
            <th>2</th>
            <th colSpan={2}>30.000</th>
          </tr>
        </tfoot>
      </Table>

      <AddItemModal display={displayAddItem} onClose={() => setDisplayAddItem(false)} />

      <Modal isOpen={displayModal} toggle={() => setDisplayModal(false)}>
        <ModalHeader toggle={() => setDisplayModal(false)}>QRCode</ModalHeader>
        <ModalBody>
          <table style={{ margin: '0 auto' }}>
            <tr>
              <td style={{ width: 100, height: 50 }}>Total</td>
              <td><Input type="text" style={{ width: 320 }} disabled /></td>
            </tr>
            <tr>
              <td style={{ width: 100, height: 50 }}>Pay</td>
              <td><Input type="text" style={{ width: 320 }} /></td>
            </tr>
            <tr>
              <td style={{ width: 100, height: 50 }}>Change</td>
              <td><Input type="text" style={{ width: 320 }} disabled /></td>
            </tr>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setDisplayModal(false)}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={() => setDisplayModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}