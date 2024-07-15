"use client"

import { useEffect, useState } from "react"
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Table,
} from "reactstrap"
import { useFormik } from "formik"
import convertCurrency from "@/helpers/FormatHelper"
import useInventory from "@/hooks/useInventory"
import useShoppingCart from "@/hooks/useShoppingCart"
import axios from "axios"

function AddItemModal(props: TAddItemModalProps) {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      sn: "",
      qty: 1,
    },

    onSubmit: (values) => {
      setLoading(true)

      const price = parseInt(inventoryActive.price.toString())
      const qty = values.qty
      const subTotal = price * qty

      const formData = {
        ...inventoryActive,
        ...values,
        price,
        subTotal,
      }

      axios
        .post("/api/shopping-cart", formData)
        .then((response) => {
          console.log("here")
          if (props.onSaved) props.onSaved()
          props.onClose()
        })
        .finally(() => setLoading(false))
    },
  })

  const handleSnChange = (event: any) => {
    formik.setFieldValue("sn", event?.target?.value)
  }

  useEffect(() => {
    if (formik.values.sn) {
      setInventoryActiveBySn(formik.values.sn)
    } else {
      resetInventoryActive()
    }
  }, [formik.values.sn])

  const {
    fetchInventories,
    setInventoryActiveBySn,
    inventoryActive,
    resetInventoryActive,
  } = useInventory()

  useEffect(() => {
    fetchInventories()
  }, [])

  useEffect(() => {
    if (props.display) {
      formik.resetForm()
    }
  }, [props.display])

  return (
    <Modal isOpen={props.display} toggle={props.onClose}>
      <Form onSubmit={formik.handleSubmit}>
        <ModalHeader toggle={props.onClose}>Add Item</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={3}>#</Col>
            <Col>
              <Input
                type="text"
                name="sn"
                onChange={handleSnChange}
                onBlur={formik.handleBlur}
                value={formik.values.sn}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Product</Col>
            <Col>
              <Input type="text" value={inventoryActive?.product} disabled />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Price</Col>
            <Col>
              <Input
                type="text"
                value={convertCurrency(inventoryActive?.price)}
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Qty</Col>
            <Col>
              <Input
                type="number"
                name="qty"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.qty}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Sub Total</Col>
            <Col>
              <Input
                type="text"
                value={
                  convertCurrency(inventoryActive?.price * formik.values.qty) ||
                  "0"
                }
                disabled
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            disabled={!inventoryActive?.product || loading}
          >
            Add
          </Button>{" "}
          <Button color="secondary" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default function ShoppingCartView() {
  const [displayPay, setDisplayPay] = useState(false)
  const [displayAddItem, setDisplayAddItem] = useState(false)

  const {
    isFetching,
    fetchShoppingCarts,
    shoppingCartRecords,
    getTotalQty,
    getTotalPrice,
  } = useShoppingCart()

  useEffect(() => {
    fetchShoppingCarts()
  }, [])

  return (
    <div>
      <h4>Shopping Cart</h4>

      <div style={{ textAlign: "right", paddingBottom: 16 }}>
        <Button color="primary">Scan QRCode</Button>&nbsp;
        <Button color="primary" onClick={() => setDisplayAddItem(true)}>
          Add Item
        </Button>
        &nbsp;
        <Button color="success" onClick={() => setDisplayPay(true)}>
          Pay
        </Button>
      </div>

      {isFetching ? (
        <Spinner />
      ) : (
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
            {shoppingCartRecords.map((item) => {
              return (
                <tr key={`k-inventory-${item.sn}`}>
                  <td>{item.sn}</td>
                  <td>{item.product}</td>
                  <td>{convertCurrency(item.price)}</td>
                  <td>{item.qty}</td>
                  <td>{convertCurrency(item.subTotal)}</td>
                  <td>
                    <a href="javascript:">Delete</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}>Total</th>
              <th>{convertCurrency(getTotalPrice())}</th>
              <th>{convertCurrency(getTotalQty())}</th>
              <th colSpan={2}>
                {convertCurrency(getTotalPrice() * getTotalQty())}
              </th>
            </tr>
          </tfoot>
        </Table>
      )}
      <AddItemModal
        display={displayAddItem}
        onSaved={() => fetchShoppingCarts()}
        onClose={() => setDisplayAddItem(false)}
      />

      <Modal isOpen={displayPay} toggle={() => setDisplayPay(false)}>
        <ModalHeader toggle={() => setDisplayPay(false)}>QRCode</ModalHeader>
        <ModalBody>
          <table style={{ margin: "0 auto" }}>
            <tr>
              <td style={{ width: 100, height: 50 }}>Total</td>
              <td>
                <Input type="text" style={{ width: 320 }} disabled />
              </td>
            </tr>
            <tr>
              <td style={{ width: 100, height: 50 }}>Pay</td>
              <td>
                <Input type="text" style={{ width: 320 }} />
              </td>
            </tr>
            <tr>
              <td style={{ width: 100, height: 50 }}>Change</td>
              <td>
                <Input type="text" style={{ width: 320 }} disabled />
              </td>
            </tr>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setDisplayPay(false)}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => setDisplayPay(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
