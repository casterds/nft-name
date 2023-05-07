import axios from "axios"
import { useEffect, useState } from "react"
import { STATUS } from "../app/reducers/constants"

export default function CollectionItem({ address, tokenId, imageUrl }: { address: string, tokenId: number, imageUrl?: string }) {
    const [nftImage, setNftImage] = useState(imageUrl)
    const [state, setState] = useState<STATUS>(STATUS.UNFETCHED)
    useEffect(() => {
        if (!imageUrl && tokenId !== undefined && address) {
            if (state === STATUS.UNFETCHED)
                axios.get('https://api.looksrare.org/api/v1/tokens', {
                    params: {
                        collection: address,
                        tokenId: tokenId
                    }
                }).then(({ data: { data, success } }) => {
                    if (success) {
                        setNftImage(data.imageURI)
                    }
                })
        }
    }, [address, imageUrl, state, tokenId])

    return <div>
        <img src={nftImage} alt={"img"} loading="lazy" className="w-96 h-96 mx-auto"/>
    </div>
}
