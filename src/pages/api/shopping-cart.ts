import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  message: string
  data?: Object
}

const shoppingCartRecords: any = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const snActive = req.body.sn
  const qtyActive = parseInt(req.body.qty)

  if (req.method === "POST") {
    const shoppingCartRecord = shoppingCartRecords.find(({ sn }: { sn: string }) => {
      return sn === snActive
    })

    if (shoppingCartRecord) {
      shoppingCartRecord.qty = parseInt(shoppingCartRecord.qty) + qtyActive
    }
    else {
      shoppingCartRecords.push(req.body)
    }

    res.status(200).json({ message: "Save data success." })
  }

  if (req.method === "GET") {
    res.status(200).json({ message: "Read data success.", data: shoppingCartRecords })
  }

  res.status(404).json({ message: "Endpoint not found." })
}
