import {
  OfferMade as OfferMadeEvent,
  OfferAccepted as OfferAcceptedEvent,
  OfferCancelled as OfferCancelledEvent,
  OfferRejected as OfferRejectedEvent,
  OfferExpired as OfferExpiredEvent,
  OfferInvalidated as OfferInvalidatedEvent,
  OfferRefunded as OfferRefundedEvent,
  PlatformFeeUpdated as PlatformFeeUpdatedEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/OfferManager/OfferManager";
import {
  OfferMade,
  OfferAccepted,
  OfferCancelled,
  OfferRejected,
  OfferExpired,
  OfferInvalidated,
  OfferRefunded,
  PlatformFeeUpdatedOffer,
  PausedOfferManager,
  UnpausedOfferManager,
} from "../generated/schema";

export function handleOfferMade(event: OfferMadeEvent): void {
  let entity = new OfferMade(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.listingId = event.params.listingId;
  entity.buyer = event.params.buyer;
  entity.seller = event.params.seller;
  entity.amount = event.params.amount;
  entity.expiresAt = event.params.expiresAt;
  entity.assetType = event.params.assetType;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOfferAccepted(event: OfferAcceptedEvent): void {
  let entity = new OfferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.listingId = event.params.listingId;
  entity.buyer = event.params.buyer;
  entity.seller = event.params.seller;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOfferCancelled(event: OfferCancelledEvent): void {
  let entity = new OfferCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.listingId = event.params.listingId;
  entity.buyer = event.params.buyer;
  entity.refundAmount = event.params.refundAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOfferRejected(event: OfferRejectedEvent): void {
  let entity = new OfferRejected(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.listingId = event.params.listingId;
  entity.buyer = event.params.buyer;
  entity.seller = event.params.seller;
  entity.reason = event.params.reason;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOfferExpired(event: OfferExpiredEvent): void {
  let entity = new OfferExpired(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.listingId = event.params.listingId;
  entity.buyer = event.params.buyer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOfferInvalidated(event: OfferInvalidatedEvent): void {
  let entity = new OfferInvalidated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.listingId = event.params.listingId;
  entity.buyer = event.params.buyer;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOfferRefunded(event: OfferRefundedEvent): void {
  let entity = new OfferRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.offerId = event.params.offerId;
  entity.buyer = event.params.buyer;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePlatformFeeUpdated(event: PlatformFeeUpdatedEvent): void {
  let entity = new PlatformFeeUpdatedOffer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.oldFee = event.params.oldFee;
  entity.newFee = event.params.newFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedOfferManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedOfferManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
