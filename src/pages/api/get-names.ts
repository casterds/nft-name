import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {data} =await axios.post("https://nftr-api-private.herokuapp.com/fetch-names", {
        "skip": 0,
        "take": 1000,
        "chainId": 1
    }, {
      headers: {
        "Origin": "https://www.nftr.name"
      }
    })
  res.status(200).json(data)
}

export const config = {
  api: {
    responseLimit: false,
  },
}