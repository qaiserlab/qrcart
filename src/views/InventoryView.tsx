"use client"

import { useEffect, useRef, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Modal, ModalBody, ModalHeader, Spinner, Table } from "reactstrap"
import QrCreator from "qr-creator"
import convertCurrency from "@/helpers/FormatHelper"

export default function InventoryView() {
  const [loading, setLoading] = useState(false)
  const [qrLoading, setQrLoading] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  const [inventoryRecords, setInventoryRecords] = useState<Array<TInventory>>([])
  const [inventoryRecord, setInventoryRecord] = useState<TInventory>({
    sn: '',
    product: '',
    price: 0,
  })

  const handleOpenQRCodeViewer = (inventoryActive: TInventory) => {
    setQrLoading(true)

    setInventoryRecord(inventoryActive)
    setDisplayModal(true)

    setTimeout(() => {
      if (qrRef.current) {
        qrRef.current.innerHTML = ''
        QrCreator.render(
          {
            text: inventoryRecord.sn,
            radius: 0.5, // 0.0 to 0.5
            ecLevel: "H", // L, M, Q, H
            fill: "#536DFE", // foreground color
            background: null, // color or null for transparent
            size: 128, // in pixels
          },
          qrRef.current
        )
      }

      setQrLoading(false)
    }, 1000)
  }

  useEffect(() => {
    setLoading(true)

    axios.get('/data/inventory.json').then((response: AxiosResponse) => {
      const result = response.data
      setInventoryRecords(result.data)
    }).finally(() => setLoading(false))
  }, [])

  const qrRef: any = useRef(null)

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
              <tr key={`k-inventory-${item.sn}`}>
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
            {qrLoading && <Spinner />}

            <div ref={(ref) => {
              qrRef.current = ref
            }}
            ></div>
          </div>

        </ModalBody>
      </Modal>
    </section>
  )
}