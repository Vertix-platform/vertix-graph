import {
  FeesReceived as FeesReceivedEvent,
  FeesWithdrawn as FeesWithdrawnEvent,
  PaymentDistributed as PaymentDistributedEvent,
  PlatformFeeUpdated as PlatformFeeUpdatedEvent,
  FeeCollectorUpdated as FeeCollectorUpdatedEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/FeeDistributor/FeeDistributor";
import {
  FeesReceived,
  FeesWithdrawn,
  PaymentDistributed,
  PlatformFeeUpdated,
  FeeCollectorUpdated,
  PausedFeeDistributor,
  UnpausedFeeDistributor,
} from "../generated/schema";

export function handleFeesReceived(event: FeesReceivedEvent): void {
  let entity = new FeesReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.from = event.params.from;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFeesWithdrawn(event: FeesWithdrawnEvent): void {
  let entity = new FeesWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.collector = event.params.collector;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaymentDistributed(event: PaymentDistributedEvent): void {
  let entity = new PaymentDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.seller = event.params.seller;
  entity.buyer = event.params.buyer;
  entity.totalAmount = event.params.totalAmount;
  entity.platformFee = event.params.platformFee;
  entity.royaltyFee = event.params.royaltyFee;
  entity.sellerNet = event.params.sellerNet;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePlatformFeeUpdated(event: PlatformFeeUpdatedEvent): void {
  let entity = new PlatformFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.oldFee = event.params.oldFee;
  entity.newFee = event.params.newFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFeeCollectorUpdated(
  event: FeeCollectorUpdatedEvent,
): void {
  let entity = new FeeCollectorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.oldCollector = event.params.oldCollector;
  entity.newCollector = event.params.newCollector;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedFeeDistributor(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedFeeDistributor(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
