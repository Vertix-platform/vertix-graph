import {
  ReputationUpdated as ReputationUpdatedEvent,
  UserBanned as UserBannedEvent,
  UserUnbanned as UserUnbannedEvent,
  AuthorizedContractAdded as AuthorizedContractAddedEvent,
  AuthorizedContractRemoved as AuthorizedContractRemovedEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/ReputationManager/ReputationManager";
import {
  ReputationUpdated,
  UserBanned,
  UserUnbanned,
  AuthorizedContractAdded,
  AuthorizedContractRemoved,
  PausedReputationManager,
  UnpausedReputationManager,
} from "../generated/schema";

export function handleReputationUpdated(event: ReputationUpdatedEvent): void {
  let entity = new ReputationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.user = event.params.user;
  entity.action = event.params.action;
  entity.pointsChange = event.params.pointsChange.toI32();
  entity.newScore = event.params.newScore.toI32();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUserBanned(event: UserBannedEvent): void {
  let entity = new UserBanned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.user = event.params.user;
  entity.reason = event.params.reason;
  entity.bannedBy = event.params.bannedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUserUnbanned(event: UserUnbannedEvent): void {
  let entity = new UserUnbanned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.user = event.params.user;
  entity.unbannedBy = event.params.unbannedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuthorizedContractAdded(
  event: AuthorizedContractAddedEvent,
): void {
  let entity = new AuthorizedContractAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.contractAddress = event.params.contractAddress;
  entity.addedBy = event.params.addedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuthorizedContractRemoved(
  event: AuthorizedContractRemovedEvent,
): void {
  let entity = new AuthorizedContractRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.contractAddress = event.params.contractAddress;
  entity.removedBy = event.params.removedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedReputationManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedReputationManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
