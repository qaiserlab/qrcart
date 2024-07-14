import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export default function useInventory() {
  const [isFetching, setIsFetching] = useState(false)

  const [inventoryRecords, setInventoryRecords] = useState<Array<TInventory>>([])

  const defaultValue = {
    sn: '',
    product: '',
    price: 0,
  }
  const [inventoryActive, setInventoryActive] = useState<TInventory>(defaultValue)

  const fetchInventories = () => {
    setIsFetching(true)

    axios.get('/data/inventory.json').then((response: AxiosResponse) => {
      const result = response.data
      setInventoryRecords(result.data)
    }).finally(() => setIsFetching(false))
  }

  const setInventoryActiveBySn = (snActive: string) => {
    const inventory = inventoryRecords.find(({ sn }) => sn === snActive)
    setInventoryActive(inventory || defaultValue)
  }

  const resetInventoryActive = () => setInventoryActive(defaultValue)

  return {
    isFetching,
    inventoryRecords,
    inventoryActive,
    fetchInventories,
    setInventoryActiveBySn,
    resetInventoryActive,
  }
}