import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FeesReceived,
  FeesWithdrawn,
  PaymentDistributed,
  PlatformFeeUpdated,
  FeeCollectorUpdated,
  Paused,
  Unpaused
} from "../generated/FeeDistributor/FeeDistributor"

export function createFeesReceivedEvent(
  from: Address,
  amount: BigInt
): FeesReceived {
  let feesReceivedEvent = changetype<FeesReceived>(newMockEvent())

  feesReceivedEvent.parameters = new Array()

  feesReceivedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  feesReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feesReceivedEvent
}

export function createFeesWithdrawnEvent(
  collector: Address,
  amount: BigInt
): FeesWithdrawn {
  let feesWithdrawnEvent = changetype<FeesWithdrawn>(newMockEvent())

  feesWithdrawnEvent.parameters = new Array()

  feesWithdrawnEvent.parameters.push(
    new ethereum.EventParam("collector", ethereum.Value.fromAddress(collector))
  )
  feesWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feesWithdrawnEvent
}

export function createPaymentDistributedEvent(
  seller: Address,
  buyer: Address,
  totalAmount: BigInt,
  platformFee: BigInt,
  royaltyFee: BigInt,
  sellerNet: BigInt
): PaymentDistributed {
  let paymentDistributedEvent = changetype<PaymentDistributed>(newMockEvent())

  paymentDistributedEvent.parameters = new Array()

  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmount",
      ethereum.Value.fromUnsignedBigInt(totalAmount)
    )
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFee",
      ethereum.Value.fromUnsignedBigInt(platformFee)
    )
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "royaltyFee",
      ethereum.Value.fromUnsignedBigInt(royaltyFee)
    )
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "sellerNet",
      ethereum.Value.fromUnsignedBigInt(sellerNet)
    )
  )

  return paymentDistributedEvent
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

export function createFeeCollectorUpdatedEvent(
  oldCollector: Address,
  newCollector: Address
): FeeCollectorUpdated {
  let feeCollectorUpdatedEvent = changetype<FeeCollectorUpdated>(newMockEvent())

  feeCollectorUpdatedEvent.parameters = new Array()

  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldCollector",
      ethereum.Value.fromAddress(oldCollector)
    )
  )
  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newCollector",
      ethereum.Value.fromAddress(newCollector)
    )
  )

  return feeCollectorUpdatedEvent
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
