import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleFeesReceived,
  handleFeesWithdrawn,
  handlePaymentDistributed,
  handlePlatformFeeUpdated,
  handleFeeCollectorUpdated,
  handlePaused,
  handleUnpaused,
} from "../src/fee-distributor";
import {
  createFeesReceivedEvent,
  createFeesWithdrawnEvent,
  createPaymentDistributedEvent,
  createPlatformFeeUpdatedEvent,
  createFeeCollectorUpdatedEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./fee-distributor-utils";

describe("FeeDistributor", () => {
  afterEach(() => {
    clearStore();
  });

  test("FeesReceived - tracks incoming fees", () => {
    let event = createFeesReceivedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("100000000000000000"),
    );
    handleFeesReceived(event);

    assert.entityCount("FeesReceived", 1);
    assert.fieldEquals(
      "FeesReceived",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "from",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "FeesReceived",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "100000000000000000",
    );
  });

  test("FeesWithdrawn - records withdrawal by collector", () => {
    let event = createFeesWithdrawnEvent(
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("500000000000000000"),
    );
    handleFeesWithdrawn(event);

    assert.entityCount("FeesWithdrawn", 1);
    assert.fieldEquals(
      "FeesWithdrawn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "collector",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "FeesWithdrawn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "500000000000000000",
    );
  });

  test("PaymentDistributed - includes full fee breakdown", () => {
    let event = createPaymentDistributedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("1000000000000000000"),
      BigInt.fromString("25000000000000000"),
      BigInt.fromString("50000000000000000"),
      BigInt.fromString("925000000000000000"),
    );
    handlePaymentDistributed(event);

    assert.entityCount("PaymentDistributed", 1);
    assert.fieldEquals(
      "PaymentDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "seller",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "PaymentDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "totalAmount",
      "1000000000000000000",
    );
    assert.fieldEquals(
      "PaymentDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "platformFee",
      "25000000000000000",
    );
    assert.fieldEquals(
      "PaymentDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "royaltyFee",
      "50000000000000000",
    );
    assert.fieldEquals(
      "PaymentDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "sellerNet",
      "925000000000000000",
    );
  });

  test("PlatformFeeUpdated - tracks fee adjustments", () => {
    let event = createPlatformFeeUpdatedEvent(
      BigInt.fromI32(250),
      BigInt.fromI32(300),
    );
    handlePlatformFeeUpdated(event);

    assert.entityCount("PlatformFeeUpdated", 1);
    assert.fieldEquals(
      "PlatformFeeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "oldFee",
      "250",
    );
    assert.fieldEquals(
      "PlatformFeeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newFee",
      "300",
    );
  });

  test("FeeCollectorUpdated - records collector changes", () => {
    let event = createFeeCollectorUpdatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000010"),
      Address.fromString("0x0000000000000000000000000000000000000011"),
    );
    handleFeeCollectorUpdated(event);

    assert.entityCount("FeeCollectorUpdated", 1);
    assert.fieldEquals(
      "FeeCollectorUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "oldCollector",
      "0x0000000000000000000000000000000000000010",
    );
    assert.fieldEquals(
      "FeeCollectorUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newCollector",
      "0x0000000000000000000000000000000000000011",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedFeeDistributor", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedFeeDistributor", 1);
  });
});
