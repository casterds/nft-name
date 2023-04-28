/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface NFTData {
    imageUrl?: string;
    openseaRefreshed?: boolean;
    originalImageUrl?: string;
    revealed?: boolean
    tokenId: number
    tokenMetadata?: string;
    _id: number

}

export default function NFTRContract() {
    const router = useRouter()
    const { id: address } = router.query

    const [nfts, setNfts] = useState<NFTData[]>();
    useEffect(() => {
        // fetch collection nfts
        if (address) {
            axios.get(`/api/get-nfts/${address}`).then(({ data: { data } }) => {
                setNfts(data)
            })
        }
    }, [address])



    if (!nfts) return <div>Loading...</div>

    return <div>
        <h2>Detailed NFTR Contract {address}</h2>
        <div className="flex flex-wrap gap-3">
            {nfts.map(({ _id, tokenId, imageUrl }) => <Link key={tokenId} href={`/browse/${address}/${tokenId}`}>
                <div key={tokenId}>
                    <img src={imageUrl} alt={""} width={100} />
                    <div className="text-center">#{tokenId}</div>
                </div>
            </Link>)
            }
        </div>


    </div>
}