import {
  RoleGrantScheduled as RoleGrantScheduledEvent,
  RoleGrantExecuted as RoleGrantExecutedEvent,
  RoleGrantCancelled as RoleGrantCancelledEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  EmergencyPaused as EmergencyPausedEvent,
  EmergencyUnpaused as EmergencyUnpausedEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/RoleManager/RoleManager";
import {
  RoleGrantScheduled,
  RoleGrantExecuted,
  RoleGrantCancelled,
  RoleGranted,
  RoleRevoked,
  RoleAdminChanged,
  EmergencyPaused,
  EmergencyUnpaused,
  PausedRoleManager,
  UnpausedRoleManager,
} from "../generated/schema";

export function handleRoleGrantScheduled(event: RoleGrantScheduledEvent): void {
  let entity = new RoleGrantScheduled(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.scheduler = event.params.scheduler;
  entity.executeAfter = event.params.executeAfter;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGrantExecuted(event: RoleGrantExecutedEvent): void {
  let entity = new RoleGrantExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.executor = event.params.executor;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGrantCancelled(event: RoleGrantCancelledEvent): void {
  let entity = new RoleGrantCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.canceller = event.params.canceller;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEmergencyPaused(event: EmergencyPausedEvent): void {
  let entity = new EmergencyPaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.pauser = event.params.pauser;
  entity.reason = event.params.reason;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEmergencyUnpaused(event: EmergencyUnpausedEvent): void {
  let entity = new EmergencyUnpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.unpauser = event.params.unpauser;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedRoleManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedRoleManager(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
