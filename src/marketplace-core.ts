import {
  AuthorizedCallerAdded as AuthorizedCallerAddedEvent,
  AuthorizedCallerRemoved as AuthorizedCallerRemovedEvent,
  ListingCancelled as ListingCancelledEvent,
  ListingCreated as ListingCreatedEvent,
  ListingSold as ListingSoldEvent,
  NFTListingCreated as NFTListingCreatedEvent,
  Paused as PausedEvent,
  PriceUpdated as PriceUpdatedEvent,
  Unpaused as UnpausedEvent
} from "../generated/MarketplaceCore/MarketplaceCore"
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
} from "../generated/schema"

export function handleAuthorizedCallerAdded(
  event: AuthorizedCallerAddedEvent
): void {
  let entity = new AuthorizedCallerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorizedCallerRemoved(
  event: AuthorizedCallerRemovedEvent
): void {
  let entity = new AuthorizedCallerRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingCancelled(event: ListingCancelledEvent): void {
  let entity = new ListingCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.seller = event.params.seller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingCreated(event: ListingCreatedEvent): void {
  let entity = new ListingCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.seller = event.params.seller
  entity.assetType = event.params.assetType
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingSold(event: ListingSoldEvent): void {
  let entity = new ListingSold(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.buyer = event.params.buyer
  entity.seller = event.params.seller
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTListingCreated(event: NFTListingCreatedEvent): void {
  let entity = new NFTListingCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.seller = event.params.seller
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.quantity = event.params.quantity
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePriceUpdated(event: PriceUpdatedEvent): void {
  let entity = new PriceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.oldPrice = event.params.oldPrice
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
