import { useEffect, useMemo, useState } from "react";
import { Collection } from "../../app/reducers/collections";
import { useCollections } from "../../app/reducers/collections/hooks";
import { STATUS } from "../../app/reducers/constants";
import { axiosInstance } from "../../app/config";
import CollectionItem from "../../components/CollectionItem";
import { useNames } from "../../app/reducers/names/hooks";
import Pagination from "react-paginate"
import { Link } from "react-router-dom"

const itemsPerPage = 16;

export default function CollectionItems({ selectedCollection }: { selectedCollection: string }) {
    const { collections: { data: collections, state } } = useCollections()
    const [page, setPage] = useState(1)

    const { names } = useNames()

    const [nfts, setNfts] = useState<{ tokenId: number; _id: number, imageUrl?: string }[]>()

    const collection = useMemo(() => {
        if (state === STATUS.FETCHED) {
            return collections.find(({ _id }) => _id === selectedCollection)
        }
    }, [collections, selectedCollection, state])

    const pageCount = useMemo(() => {
        if (collection)
            return Math.ceil(collection.assets / itemsPerPage) - 1
        return 0

    }, [collection])

    useEffect(() => {
        axiosInstance.get("/api/nftr/fetch-nfts", {
            params: {
                address: selectedCollection,
                page: page
            }
        }).then(({ data: { data, success } }) => {
            if (success) {
                setNfts(data)
            }
        })
    }, [page, selectedCollection])

    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        setPage(1);
    }, [selectedCollection])



    if (!collection) {
        return <div>Loading...</div>
    }

    return <div>
        <div className="mx-auto w-fit mt-10">
            <Pagination breakLabel="..."
                pageCount={pageCount} onPageChange={handlePageClick} renderOnZeroPageCount={null}
                className="flex items-center"
                pageClassName="border-4 border-blue-500 rounded-full w-10 h-10 text-center mx-2 flex items-center justify-center"
                activeClassName="border-red-500" />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-10 justify-between mt-10 mx-10 min-h-screen">
            {nfts?.map(nft => {

                return <Link to={`/nft-detail/${selectedCollection}/${nft._id}`} key={`${selectedCollection}-${nft._id}`} className="text-center">
                    <CollectionItem address={selectedCollection} tokenId={nft.tokenId} imageUrl={nft.imageUrl} />
                    <div>{names.find(({ _id }) => _id === selectedCollection)?.nfts?.[nft.tokenId]?.name ?? "UNNAMED"}</div>
                    <div>{collection?.openseaMetadata.name}</div>
                    <div>ID {nft.tokenId}</div>
                </Link>
            })}
        </div>
        <div className="mx-auto w-fit mt-10 mb-10">
            <Pagination breakLabel="..."
                pageCount={pageCount} onPageChange={handlePageClick} renderOnZeroPageCount={null}
                className="flex items-center"
                pageClassName="border-4 border-blue-500 rounded-full w-10 h-10 text-center mx-2 flex items-center justify-center"
                activeClassName="border-red-500" />
        </div>
    </div>
}
