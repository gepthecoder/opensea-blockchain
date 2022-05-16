import Header from "../../components/Header"
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

import { useNFTCollection } from "@thirdweb-dev/react";
import { useMarketplace } from '@thirdweb-dev/react'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {

    const [ selectedNft, setSelectedNft ] = useState()
    const [ listings, setListings] = useState([])

    // router allows pulling the data from url params
    const router = useRouter()

    console.log("router : ", router)

    // get an instance of your own collection contract
    const nftCollection = useNFTCollection("0xfBFb463C184b93C2d8659fe0311599001217FE68");
    useEffect(() => {
        if (nftCollection) {
            // call functions on your contract
            nftCollection
                .getAll()
                .then((nfts) => {
                    // Set selected nft
                    const selectedNftItem = nfts.find((nft) => nft.metadata.id.toString() == router.query.nftId)

                    setSelectedNft(selectedNftItem)
                })
                .catch((error) => {
                    console.error("failed to fetch nfts", error);
                });
        }
    }, [nftCollection]);

    // Initialize marketplace contract by passing in the contract address
    const marketplaceAddress = "0x5DC7d152281e7F08585898CdB088E1144a938cA3";
    const marketPlaceModule = useMarketplace(marketplaceAddress);

    // get all NFT listings in the collection
    useEffect(() => {
        if(!marketPlaceModule) return

        ;(async () => {
            const listings = await marketPlaceModule.getAll()
            setListings(listings)
        })()

    }, [marketPlaceModule])


    return (
        <div>
            <Header />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImgContainer}>
                            <NFTImage selectedNft={selectedNft} />
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails selectedNft={selectedNft} />
                            <Purchase
                                isListed={router.query.isListed}
                                selectedNft={selectedNft}
                                listings={listings}
                                marketPlaceModule={marketPlaceModule}
                            />
                        </div>
                    </div>
                    <ItemActivity />
                </div>
            </div>
        </div>
    )
}


export default Nft