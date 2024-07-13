"use client"

import { Table } from "reactstrap"

export default function InventoryView() {
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
              <a href="javascript:">View QRCode</a>
            </td>
          </tr>
        </tbody>
      </Table>
    </section>
  )
}