import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {data} =await axios.post("https://nftr-api-private.herokuapp.com/fetch-nft-names", {
        address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        chainId: 1,
        tokenId: "9062",
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