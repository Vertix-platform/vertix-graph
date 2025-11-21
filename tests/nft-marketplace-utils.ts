import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NFTTransferred,
  PaymentDistributed
} from "../generated/NFTMarketplace/NFTMarketplace"

export function createNFTTransferredEvent(
  nftContract: Address,
  tokenId: BigInt,
  from: Address,
  to: Address,
  quantity: BigInt
): NFTTransferred {
  let nftTransferredEvent = changetype<NFTTransferred>(newMockEvent())

  nftTransferredEvent.parameters = new Array()

  nftTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftTransferredEvent.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  )
  nftTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  nftTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  nftTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )

  return nftTransferredEvent
}

export function createPaymentDistributedEvent(
  seller: Address,
  sellerNet: BigInt,
  platformFee: BigInt,
  royaltyReceiver: Address,
  royaltyAmount: BigInt
): PaymentDistributed {
  let paymentDistributedEvent = changetype<PaymentDistributed>(newMockEvent())

  paymentDistributedEvent.parameters = new Array()

  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "sellerNet",
      ethereum.Value.fromUnsignedBigInt(sellerNet)
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
      "royaltyReceiver",
      ethereum.Value.fromAddress(royaltyReceiver)
    )
  )
  paymentDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "royaltyAmount",
      ethereum.Value.fromUnsignedBigInt(royaltyAmount)
    )
  )

  return paymentDistributedEvent
}
