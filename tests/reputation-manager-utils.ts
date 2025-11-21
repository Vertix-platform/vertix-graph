import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ReputationUpdated,
  UserBanned,
  UserUnbanned,
  AuthorizedContractAdded,
  AuthorizedContractRemoved,
  Paused,
  Unpaused
} from "../generated/ReputationManager/ReputationManager"

export function createReputationUpdatedEvent(
  user: Address,
  action: i32,
  pointsChange: i32,
  newScore: i32
): ReputationUpdated {
  let reputationUpdatedEvent = changetype<ReputationUpdated>(newMockEvent())

  reputationUpdatedEvent.parameters = new Array()

  reputationUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  reputationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "action",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(action))
    )
  )
  reputationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "pointsChange",
      ethereum.Value.fromSignedBigInt(BigInt.fromI32(pointsChange))
    )
  )
  reputationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newScore",
      ethereum.Value.fromSignedBigInt(BigInt.fromI32(newScore))
    )
  )

  return reputationUpdatedEvent
}

export function createUserBannedEvent(
  user: Address,
  reason: string,
  bannedBy: Address
): UserBanned {
  let userBannedEvent = changetype<UserBanned>(newMockEvent())

  userBannedEvent.parameters = new Array()

  userBannedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userBannedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )
  userBannedEvent.parameters.push(
    new ethereum.EventParam("bannedBy", ethereum.Value.fromAddress(bannedBy))
  )

  return userBannedEvent
}

export function createUserUnbannedEvent(
  user: Address,
  unbannedBy: Address
): UserUnbanned {
  let userUnbannedEvent = changetype<UserUnbanned>(newMockEvent())

  userUnbannedEvent.parameters = new Array()

  userUnbannedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userUnbannedEvent.parameters.push(
    new ethereum.EventParam("unbannedBy", ethereum.Value.fromAddress(unbannedBy))
  )

  return userUnbannedEvent
}

export function createAuthorizedContractAddedEvent(
  contractAddress: Address,
  addedBy: Address
): AuthorizedContractAdded {
  let authorizedContractAddedEvent = changetype<AuthorizedContractAdded>(
    newMockEvent()
  )

  authorizedContractAddedEvent.parameters = new Array()

  authorizedContractAddedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  authorizedContractAddedEvent.parameters.push(
    new ethereum.EventParam("addedBy", ethereum.Value.fromAddress(addedBy))
  )

  return authorizedContractAddedEvent
}

export function createAuthorizedContractRemovedEvent(
  contractAddress: Address,
  removedBy: Address
): AuthorizedContractRemoved {
  let authorizedContractRemovedEvent = changetype<AuthorizedContractRemoved>(
    newMockEvent()
  )

  authorizedContractRemovedEvent.parameters = new Array()

  authorizedContractRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  authorizedContractRemovedEvent.parameters.push(
    new ethereum.EventParam("removedBy", ethereum.Value.fromAddress(removedBy))
  )

  return authorizedContractRemovedEvent
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
