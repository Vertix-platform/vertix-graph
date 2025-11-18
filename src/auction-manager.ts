import {
  AuctionCreated as AuctionCreatedEvent,
  BidPlaced as BidPlacedEvent,
  AuctionEnded as AuctionEndedEvent,
  AuctionCancelled as AuctionCancelledEvent,
  AuctionFailedReserveNotMet as AuctionFailedReserveNotMetEvent,
  BidRefunded as BidRefundedEvent,
  BidRefundQueued as BidRefundQueuedEvent,
  NFTEscrowed as NFTEscrowedEvent,
  Withdrawn as WithdrawnEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/AuctionManager/AuctionManager";
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
  PausedAuctionManager,
  UnpausedAuctionManager,
} from "../generated/schema";

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.seller = event.params.seller;
  entity.assetType = event.params.assetType;
  entity.nftContract = event.params.nftContract;
  entity.tokenId = event.params.tokenId;
  entity.bidIncrementBps = event.params.bidIncrementBps;
  entity.reservePrice = event.params.reservePrice;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBidPlaced(event: BidPlacedEvent): void {
  let entity = new BidPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.bidder = event.params.bidder;
  entity.bidAmount = event.params.bidAmount;
  entity.newEndTime = event.params.newEndTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuctionEnded(event: AuctionEndedEvent): void {
  let entity = new AuctionEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.seller = event.params.seller;
  entity.winner = event.params.winner;
  entity.finalBid = event.params.finalBid;
  entity.platformFee = event.params.platformFee;
  entity.royaltyFee = event.params.royaltyFee;
  entity.sellerNet = event.params.sellerNet;
  entity.royaltyReceiver = event.params.royaltyReceiver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  let entity = new AuctionCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.seller = event.params.seller;
  entity.reason = event.params.reason;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuctionFailedReserveNotMet(
  event: AuctionFailedReserveNotMetEvent,
): void {
  let entity = new AuctionFailedReserveNotMet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.highestBid = event.params.highestBid;
  entity.reservePrice = event.params.reservePrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBidRefunded(event: BidRefundedEvent): void {
  let entity = new BidRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.bidder = event.params.bidder;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBidRefundQueued(event: BidRefundQueuedEvent): void {
  let entity = new BidRefundQueued(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.bidder = event.params.bidder;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNFTEscrowed(event: NFTEscrowedEvent): void {
  let entity = new NFTEscrowed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.auctionId = event.params.auctionId;
  entity.nftContract = event.params.nftContract;
  entity.tokenId = event.params.tokenId;
  entity.quantity = event.params.quantity;
  entity.standard = event.params.standard;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let entity = new Withdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.user = event.params.user;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedAuctionManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedAuctionManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
