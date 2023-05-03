import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {address, tokenId} = req.query
    const {data} =await axios.post("https://nftr-api-private.herokuapp.com/fetch-nft-names", {
        address,
        chainId: 1,
        tokenId,
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