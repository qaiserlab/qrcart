"use client"

import convertCurrency from "@/helpers/FormatHelper"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Spinner, Table } from "reactstrap"

export default function InventoryView() {
  const [loading, setLoading] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  const [inventoryRecords, setInventoryRecords] = useState<Array<TInventory>>([])
  const [inventoryRecord, setInventoryRecord] = useState<TInventory>({
    sn: '',
    product: '',
    price: 0,
  })

  const handleOpenQRCodeViewer = (inventoryActive: TInventory) => {
    setInventoryRecord(inventoryActive)
    setDisplayModal(true)
  }

  useEffect(() => {
    setLoading(true)

    axios.get('/data/inventory.json').then((response: AxiosResponse) => {
      const result = response.data
      setInventoryRecords(result.data)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h4>Inventory</h4>

      {loading ? (<Spinner />) : (
        <Table bordered>
          <thead>
            <tr>
              <th style={{ width: 200 }}>#</th>
              <th>Product</th>
              <th style={{ width: 160 }}>Price</th>
              <th style={{ width: 160 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventoryRecords?.map((item) => (
              <tr>
                <td>{item.sn}</td>
                <td>{item.product}</td>
                <td>{convertCurrency(item.price)}</td>
                <td>
                  <a href="javascript:" onClick={() => handleOpenQRCodeViewer(item)}>View QRCode</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal isOpen={displayModal} toggle={() => setDisplayModal(false)}>
        <ModalHeader toggle={() => setDisplayModal(false)}>QRCode</ModalHeader>
        <ModalBody>
          <table>
            <tr>
              <td>#</td>
              <td>:</td>
              <td>{inventoryRecord.sn}</td>
            </tr>
            <tr>
              <td>Product</td>
              <td>:</td>
              <td>{inventoryRecord.product}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>:</td>
              <td>{convertCurrency(inventoryRecord.price)}</td>
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