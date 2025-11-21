import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  handleRoleGrantScheduled,
  handleRoleGrantExecuted,
  handleRoleGrantCancelled,
  handleRoleGranted,
  handleRoleRevoked,
  handleRoleAdminChanged,
  handleEmergencyPaused,
  handleEmergencyUnpaused,
  handlePaused,
  handleUnpaused,
} from "../src/role-manager";
import {
  createRoleGrantScheduledEvent,
  createRoleGrantExecutedEvent,
  createRoleGrantCancelledEvent,
  createRoleGrantedEvent,
  createRoleRevokedEvent,
  createRoleAdminChangedEvent,
  createEmergencyPausedEvent,
  createEmergencyUnpausedEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./role-manager-utils";

describe("RoleManager", () => {
  afterEach(() => {
    clearStore();
  });

  test("RoleGrantScheduled - stores role grant with delay", () => {
    let role = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    let event = createRoleGrantScheduledEvent(
      role,
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromI32(1640086400),
    );
    handleRoleGrantScheduled(event);

    assert.entityCount("RoleGrantScheduled", 1);
    assert.fieldEquals(
      "RoleGrantScheduled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "account",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "RoleGrantScheduled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "scheduler",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "RoleGrantScheduled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "executeAfter",
      "1640086400",
    );
  });

  test("RoleGrantExecuted - records execution", () => {
    let role = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    let event = createRoleGrantExecutedEvent(
      role,
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
    );
    handleRoleGrantExecuted(event);

    assert.entityCount("RoleGrantExecuted", 1);
    assert.fieldEquals(
      "RoleGrantExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "executor",
      "0x0000000000000000000000000000000000000002",
    );
  });

  test("RoleGrantCancelled - tracks cancellation", () => {
    let role = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    let event = createRoleGrantCancelledEvent(
      role,
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
    );
    handleRoleGrantCancelled(event);

    assert.entityCount("RoleGrantCancelled", 1);
    assert.fieldEquals(
      "RoleGrantCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "canceller",
      "0x0000000000000000000000000000000000000003",
    );
  });

  test("RoleGranted - records immediate role grant", () => {
    let role = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    let event = createRoleGrantedEvent(
      role,
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
    );
    handleRoleGranted(event);

    assert.entityCount("RoleGranted", 1);
    assert.fieldEquals(
      "RoleGranted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "account",
      "0x0000000000000000000000000000000000000001",
    );
  });

  test("RoleRevoked - tracks role removal", () => {
    let role = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    let event = createRoleRevokedEvent(
      role,
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
    );
    handleRoleRevoked(event);

    assert.entityCount("RoleRevoked", 1);
    assert.fieldEquals(
      "RoleRevoked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "account",
      "0x0000000000000000000000000000000000000001",
    );
  });

  test("RoleAdminChanged - stores admin role changes", () => {
    let role = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    let previousAdminRole = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000002",
    );
    let newAdminRole = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000000000000000000000000003",
    );
    let event = createRoleAdminChangedEvent(
      role,
      previousAdminRole,
      newAdminRole,
    );
    handleRoleAdminChanged(event);

    assert.entityCount("RoleAdminChanged", 1);
  });

  test("EmergencyPaused - records emergency pause with reason", () => {
    let event = createEmergencyPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000005"),
      "Security breach detected",
    );
    handleEmergencyPaused(event);

    assert.entityCount("EmergencyPaused", 1);
    assert.fieldEquals(
      "EmergencyPaused",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reason",
      "Security breach detected",
    );
  });

  test("EmergencyUnpaused - records unpause", () => {
    let event = createEmergencyUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000005"),
    );
    handleEmergencyUnpaused(event);

    assert.entityCount("EmergencyUnpaused", 1);
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedRoleManager", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedRoleManager", 1);
  });
});
