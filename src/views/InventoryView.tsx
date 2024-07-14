"use client"

import { useEffect, useRef, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Modal, ModalBody, ModalHeader, Spinner, Table } from "reactstrap"
import QrCreator from "qr-creator"
import useInventory from "@/hooks/useInventory"
import convertCurrency from "@/helpers/FormatHelper"

export default function InventoryView() {
  const [qrLoading, setQrLoading] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  const { 
    inventoryRecords, 
    inventoryActive, 
    fetchInventories, 
    setInventoryActiveBySn,
    isFetching,
  } = useInventory()

  const handleOpenQRCodeViewer = (inventoryActive: TInventory) => {
    setQrLoading(true)

    setInventoryActiveBySn(inventoryActive.sn)
    setDisplayModal(true)

    setTimeout(() => {
      if (qrRef.current) {
        qrRef.current.innerHTML = ''
        QrCreator.render(
          {
            text: inventoryActive.sn,
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
    fetchInventories()
  }, [])

  const qrRef: any = useRef(null)

  return (
    <section>
      <h4>Inventory</h4>

      {isFetching ? (<Spinner />) : (
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
              <td>{inventoryActive.sn}</td>
            </tr>
            <tr>
              <td>Product</td>
              <td>:</td>
              <td>{inventoryActive.product}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>:</td>
              <td>{convertCurrency(inventoryActive.price)}</td>
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