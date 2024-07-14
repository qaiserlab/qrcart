import axios, { AxiosResponse } from "axios"
import { useState } from "react"

export default function useShoppingCart() {
  const [isFetching, setIsFetching] = useState(false)

  const [shoppingCartRecords, setShoppingCartRecords] = useState<
    Array<TShoppingCart>
  >([])

  const defaultValue = {
    sn: "",
    product: "",
    price: 0,
    qty: 0,
    subTotal: 0,
  }
  const [shoppingCartActive, setShoppingCartActive] =
    useState<TShoppingCart>(defaultValue)

  const fetchShoppingCarts = () => {
    setIsFetching(true)

    axios
      .get("/data/shopping-cart.json")
      .then((response: AxiosResponse) => {
        const result = response.data
        setShoppingCartRecords(result.data)
      })
      .finally(() => setIsFetching(false))
  }

  const setShoppingCartActiveBySn = (snActive: string) => {
    const shoppingCart = shoppingCartRecords.find(({ sn }) => sn === snActive)
    setShoppingCartActive(shoppingCart || defaultValue)
  }

  const resetShoppingCartActive = () => setShoppingCartActive(defaultValue)

  const getTotalQty = () => {
    let totalQty = 0

    for (const item of shoppingCartRecords) {
      totalQty += item.qty
    }

    return totalQty
  }

  const getTotalPrice = () => {
    let totalPrice = 0

    for (const item of shoppingCartRecords) {
      totalPrice += item.price
    }

    return totalPrice
  }

  return {
    isFetching,
    shoppingCartRecords,
    shoppingCartActive,
    fetchShoppingCarts,
    setShoppingCartActiveBySn,
    resetShoppingCartActive,
    getTotalQty,
    getTotalPrice,
  }
}
