import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleOfferMade,
  handleOfferAccepted,
  handleOfferCancelled,
  handleOfferRejected,
  handleOfferExpired,
  handleOfferInvalidated,
  handleOfferRefunded,
  handlePlatformFeeUpdated,
  handlePaused,
  handleUnpaused,
} from "../src/offer-manager";
import {
  createOfferMadeEvent,
  createOfferAcceptedEvent,
  createOfferCancelledEvent,
  createOfferRejectedEvent,
  createOfferExpiredEvent,
  createOfferInvalidatedEvent,
  createOfferRefundedEvent,
  createPlatformFeeUpdatedEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./offer-manager-utils";

describe("OfferManager", () => {
  afterEach(() => {
    clearStore();
  });

  test("OfferMade - creates offer with expiration", () => {
    let event = createOfferMadeEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("1000000000000000000"),
      BigInt.fromI32(1640086400),
      1,
    );
    handleOfferMade(event);

    assert.entityCount("OfferMade", 1);
    assert.fieldEquals(
      "OfferMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "offerId",
      "1",
    );
    assert.fieldEquals(
      "OfferMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "listingId",
      "10",
    );
    assert.fieldEquals(
      "OfferMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "buyer",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "OfferMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1000000000000000000",
    );
    assert.fieldEquals(
      "OfferMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "expiresAt",
      "1640086400",
    );
  });

  test("OfferAccepted - records successful offer", () => {
    let event = createOfferAcceptedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("1000000000000000000"),
    );
    handleOfferAccepted(event);

    assert.entityCount("OfferAccepted", 1);
    assert.fieldEquals(
      "OfferAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "offerId",
      "1",
    );
    assert.fieldEquals(
      "OfferAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1000000000000000000",
    );
  });

  test("OfferCancelled - includes refund amount", () => {
    let event = createOfferCancelledEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("1000000000000000000"),
    );
    handleOfferCancelled(event);

    assert.entityCount("OfferCancelled", 1);
    assert.fieldEquals(
      "OfferCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "refundAmount",
      "1000000000000000000",
    );
  });

  test("OfferRejected - stores rejection reason", () => {
    let event = createOfferRejectedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      "Price too low",
    );
    handleOfferRejected(event);

    assert.entityCount("OfferRejected", 1);
    assert.fieldEquals(
      "OfferRejected",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reason",
      "Price too low",
    );
  });

  test("OfferExpired - tracks expired offers", () => {
    let event = createOfferExpiredEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      Address.fromString("0x0000000000000000000000000000000000000001"),
    );
    handleOfferExpired(event);

    assert.entityCount("OfferExpired", 1);
    assert.fieldEquals(
      "OfferExpired",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "offerId",
      "1",
    );
  });

  test("OfferInvalidated - records invalidation", () => {
    let event = createOfferInvalidatedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("1000000000000000000"),
    );
    handleOfferInvalidated(event);

    assert.entityCount("OfferInvalidated", 1);
    assert.fieldEquals(
      "OfferInvalidated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1000000000000000000",
    );
  });

  test("OfferRefunded - tracks refund processing", () => {
    let event = createOfferRefundedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("1000000000000000000"),
    );
    handleOfferRefunded(event);

    assert.entityCount("OfferRefunded", 1);
    assert.fieldEquals(
      "OfferRefunded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1000000000000000000",
    );
  });

  test("PlatformFeeUpdated - stores fee changes", () => {
    let event = createPlatformFeeUpdatedEvent(
      BigInt.fromI32(250),
      BigInt.fromI32(300),
    );
    handlePlatformFeeUpdated(event);

    assert.entityCount("PlatformFeeUpdatedOffer", 1);
    assert.fieldEquals(
      "PlatformFeeUpdatedOffer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "oldFee",
      "250",
    );
    assert.fieldEquals(
      "PlatformFeeUpdatedOffer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newFee",
      "300",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedOfferManager", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedOfferManager", 1);
  });
});
