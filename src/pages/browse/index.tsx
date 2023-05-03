/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NamedNFT {
    contractAddress: string,
    imageUrl: string,
    name: string,
    timestamp: number,
    tokenId: string,
    _id: string
}

export default function Browse() {
    const [namedNfts, setNamedNfts] = useState<NamedNFT[]>();
    useEffect(() => {
        console.log("Use effect not hooked")
        // get nft contract addresses and data to store in state.
        // we can store it in redux later.
        axios.get("/api/get-only-named").then(({ data: { data, success } }) => {
            if (success) {
                setNamedNfts(data.nfts);
            }
        })
    }, [])

    if (!namedNfts) {
        return <div>Loading...</div>
    }

    return <div className="container mx-auto mt-10">
        <div className="flex gap-5 flex-wrap">
            {namedNfts.map(({ tokenId, contractAddress, imageUrl, name }) =>
                <Link key={`${contractAddress}-${tokenId}`} href={`/browse/${contractAddress}/${tokenId}`}>
                    <div>
                        <Image alt={name} src={imageUrl} width={200} height={200} />
                        <div>{name}</div>
                    </div>
                </Link>
            )}
        </div>
    </div>;
}