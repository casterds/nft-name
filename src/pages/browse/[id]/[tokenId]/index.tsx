import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TokenDetail() {
    const router = useRouter();
    const { id: address, tokenId } = router.query;

    const [imageURI, setImageURI] = useState<string>();
    const [names, setNames] = useState<any[]>([]);

    useEffect(() => {
        if (address && tokenId) {
            axios
                .get(
                    `https://api.looksrare.org/api/v1/tokens?collection=${address}&tokenId=${tokenId}`
                )
                .then(({ data: { data, success } }) => {
                    if (success) {
                        setImageURI(data.imageURI);
                    }
                });
            axios.get('/api/get-nft-names', { params: { address, tokenId } }).then(({ data: { data, success } }) => {
                if (success) {
                    setNames(data)
                }
            })
        }

    }, [address, tokenId]);
    return (
        <div className="container mx-auto mt-10">
            <div className="flex items-center gap-10">
                {imageURI && <Image src={imageURI} height={200} width={200} alt="img" />}
                <div>
                    <h2>Naming History</h2>
                    {names.map(({ name, timestamp, _id }) => {
                        return <div key={_id}>
                            {name} {moment.unix(timestamp / 1000).calendar()}
                        </div>
                    })}
                </div>
            </div>
        </div>

    );
}
