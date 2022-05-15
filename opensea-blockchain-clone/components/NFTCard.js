import React from "react";
import { useState, useEffect } from "react";
import { BiHeart } from 'react-icons/bi'
import Router from 'next/router'

const style = {
    wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
    imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
    nftImg: `w-full object-cover`,
    details: `p-3`,
    info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
    infoLeft: `flex-0.6 flex-wrap`,
    collectionName: `font-semibold text-sm text-[#8a939b]`,
    assetName: `font-bold text-lg mt-2`,
    infoRight: `flex-0.4 text-right`,
    priceTag: `font-semibold text-sm text-[#8a939b]`,
    priceValue: `flex items-center text-xl font-bold mt-2`,
    ethLogo: `h-5 mr-2`,
    likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
    likeIcon: `text-xl mr-2`,
  }

const NFTCard = ({ nftItem, title, listings }) => {
    const [isListed, setIsListed] = useState(false)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        for (const listing of listings) {
            if(listing.asset.id == nftItem.id){
                setIsListed(true)
                setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
                break
            }
        }

    }, [listings, nftItem])

    return (
        <div
            className={style.wrapper}
            onClick={() => {
                Router.push({
                    pathname: `/assets/${nftItem.id}`,
                    query: { isListed: isListed },
                })
            }}
        >
            <div className={style.imgContainer}>
                

            </div>


        </div>
    )
}

export default NFTCard