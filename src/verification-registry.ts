import {
  VerificationAdded as VerificationAddedEvent,
  UserVerificationSubmitted as UserVerificationSubmittedEvent,
  UserVerificationFinalized as UserVerificationFinalizedEvent,
  VerificationRevoked as VerificationRevokedEvent,
  VerificationRenewed as VerificationRenewedEvent,
  VerificationChallenged as VerificationChallengedEvent,
  ChallengeResolved as ChallengeResolvedEvent,
  VerifierAdded as VerifierAddedEvent,
  VerifierRemoved as VerifierRemovedEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/VerificationRegistry/VerificationRegistry";
import {
  VerificationAdded,
  UserVerificationSubmitted,
  UserVerificationFinalized,
  VerificationRevoked,
  VerificationRenewed,
  VerificationChallenged,
  ChallengeResolved,
  VerifierAdded,
  VerifierRemoved,
  PausedVerificationRegistry,
  UnpausedVerificationRegistry,
} from "../generated/schema";

export function handleVerificationAdded(event: VerificationAddedEvent): void {
  let entity = new VerificationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.owner = event.params.owner;
  entity.verifier = event.params.verifier;
  entity.assetType = event.params.assetType;
  entity.proofHash = event.params.proofHash;
  entity.expiresAt = event.params.expiresAt;
  entity.metadataURI = event.params.metadataURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUserVerificationSubmitted(
  event: UserVerificationSubmittedEvent,
): void {
  let entity = new UserVerificationSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.owner = event.params.owner;
  entity.assetType = event.params.assetType;
  entity.proofHash = event.params.proofHash;
  entity.expiresAt = event.params.expiresAt;
  entity.metadataURI = event.params.metadataURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUserVerificationFinalized(
  event: UserVerificationFinalizedEvent,
): void {
  let entity = new UserVerificationFinalized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.owner = event.params.owner;
  entity.assetType = event.params.assetType;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVerificationRevoked(
  event: VerificationRevokedEvent,
): void {
  let entity = new VerificationRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.owner = event.params.owner;
  entity.revokedBy = event.params.revokedBy;
  entity.reason = event.params.reason;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVerificationRenewed(
  event: VerificationRenewedEvent,
): void {
  let entity = new VerificationRenewed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.owner = event.params.owner;
  entity.newExpiresAt = event.params.newExpiresAt;
  entity.renewalCount = event.params.renewalCount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVerificationChallenged(
  event: VerificationChallengedEvent,
): void {
  let entity = new VerificationChallenged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.challenger = event.params.challenger;
  entity.evidence = event.params.evidence;
  entity.stake = event.params.stake;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleChallengeResolved(event: ChallengeResolvedEvent): void {
  let entity = new ChallengeResolved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verificationId = event.params.verificationId;
  entity.challengeApproved = event.params.challengeApproved;
  entity.challenger = event.params.challenger;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVerifierAdded(event: VerifierAddedEvent): void {
  let entity = new VerifierAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verifier = event.params.verifier;
  entity.addedBy = event.params.addedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVerifierRemoved(event: VerifierRemovedEvent): void {
  let entity = new VerifierRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.verifier = event.params.verifier;
  entity.removedBy = event.params.removedBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new PausedVerificationRegistry(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new UnpausedVerificationRegistry(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
