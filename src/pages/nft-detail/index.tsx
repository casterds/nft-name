import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../app/config'
import CollectionItem from '../../components/CollectionItem'
import axios from 'axios'
import { useCollections } from '../../app/reducers/collections/hooks'
import { useNames } from '../../app/reducers/names/hooks'
import moment from 'moment'
import { shortenAddress } from '../../utils/addressHelper'
import styled from 'styled-components'

const TransactionTable = styled.table`
    tr {
        :nth-child(2n) {
            background-color: aliceblue;
        }
    }
    thead {
        background-color: white;
    }
    td {
        padding: 5px;
        
    }
    min-width: 320px;
`

export default function NftDetail() {
    const { address, tokenId } = useParams()
    const [metadata, setMetadata] = useState<{ minter_address: string, owner_of: string }>()
    const [transfers, setTransfers] = useState<{ transaction_type: string, from_address: string, to_address: string, block_timestamp: string, transaction_hash: string }[]>()
    const [tokenName, setTokenName] = useState()
    const { collections: { data: collections } } = useCollections()
    const { names } = useNames()
    const openseaName = useMemo(() => {
        return collections.find(({ _id }) => _id === address)?.openseaMetadata.name
    }, [address, collections])
    useEffect(() => {
        if (address && tokenId) {
            axiosInstance.get(`/api/moralis/nft/transfers/${address}/${tokenId}`).then(({ data }) => setTransfers(data.result))
            axiosInstance.get(`/api/moralis/nft/metadata/${address}/${tokenId}`).then(({ data }) => setMetadata(data))
            axios.get(`http://api.nftr.name/registry/token_name/${address}/${tokenId}`).then(({ data }) => {
                if (!data.error) {
                    setTokenName(data.tokenName)
                }
            })
        }


    }, [address, tokenId])



    if (!address || !tokenId) {
        return null
    }

    const NameRecord = () => {
        if (tokenName) {
            const name = names.find(({ _id }) => _id === address)?.nfts?.[tokenId]
            if (name)
                return <tr>
                    <td>ID: {tokenId}</td>
                    <td>{name.name}</td>
                    <td>Naming</td>
                    <td>{moment(name.timestamp / 1000).calendar()}</td>
                </tr>
        }


    }
    return <div>
        <div className='flex  mx-10'>
            <div className='w-1/3 text-center'>
                <CollectionItem address={address} tokenId={Number(tokenId)} />
                <div className='text-lg mt-3 text-red-900 font-semibold'>
                    {tokenName ?? "UNNAMED"}
                </div>
                <div className='mt-2'>
                    {openseaName}
                </div>
                <div className='mt-1'>
                    ID {tokenId}
                </div>
            </div>
            <div className='w-2/3'>
                <div className='font-bold text-lg'>Events</div>
                <div>

                    {<div className='border-4 border-gray-400 w-fit rounded-md mt-5'>
                        <TransactionTable>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Type</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {NameRecord()}
                                {transfers?.map(({ block_timestamp, from_address, to_address, transaction_type, transaction_hash }) => {
                                    return <tr key={transaction_hash}>
                                        <td>{shortenAddress(from_address)}</td>
                                        <td>{shortenAddress(to_address)}</td>
                                        <td>{from_address === '0x0000000000000000000000000000000000000000' ? "MINT" : transaction_type}</td>
                                        <td>{moment(block_timestamp).calendar()}</td>
                                    </tr>
                                })}
                            </tbody>
                        </TransactionTable>

                    </div>}
                </div>
            </div>

        </div>


    </div >
}
