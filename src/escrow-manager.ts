import {
  EscrowCreated as EscrowCreatedEvent,
  AssetDelivered as AssetDeliveredEvent,
  AssetReceiptConfirmed as AssetReceiptConfirmedEvent,
  EscrowReleased as EscrowReleasedEvent,
  EscrowCancelled as EscrowCancelledEvent,
  DisputeOpened as DisputeOpenedEvent,
  DisputeResolved as DisputeResolvedEvent,
  MarketplaceAuthorized as MarketplaceAuthorizedEvent,
  MarketplaceDeauthorized as MarketplaceDeauthorizedEvent,
  PlatformFeeUpdated as PlatformFeeUpdatedEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/EscrowManager/EscrowManager";
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
  PlatformFeeUpdatedEscrow,
  PausedEscrowManager,
  UnpausedEscrowManager,
} from "../generated/schema";

export function handleEscrowCreated(event: EscrowCreatedEvent): void {
  let entity = new EscrowCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.buyer = event.params.buyer;
  entity.seller = event.params.seller;
  entity.amount = event.params.amount;
  entity.assetType = event.params.assetType;
  entity.releaseTime = event.params.releaseTime;
  entity.metadataURI = event.params.metadataURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAssetDelivered(event: AssetDeliveredEvent): void {
  let entity = new AssetDelivered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.seller = event.params.seller;
  entity.deliveryTimestamp = event.params.deliveryTimestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAssetReceiptConfirmed(
  event: AssetReceiptConfirmedEvent,
): void {
  let entity = new AssetReceiptConfirmed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.buyer = event.params.buyer;
  entity.confirmationTimestamp = event.params.confirmationTimestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEscrowReleased(event: EscrowReleasedEvent): void {
  let entity = new EscrowReleased(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.seller = event.params.seller;
  entity.amount = event.params.amount;
  entity.platformFee = event.params.platformFee;
  entity.sellerNet = event.params.sellerNet;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEscrowCancelled(event: EscrowCancelledEvent): void {
  let entity = new EscrowCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.buyer = event.params.buyer;
  entity.refundAmount = event.params.refundAmount;
  entity.sellerCompensation = event.params.sellerCompensation;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDisputeOpened(event: DisputeOpenedEvent): void {
  let entity = new DisputeOpened(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.disputedBy = event.params.disputedBy;
  entity.reason = event.params.reason;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDisputeResolved(event: DisputeResolvedEvent): void {
  let entity = new DisputeResolved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.escrowId = event.params.escrowId;
  entity.winner = event.params.winner;
  entity.amount = event.params.amount;
  entity.resolver = event.params.resolver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMarketplaceAuthorized(
  event: MarketplaceAuthorizedEvent,
): void {
  let entity = new MarketplaceAuthorized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.marketplace = event.params.marketplace;
  entity.authorizedBy = event.params.authorizedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMarketplaceDeauthorized(
  event: MarketplaceDeauthorizedEvent,
): void {
  let entity = new MarketplaceDeauthorized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.marketplace = event.params.marketplace;
  entity.deauthorizedBy = event.params.deauthorizedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePlatformFeeUpdated(event: PlatformFeeUpdatedEvent): void {
  let entity = new PlatformFeeUpdatedEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.oldFeeBps = event.params.oldFeeBps;
  entity.newFeeBps = event.params.newFeeBps;
  entity.updatedBy = event.params.updatedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedEscrowManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedEscrowManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
