/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NFTRContract {
    assets: number,
    imageUrl: string,
    name: string,
    _id: string
}

export default function Browse() {
    const [contracts, setContracts] = useState<NFTRContract[]>();
    useEffect(() => {
        console.log("Use effect not hooked")
        // get nft contract addresses and data to store in state.
        // we can store it in redux later.
        axios.get("http://localhost:3000/api/get-contract-addresses").then(({ data: { data } }) => {
            console.log("data: ", data)
            setContracts(data);
        })
    }, [])

    if (!contracts) {
        return <div>Loading...</div>
    }

    return <div className="flex gap-2 flex-wrap">
        {contracts.map(({ _id, imageUrl, name }) =>
            <Link key={_id} href={`/browse/${_id}`}>
                <div>
                    {/* <Image alt={name} src={imageUrl} width={30} height={30}/> */}
                    <img src={imageUrl} width={30} height={30} alt={name} />
                </div>
            </Link>
        )}
    </div>;
}