import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  Paused,
  Unpaused
} from "../generated/VerificationRegistry/VerificationRegistry"

export function createVerificationAddedEvent(
  verificationId: BigInt,
  owner: Address,
  verifier: Address,
  assetType: i32,
  proofHash: Bytes,
  expiresAt: BigInt,
  metadataURI: string
): VerificationAdded {
  let verificationAddedEvent = changetype<VerificationAdded>(newMockEvent())

  verificationAddedEvent.parameters = new Array()

  verificationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "verificationId",
      ethereum.Value.fromUnsignedBigInt(verificationId)
    )
  )
  verificationAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  verificationAddedEvent.parameters.push(
    new ethereum.EventParam("verifier", ethereum.Value.fromAddress(verifier))
  )
  verificationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "assetType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(assetType))
    )
  )
  verificationAddedEvent.parameters.push(
    new ethereum.EventParam("proofHash", ethereum.Value.fromFixedBytes(proofHash))
  )
  verificationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )
  verificationAddedEvent.parameters.push(
    new ethereum.EventParam("metadataURI", ethereum.Value.fromString(metadataURI))
  )

  return verificationAddedEvent
}

export function createVerificationRevokedEvent(
  verificationId: BigInt,
  owner: Address,
  revokedBy: Address,
  reason: string
): VerificationRevoked {
  let verificationRevokedEvent = changetype<VerificationRevoked>(newMockEvent())

  verificationRevokedEvent.parameters = new Array()

  verificationRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "verificationId",
      ethereum.Value.fromUnsignedBigInt(verificationId)
    )
  )
  verificationRevokedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  verificationRevokedEvent.parameters.push(
    new ethereum.EventParam("revokedBy", ethereum.Value.fromAddress(revokedBy))
  )
  verificationRevokedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return verificationRevokedEvent
}

export function createVerifierAddedEvent(
  verifier: Address,
  addedBy: Address
): VerifierAdded {
  let verifierAddedEvent = changetype<VerifierAdded>(newMockEvent())

  verifierAddedEvent.parameters = new Array()

  verifierAddedEvent.parameters.push(
    new ethereum.EventParam("verifier", ethereum.Value.fromAddress(verifier))
  )
  verifierAddedEvent.parameters.push(
    new ethereum.EventParam("addedBy", ethereum.Value.fromAddress(addedBy))
  )

  return verifierAddedEvent
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
