import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  RoleGrantScheduled,
  RoleGrantExecuted,
  RoleGrantCancelled,
  RoleGranted,
  RoleRevoked,
  RoleAdminChanged,
  EmergencyPaused,
  EmergencyUnpaused,
  Paused,
  Unpaused
} from "../generated/RoleManager/RoleManager"

export function createRoleGrantScheduledEvent(
  role: Bytes,
  account: Address,
  scheduler: Address,
  executeAfter: BigInt
): RoleGrantScheduled {
  let roleGrantScheduledEvent = changetype<RoleGrantScheduled>(newMockEvent())

  roleGrantScheduledEvent.parameters = new Array()

  roleGrantScheduledEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantScheduledEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantScheduledEvent.parameters.push(
    new ethereum.EventParam("scheduler", ethereum.Value.fromAddress(scheduler))
  )
  roleGrantScheduledEvent.parameters.push(
    new ethereum.EventParam(
      "executeAfter",
      ethereum.Value.fromUnsignedBigInt(executeAfter)
    )
  )

  return roleGrantScheduledEvent
}

export function createRoleGrantExecutedEvent(
  role: Bytes,
  account: Address,
  executor: Address
): RoleGrantExecuted {
  let roleGrantExecutedEvent = changetype<RoleGrantExecuted>(newMockEvent())

  roleGrantExecutedEvent.parameters = new Array()

  roleGrantExecutedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantExecutedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantExecutedEvent.parameters.push(
    new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
  )

  return roleGrantExecutedEvent
}

export function createRoleGrantCancelledEvent(
  role: Bytes,
  account: Address,
  canceller: Address
): RoleGrantCancelled {
  let roleGrantCancelledEvent = changetype<RoleGrantCancelled>(newMockEvent())

  roleGrantCancelledEvent.parameters = new Array()

  roleGrantCancelledEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantCancelledEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantCancelledEvent.parameters.push(
    new ethereum.EventParam("canceller", ethereum.Value.fromAddress(canceller))
  )

  return roleGrantCancelledEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createEmergencyPausedEvent(
  pauser: Address,
  reason: string
): EmergencyPaused {
  let emergencyPausedEvent = changetype<EmergencyPaused>(newMockEvent())

  emergencyPausedEvent.parameters = new Array()

  emergencyPausedEvent.parameters.push(
    new ethereum.EventParam("pauser", ethereum.Value.fromAddress(pauser))
  )
  emergencyPausedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return emergencyPausedEvent
}

export function createEmergencyUnpausedEvent(
  unpauser: Address
): EmergencyUnpaused {
  let emergencyUnpausedEvent = changetype<EmergencyUnpaused>(newMockEvent())

  emergencyUnpausedEvent.parameters = new Array()

  emergencyUnpausedEvent.parameters.push(
    new ethereum.EventParam("unpauser", ethereum.Value.fromAddress(unpauser))
  )

  return emergencyUnpausedEvent
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
