import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AuthorizedCallerAdded,
  AuthorizedCallerRemoved,
  ListingCancelled,
  ListingCreated,
  ListingSold,
  NFTListingCreated,
  Paused,
  PriceUpdated,
  Unpaused
} from "../generated/MarketplaceCore/MarketplaceCore"

export function createAuthorizedCallerAddedEvent(
  caller: Address
): AuthorizedCallerAdded {
  let authorizedCallerAddedEvent =
    changetype<AuthorizedCallerAdded>(newMockEvent())

  authorizedCallerAddedEvent.parameters = new Array()

  authorizedCallerAddedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )

  return authorizedCallerAddedEvent
}

export function createAuthorizedCallerRemovedEvent(
  caller: Address
): AuthorizedCallerRemoved {
  let authorizedCallerRemovedEvent =
    changetype<AuthorizedCallerRemoved>(newMockEvent())

  authorizedCallerRemovedEvent.parameters = new Array()

  authorizedCallerRemovedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )

  return authorizedCallerRemovedEvent
}

export function createListingCancelledEvent(
  listingId: BigInt,
  seller: Address
): ListingCancelled {
  let listingCancelledEvent = changetype<ListingCancelled>(newMockEvent())

  listingCancelledEvent.parameters = new Array()

  listingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  listingCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingCancelledEvent
}

export function createListingCreatedEvent(
  listingId: BigInt,
  seller: Address,
  assetType: i32,
  price: BigInt
): ListingCreated {
  let listingCreatedEvent = changetype<ListingCreated>(newMockEvent())

  listingCreatedEvent.parameters = new Array()

  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "assetType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(assetType))
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return listingCreatedEvent
}

export function createListingSoldEvent(
  listingId: BigInt,
  buyer: Address,
  seller: Address,
  price: BigInt
): ListingSold {
  let listingSoldEvent = changetype<ListingSold>(newMockEvent())

  listingSoldEvent.parameters = new Array()

  listingSoldEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  listingSoldEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  listingSoldEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  listingSoldEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return listingSoldEvent
}

export function createNFTListingCreatedEvent(
  listingId: BigInt,
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  quantity: BigInt,
  price: BigInt
): NFTListingCreated {
  let nftListingCreatedEvent = changetype<NFTListingCreated>(newMockEvent())

  nftListingCreatedEvent.parameters = new Array()

  nftListingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  nftListingCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftListingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftListingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftListingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  nftListingCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftListingCreatedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPriceUpdatedEvent(
  listingId: BigInt,
  oldPrice: BigInt,
  newPrice: BigInt
): PriceUpdated {
  let priceUpdatedEvent = changetype<PriceUpdated>(newMockEvent())

  priceUpdatedEvent.parameters = new Array()

  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPrice",
      ethereum.Value.fromUnsignedBigInt(oldPrice)
    )
  )
  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return priceUpdatedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
