import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address } from "@graphprotocol/graph-ts";
import {
  handleReputationUpdated,
  handleUserBanned,
  handleUserUnbanned,
  handleAuthorizedContractAdded,
  handleAuthorizedContractRemoved,
  handlePaused,
  handleUnpaused,
} from "../src/reputation-manager";
import {
  createReputationUpdatedEvent,
  createUserBannedEvent,
  createUserUnbannedEvent,
  createAuthorizedContractAddedEvent,
  createAuthorizedContractRemovedEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./reputation-manager-utils";

describe("ReputationManager", () => {
  afterEach(() => {
    clearStore();
  });

  test("ReputationUpdated - tracks positive reputation change", () => {
    let event = createReputationUpdatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      1,
      10,
      100,
    );
    handleReputationUpdated(event);

    assert.entityCount("ReputationUpdated", 1);
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "user",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "action",
      "1",
    );
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "pointsChange",
      "10",
    );
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newScore",
      "100",
    );
  });

  test("ReputationUpdated - tracks negative reputation change", () => {
    let event = createReputationUpdatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      2,
      -20,
      50,
    );
    handleReputationUpdated(event);

    assert.entityCount("ReputationUpdated", 1);
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "pointsChange",
      "-20",
    );
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newScore",
      "50",
    );
  });

  test("UserBanned - stores ban details with reason", () => {
    let event = createUserBannedEvent(
      Address.fromString("0x0000000000000000000000000000000000000002"),
      "Violation of terms",
      Address.fromString("0x0000000000000000000000000000000000000003"),
    );
    handleUserBanned(event);

    assert.entityCount("UserBanned", 1);
    assert.fieldEquals(
      "UserBanned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "user",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "UserBanned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reason",
      "Violation of terms",
    );
    assert.fieldEquals(
      "UserBanned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "bannedBy",
      "0x0000000000000000000000000000000000000003",
    );
  });

  test("UserUnbanned - records unban action", () => {
    let event = createUserUnbannedEvent(
      Address.fromString("0x0000000000000000000000000000000000000002"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
    );
    handleUserUnbanned(event);

    assert.entityCount("UserUnbanned", 1);
    assert.fieldEquals(
      "UserUnbanned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "user",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "UserUnbanned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "unbannedBy",
      "0x0000000000000000000000000000000000000003",
    );
  });

  test("AuthorizedContractAdded - tracks contract authorization", () => {
    let event = createAuthorizedContractAddedEvent(
      Address.fromString("0x0000000000000000000000000000000000000010"),
      Address.fromString("0x0000000000000000000000000000000000000011"),
    );
    handleAuthorizedContractAdded(event);

    assert.entityCount("AuthorizedContractAdded", 1);
    assert.fieldEquals(
      "AuthorizedContractAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "contractAddress",
      "0x0000000000000000000000000000000000000010",
    );
    assert.fieldEquals(
      "AuthorizedContractAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "addedBy",
      "0x0000000000000000000000000000000000000011",
    );
  });

  test("AuthorizedContractRemoved - tracks contract removal", () => {
    let event = createAuthorizedContractRemovedEvent(
      Address.fromString("0x0000000000000000000000000000000000000010"),
      Address.fromString("0x0000000000000000000000000000000000000011"),
    );
    handleAuthorizedContractRemoved(event);

    assert.entityCount("AuthorizedContractRemoved", 1);
    assert.fieldEquals(
      "AuthorizedContractRemoved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "contractAddress",
      "0x0000000000000000000000000000000000000010",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedReputationManager", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedReputationManager", 1);
  });
});
