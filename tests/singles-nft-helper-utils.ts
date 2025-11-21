import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  SingleNFTMintedAndListed
} from "../generated/SinglesNFTHelper/SinglesNFTHelper"

export function createSingleNFTMintedAndListedEvent(
  creator: Address,
  tokenId: BigInt,
  listingId: BigInt,
  price: BigInt,
  nftContract: Address
): SingleNFTMintedAndListed {
  let singleNFTMintedAndListedEvent = changetype<SingleNFTMintedAndListed>(
    newMockEvent()
  )

  singleNFTMintedAndListedEvent.parameters = new Array()

  singleNFTMintedAndListedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  singleNFTMintedAndListedEvent.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  )
  singleNFTMintedAndListedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  singleNFTMintedAndListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  singleNFTMintedAndListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )

  return singleNFTMintedAndListedEvent
}
