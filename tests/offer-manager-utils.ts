import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OfferMade,
  OfferAccepted,
  OfferCancelled,
  OfferRejected,
  OfferExpired,
  OfferInvalidated,
  OfferRefunded,
  PlatformFeeUpdated,
  Paused,
  Unpaused
} from "../generated/OfferManager/OfferManager"

export function createOfferMadeEvent(
  offerId: BigInt,
  listingId: BigInt,
  buyer: Address,
  seller: Address,
  amount: BigInt,
  expiresAt: BigInt,
  assetType: i32
): OfferMade {
  let offerMadeEvent = changetype<OfferMade>(newMockEvent())

  offerMadeEvent.parameters = new Array()

  offerMadeEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )
  offerMadeEvent.parameters.push(
    new ethereum.EventParam(
      "assetType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(assetType))
    )
  )

  return offerMadeEvent
}

export function createOfferAcceptedEvent(
  offerId: BigInt,
  listingId: BigInt,
  buyer: Address,
  seller: Address,
  amount: BigInt
): OfferAccepted {
  let offerAcceptedEvent = changetype<OfferAccepted>(newMockEvent())

  offerAcceptedEvent.parameters = new Array()

  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return offerAcceptedEvent
}

export function createOfferCancelledEvent(
  offerId: BigInt,
  listingId: BigInt,
  buyer: Address,
  refundAmount: BigInt
): OfferCancelled {
  let offerCancelledEvent = changetype<OfferCancelled>(newMockEvent())

  offerCancelledEvent.parameters = new Array()

  offerCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  offerCancelledEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  offerCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "refundAmount",
      ethereum.Value.fromUnsignedBigInt(refundAmount)
    )
  )

  return offerCancelledEvent
}

export function createOfferRejectedEvent(
  offerId: BigInt,
  listingId: BigInt,
  buyer: Address,
  seller: Address,
  reason: string
): OfferRejected {
  let offerRejectedEvent = changetype<OfferRejected>(newMockEvent())

  offerRejectedEvent.parameters = new Array()

  offerRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  offerRejectedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  offerRejectedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  offerRejectedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return offerRejectedEvent
}

export function createOfferExpiredEvent(
  offerId: BigInt,
  listingId: BigInt,
  buyer: Address
): OfferExpired {
  let offerExpiredEvent = changetype<OfferExpired>(newMockEvent())

  offerExpiredEvent.parameters = new Array()

  offerExpiredEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerExpiredEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  offerExpiredEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return offerExpiredEvent
}

export function createOfferInvalidatedEvent(
  offerId: BigInt,
  listingId: BigInt,
  buyer: Address,
  amount: BigInt
): OfferInvalidated {
  let offerInvalidatedEvent = changetype<OfferInvalidated>(newMockEvent())

  offerInvalidatedEvent.parameters = new Array()

  offerInvalidatedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerInvalidatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  offerInvalidatedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  offerInvalidatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return offerInvalidatedEvent
}

export function createOfferRefundedEvent(
  offerId: BigInt,
  buyer: Address,
  amount: BigInt
): OfferRefunded {
  let offerRefundedEvent = changetype<OfferRefunded>(newMockEvent())

  offerRefundedEvent.parameters = new Array()

  offerRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerRefundedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  offerRefundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return offerRefundedEvent
}

export function createPlatformFeeUpdatedEvent(
  oldFee: BigInt,
  newFee: BigInt
): PlatformFeeUpdated {
  let platformFeeUpdatedEvent = changetype<PlatformFeeUpdated>(newMockEvent())

  platformFeeUpdatedEvent.parameters = new Array()

  platformFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldFee", ethereum.Value.fromUnsignedBigInt(oldFee))
  )
  platformFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return platformFeeUpdatedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
