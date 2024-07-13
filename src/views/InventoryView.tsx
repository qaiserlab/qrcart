"use client"

import { useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"

export default function InventoryView() {
  const [displayModal, setDisplayModal] = useState(false)
  return (
    <section>
      <h4>Inventory</h4>
      <Table bordered>
        <thead>
          <tr>
            <th style={{ width: 200}}>#</th>
            <th>Product</th>
            <th style={{ width: 160}}>Price</th>
            <th style={{ width: 160}}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>900123467890111555321</td>
            <td>Black Coffe</td>
            <td>15.000</td>
            <td>
              <a href="javascript:" onClick={() => setDisplayModal(true)}>View QRCode</a>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal isOpen={displayModal} toggle={() => setDisplayModal(false)}>
        <ModalHeader toggle={() => setDisplayModal(false)}>QRCode</ModalHeader>
        <ModalBody>
          <table>
            <tr>
              <td>#</td>
              <td>: -</td>
            </tr>
            <tr>
              <td>Product</td>
              <td>: -</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: -</td>
            </tr>
          </table>

          <div style={{ textAlign: "center", margin: 48 }}>
            --- QRCode Here ---
          </div>
        </ModalBody>
      </Modal>
    </section>
  )
}