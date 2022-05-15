import Header from "../../components/Header"
import { useState, useEffect, useMemo } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from "next/router";
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
    const { provider } = useWeb3()
    const [ selectedNft, setSelectedNft ]= useState()
    const [ listings, setListings] = useState([])
    // router allows pulling the data from url params
    const router = useRouter()

    const nftModule = useMemo(() => {
        if(!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/PZPQzb0quQ0Xvv0pu73fIESfS91OLoPr'
        )

        return sdk.getNFTModule('0xfBFb463C184b93C2d8659fe0311599001217FE68')

    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if(!nftModule) return

        ;(async () => {
            const nfts = await nftModule.getAll()

            const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

            setSelectedNft(selectedNftItem)
        })()

    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if(!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/PZPQzb0quQ0Xvv0pu73fIESfS91OLoPr'
        )

        return sdk.getMarketModule('0x5DC7d152281e7F08585898CdB088E1144a938cA3')

    }, [provider])

    useEffect(() => {
        if(!marketPlaceModule) return

        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
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

// selectedNft={selectedNft}
export default Nft