import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"

type ResponseData = {
  message: string
  data?: Object
}

const shoppingCartRecords:any = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    shoppingCartRecords.push(req.body)
    res.status(200).json({ message: "Save data success."})
  }
  
  if (req.method === "GET") {
    res.status(200).json({ message: "Read data success.", data: shoppingCartRecords})
  }

  res.status(404).json({ message: "Endpoint not found." })
}
