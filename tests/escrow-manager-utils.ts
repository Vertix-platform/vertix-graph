import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EscrowCreated,
  AssetDelivered,
  AssetReceiptConfirmed,
  EscrowReleased,
  EscrowCancelled,
  DisputeOpened,
  DisputeResolved,
  MarketplaceAuthorized,
  MarketplaceDeauthorized,
  PlatformFeeUpdated,
  Paused,
  Unpaused
} from "../generated/EscrowManager/EscrowManager"

export function createEscrowCreatedEvent(
  escrowId: BigInt,
  buyer: Address,
  seller: Address,
  amount: BigInt,
  assetType: i32,
  releaseTime: BigInt,
  metadataURI: string
): EscrowCreated {
  let escrowCreatedEvent = changetype<EscrowCreated>(newMockEvent())

  escrowCreatedEvent.parameters = new Array()

  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "assetType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(assetType))
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "releaseTime",
      ethereum.Value.fromUnsignedBigInt(releaseTime)
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("metadataURI", ethereum.Value.fromString(metadataURI))
  )

  return escrowCreatedEvent
}

export function createAssetDeliveredEvent(
  escrowId: BigInt,
  seller: Address,
  deliveryTimestamp: BigInt
): AssetDelivered {
  let assetDeliveredEvent = changetype<AssetDelivered>(newMockEvent())

  assetDeliveredEvent.parameters = new Array()

  assetDeliveredEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  assetDeliveredEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  assetDeliveredEvent.parameters.push(
    new ethereum.EventParam(
      "deliveryTimestamp",
      ethereum.Value.fromUnsignedBigInt(deliveryTimestamp)
    )
  )

  return assetDeliveredEvent
}

export function createAssetReceiptConfirmedEvent(
  escrowId: BigInt,
  buyer: Address,
  confirmationTimestamp: BigInt
): AssetReceiptConfirmed {
  let assetReceiptConfirmedEvent = changetype<AssetReceiptConfirmed>(
    newMockEvent()
  )

  assetReceiptConfirmedEvent.parameters = new Array()

  assetReceiptConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  assetReceiptConfirmedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  assetReceiptConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "confirmationTimestamp",
      ethereum.Value.fromUnsignedBigInt(confirmationTimestamp)
    )
  )

  return assetReceiptConfirmedEvent
}

export function createEscrowReleasedEvent(
  escrowId: BigInt,
  seller: Address,
  amount: BigInt,
  platformFee: BigInt,
  sellerNet: BigInt
): EscrowReleased {
  let escrowReleasedEvent = changetype<EscrowReleased>(newMockEvent())

  escrowReleasedEvent.parameters = new Array()

  escrowReleasedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowReleasedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  escrowReleasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  escrowReleasedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFee",
      ethereum.Value.fromUnsignedBigInt(platformFee)
    )
  )
  escrowReleasedEvent.parameters.push(
    new ethereum.EventParam(
      "sellerNet",
      ethereum.Value.fromUnsignedBigInt(sellerNet)
    )
  )

  return escrowReleasedEvent
}

export function createEscrowCancelledEvent(
  escrowId: BigInt,
  buyer: Address,
  refundAmount: BigInt,
  sellerCompensation: BigInt
): EscrowCancelled {
  let escrowCancelledEvent = changetype<EscrowCancelled>(newMockEvent())

  escrowCancelledEvent.parameters = new Array()

  escrowCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCancelledEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  escrowCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "refundAmount",
      ethereum.Value.fromUnsignedBigInt(refundAmount)
    )
  )
  escrowCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "sellerCompensation",
      ethereum.Value.fromUnsignedBigInt(sellerCompensation)
    )
  )

  return escrowCancelledEvent
}

export function createDisputeOpenedEvent(
  escrowId: BigInt,
  disputedBy: Address,
  reason: string,
  timestamp: BigInt
): DisputeOpened {
  let disputeOpenedEvent = changetype<DisputeOpened>(newMockEvent())

  disputeOpenedEvent.parameters = new Array()

  disputeOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  disputeOpenedEvent.parameters.push(
    new ethereum.EventParam("disputedBy", ethereum.Value.fromAddress(disputedBy))
  )
  disputeOpenedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )
  disputeOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return disputeOpenedEvent
}

export function createDisputeResolvedEvent(
  escrowId: BigInt,
  winner: Address,
  amount: BigInt,
  resolver: Address
): DisputeResolved {
  let disputeResolvedEvent = changetype<DisputeResolved>(newMockEvent())

  disputeResolvedEvent.parameters = new Array()

  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )

  return disputeResolvedEvent
}

export function createMarketplaceAuthorizedEvent(
  marketplace: Address,
  authorizedBy: Address
): MarketplaceAuthorized {
  let marketplaceAuthorizedEvent = changetype<MarketplaceAuthorized>(
    newMockEvent()
  )

  marketplaceAuthorizedEvent.parameters = new Array()

  marketplaceAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "marketplace",
      ethereum.Value.fromAddress(marketplace)
    )
  )
  marketplaceAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "authorizedBy",
      ethereum.Value.fromAddress(authorizedBy)
    )
  )

  return marketplaceAuthorizedEvent
}

export function createMarketplaceDeauthorizedEvent(
  marketplace: Address,
  deauthorizedBy: Address
): MarketplaceDeauthorized {
  let marketplaceDeauthorizedEvent = changetype<MarketplaceDeauthorized>(
    newMockEvent()
  )

  marketplaceDeauthorizedEvent.parameters = new Array()

  marketplaceDeauthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "marketplace",
      ethereum.Value.fromAddress(marketplace)
    )
  )
  marketplaceDeauthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "deauthorizedBy",
      ethereum.Value.fromAddress(deauthorizedBy)
    )
  )

  return marketplaceDeauthorizedEvent
}

export function createPlatformFeeUpdatedEvent(
  oldFeeBps: BigInt,
  newFeeBps: BigInt,
  updatedBy: Address
): PlatformFeeUpdated {
  let platformFeeUpdatedEvent = changetype<PlatformFeeUpdated>(newMockEvent())

  platformFeeUpdatedEvent.parameters = new Array()

  platformFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldFeeBps",
      ethereum.Value.fromUnsignedBigInt(oldFeeBps)
    )
  )
  platformFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeBps",
      ethereum.Value.fromUnsignedBigInt(newFeeBps)
    )
  )
  platformFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("updatedBy", ethereum.Value.fromAddress(updatedBy))
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
