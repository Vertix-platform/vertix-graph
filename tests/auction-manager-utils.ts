import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import {
  AuctionCreated,
  BidPlaced,
  AuctionEnded,
  AuctionCancelled,
  AuctionFailedReserveNotMet,
  BidRefunded,
  BidRefundQueued,
  NFTEscrowed,
  Withdrawn,
  Paused,
  Unpaused,
} from "../generated/AuctionManager/AuctionManager";

export function createAuctionCreatedEvent(
  auctionId: BigInt,
  seller: Address,
  assetType: i32,
  nftContract: Address,
  tokenId: BigInt,
  reservePrice: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  bidIncrementBps: BigInt,
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent());

  auctionCreatedEvent.parameters = new Array();

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller)),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "assetType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(assetType)),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reservePrice",
      ethereum.Value.fromUnsignedBigInt(reservePrice),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime),
    ),
  );
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "bidIncrementBps",
      ethereum.Value.fromUnsignedBigInt(bidIncrementBps),
    ),
  );

  return auctionCreatedEvent;
}

export function createBidPlacedEvent(
  auctionId: BigInt,
  bidder: Address,
  bidAmount: BigInt,
  newEndTime: BigInt,
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent());

  bidPlacedEvent.parameters = new Array();

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder)),
  );
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidAmount",
      ethereum.Value.fromUnsignedBigInt(bidAmount),
    ),
  );
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "newEndTime",
      ethereum.Value.fromUnsignedBigInt(newEndTime),
    ),
  );

  return bidPlacedEvent;
}

export function createAuctionEndedEvent(
  auctionId: BigInt,
  winner: Address,
  seller: Address,
  finalBid: BigInt,
  platformFee: BigInt,
  royaltyFee: BigInt,
  sellerNet: BigInt,
  royaltyReceiver: Address,
): AuctionEnded {
  let auctionEndedEvent = changetype<AuctionEnded>(newMockEvent());

  auctionEndedEvent.parameters = new Array();

  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner)),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller)),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "finalBid",
      ethereum.Value.fromUnsignedBigInt(finalBid),
    ),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFee",
      ethereum.Value.fromUnsignedBigInt(platformFee),
    ),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "royaltyFee",
      ethereum.Value.fromUnsignedBigInt(royaltyFee),
    ),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "sellerNet",
      ethereum.Value.fromUnsignedBigInt(sellerNet),
    ),
  );
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "royaltyReceiver",
      ethereum.Value.fromAddress(royaltyReceiver),
    ),
  );

  return auctionEndedEvent;
}

export function createAuctionCancelledEvent(
  auctionId: BigInt,
  seller: Address,
  reason: string,
): AuctionCancelled {
  let auctionCancelledEvent = changetype<AuctionCancelled>(newMockEvent());

  auctionCancelledEvent.parameters = new Array();

  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller)),
  );
  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason)),
  );

  return auctionCancelledEvent;
}

export function createAuctionFailedReserveNotMetEvent(
  auctionId: BigInt,
  highestBid: BigInt,
  reservePrice: BigInt,
): AuctionFailedReserveNotMet {
  let auctionFailedReserveNotMetEvent =
    changetype<AuctionFailedReserveNotMet>(newMockEvent());

  auctionFailedReserveNotMetEvent.parameters = new Array();

  auctionFailedReserveNotMetEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  auctionFailedReserveNotMetEvent.parameters.push(
    new ethereum.EventParam(
      "highestBid",
      ethereum.Value.fromUnsignedBigInt(highestBid),
    ),
  );
  auctionFailedReserveNotMetEvent.parameters.push(
    new ethereum.EventParam(
      "reservePrice",
      ethereum.Value.fromUnsignedBigInt(reservePrice),
    ),
  );

  return auctionFailedReserveNotMetEvent;
}

export function createBidRefundedEvent(
  auctionId: BigInt,
  bidder: Address,
  amount: BigInt,
): BidRefunded {
  let bidRefundedEvent = changetype<BidRefunded>(newMockEvent());

  bidRefundedEvent.parameters = new Array();

  bidRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  bidRefundedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder)),
  );
  bidRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(amount),
    ),
  );

  return bidRefundedEvent;
}

export function createBidRefundQueuedEvent(
  auctionId: BigInt,
  bidder: Address,
  amount: BigInt,
): BidRefundQueued {
  let bidRefundQueuedEvent = changetype<BidRefundQueued>(newMockEvent());

  bidRefundQueuedEvent.parameters = new Array();

  bidRefundQueuedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  bidRefundQueuedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder)),
  );
  bidRefundQueuedEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(amount),
    ),
  );

  return bidRefundQueuedEvent;
}

export function createNFTEscrowedEvent(
  auctionId: BigInt,
  nftContract: Address,
  tokenId: BigInt,
  quantity: BigInt,
  standard: i32,
): NFTEscrowed {
  let nftEscrowedEvent = changetype<NFTEscrowed>(newMockEvent());

  nftEscrowedEvent.parameters = new Array();

  nftEscrowedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionId",
      ethereum.Value.fromUnsignedBigInt(auctionId),
    ),
  );
  nftEscrowedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract),
    ),
  );
  nftEscrowedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );
  nftEscrowedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity),
    ),
  );
  nftEscrowedEvent.parameters.push(
    new ethereum.EventParam(
      "standard",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(standard)),
    ),
  );

  return nftEscrowedEvent;
}

export function createWithdrawnEvent(user: Address, amount: BigInt): Withdrawn {
  let withdrawnEvent = changetype<Withdrawn>(newMockEvent());

  withdrawnEvent.parameters = new Array();

  withdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user)),
  );
  withdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(amount),
    ),
  );

  return withdrawnEvent;
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent());

  pausedEvent.parameters = new Array();

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account)),
  );

  return pausedEvent;
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent());

  unpausedEvent.parameters = new Array();

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account)),
  );

  return unpausedEvent;
}
