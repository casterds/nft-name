import { useState } from "react";
import { useCollections } from "../../app/reducers/collections/hooks";
import { StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import CollectionItems from "../../container/CollectionItems";
import { STATUS } from "../../app/reducers/constants";

export default function Home() {
    const [selectedCollection, setSelectedCollection] = useState(
        "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
    const [placeholder, setPlaceholder] = useState("Bored Ape Yacht Club");
    // const [collections, setCollections] = useState<Array<Collection>>();

    const { collections: { data: collections, state } } = useCollections()

    // useEffect(() => {
    //   axiosInstance.get('/api/nftr/fetch-contract-addresses').then(({ data: { data, success } }) => {
    //     if (success) {
    //       setCollections(data);
    //     }
    //   })
    // }, [])

    const loadOptions = async (inputValue: string) => {
        if (inputValue) {
            if (inputValue.length >= 3)
                return collections?.filter(c => c.name.toLowerCase().includes(inputValue.toLowerCase())).map((c) => ({ label: c.name, value: c._id, imageUrl: c.imageUrl })) ?? []
        }
        return []
    };

    const onChangeCollection = (newValue: any, actionMeda: any) => {
        if (newValue) {
            setSelectedCollection(newValue.value)
        }
    }

    const noOptionsMessage = ({ inputValue }: { inputValue: string }) => {
        if (inputValue) {
            if (inputValue.length < 3)
                return <div>At least 3 letters</div>
            return <div>Not found</div>
        }
        return <div>Type Name or Past Contract address</div>
    }

    const SelectStyles: StylesConfig<{ label: string, value: string, imageUrl: string }> = {

        singleValue(base, { data }) {
            return {
                ...base,
                display: 'flex',
                alignItems: 'center',
                ':before': {
                    content: '""',
                    backgroundImage: 'url(' + data.imageUrl + ')',
                    backgroundSize: '100% 100%',
                    width: 40,
                    height: 40,
                    marginRight: 8,
                    borderRadius: '50%',
                    display: 'block'
                }
            }
        },
        input(base, props) {
            return {
                ...base,
                marginLeft: 48,
            }
        },
        option(base, { data }) {
            return {
                ...base,
                display: 'flex',
                alignItems: 'center',
                ':before': {
                    content: '""',
                    backgroundImage: 'url(' + data.imageUrl + ')',
                    backgroundSize: '100% 100%',
                    width: 40,
                    height: 40,
                    marginRight: 8,
                    borderRadius: '50%',
                    display: 'block',
                }
            }
        },
    }

    if (state !== STATUS.FETCHED ) return <div>Loadig...</div>;
    return (
        <div>
            <div className="text-green-500 font-medium text-lg text-center">
                Let&apos;s Browse
            </div>
            <div className='mt-10 mx-auto max-w-md text-center'>
                <div>{selectedCollection}</div>
                <div className='mt-5'>
                    <AsyncSelect
                        placeholder={placeholder}
                        loadOptions={loadOptions}
                        defaultOptions
                        onChange={onChangeCollection}
                        styles={SelectStyles}
                        noOptionsMessage={noOptionsMessage}
                    />
                </div>
            </div>

            <CollectionItems selectedCollection={selectedCollection} />
        </div>
    );
}
