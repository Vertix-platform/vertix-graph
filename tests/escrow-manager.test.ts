import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleEscrowCreated,
  handleAssetDelivered,
  handleAssetReceiptConfirmed,
  handleEscrowReleased,
  handleEscrowCancelled,
  handleDisputeOpened,
  handleDisputeResolved,
  handleMarketplaceAuthorized,
  handleMarketplaceDeauthorized,
  handlePlatformFeeUpdated,
  handlePaused,
  handleUnpaused,
} from "../src/escrow-manager";
import {
  createEscrowCreatedEvent,
  createAssetDeliveredEvent,
  createAssetReceiptConfirmedEvent,
  createEscrowReleasedEvent,
  createEscrowCancelledEvent,
  createDisputeOpenedEvent,
  createDisputeResolvedEvent,
  createMarketplaceAuthorizedEvent,
  createMarketplaceDeauthorizedEvent,
  createPlatformFeeUpdatedEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./escrow-manager-utils";

describe("EscrowManager", () => {
  afterEach(() => {
    clearStore();
  });

  test("EscrowCreated - stores full escrow details", () => {
    let event = createEscrowCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("1000000000000000000"),
      1,
      BigInt.fromI32(1640086400),
      "ipfs://QmTest123",
    );
    handleEscrowCreated(event);

    assert.entityCount("EscrowCreated", 1);
    assert.fieldEquals(
      "EscrowCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "escrowId",
      "1",
    );
    assert.fieldEquals(
      "EscrowCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "buyer",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "EscrowCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "seller",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "EscrowCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1000000000000000000",
    );
    assert.fieldEquals(
      "EscrowCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "metadataURI",
      "ipfs://QmTest123",
    );
  });

  test("AssetDelivered - records delivery timestamp", () => {
    let event = createAssetDeliveredEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromI32(1640000000),
    );
    handleAssetDelivered(event);

    assert.entityCount("AssetDelivered", 1);
    assert.fieldEquals(
      "AssetDelivered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "deliveryTimestamp",
      "1640000000",
    );
  });

  test("AssetReceiptConfirmed - tracks buyer confirmation", () => {
    let event = createAssetReceiptConfirmedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromI32(1640010000),
    );
    handleAssetReceiptConfirmed(event);

    assert.entityCount("AssetReceiptConfirmed", 1);
    assert.fieldEquals(
      "AssetReceiptConfirmed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "confirmationTimestamp",
      "1640010000",
    );
  });

  test("EscrowReleased - includes fee breakdown", () => {
    let event = createEscrowReleasedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("1000000000000000000"),
      BigInt.fromString("25000000000000000"),
      BigInt.fromString("975000000000000000"),
    );
    handleEscrowReleased(event);

    assert.entityCount("EscrowReleased", 1);
    assert.fieldEquals(
      "EscrowReleased",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1000000000000000000",
    );
    assert.fieldEquals(
      "EscrowReleased",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "platformFee",
      "25000000000000000",
    );
    assert.fieldEquals(
      "EscrowReleased",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "sellerNet",
      "975000000000000000",
    );
  });

  test("EscrowCancelled - stores refund and compensation", () => {
    let event = createEscrowCancelledEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("900000000000000000"),
      BigInt.fromString("100000000000000000"),
    );
    handleEscrowCancelled(event);

    assert.entityCount("EscrowCancelled", 1);
    assert.fieldEquals(
      "EscrowCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "refundAmount",
      "900000000000000000",
    );
    assert.fieldEquals(
      "EscrowCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "sellerCompensation",
      "100000000000000000",
    );
  });

  test("DisputeOpened - records dispute reason", () => {
    let event = createDisputeOpenedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      "Item not as described",
      BigInt.fromI32(1640000000),
    );
    handleDisputeOpened(event);

    assert.entityCount("DisputeOpened", 1);
    assert.fieldEquals(
      "DisputeOpened",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reason",
      "Item not as described",
    );
  });

  test("DisputeResolved - tracks resolution outcome", () => {
    let event = createDisputeResolvedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("1000000000000000000"),
      Address.fromString("0x0000000000000000000000000000000000000005"),
    );
    handleDisputeResolved(event);

    assert.entityCount("DisputeResolved", 1);
    assert.fieldEquals(
      "DisputeResolved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "winner",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "DisputeResolved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "resolver",
      "0x0000000000000000000000000000000000000005",
    );
  });

  test("MarketplaceAuthorized - records authorization", () => {
    let event = createMarketplaceAuthorizedEvent(
      Address.fromString("0x0000000000000000000000000000000000000010"),
      Address.fromString("0x0000000000000000000000000000000000000011"),
    );
    handleMarketplaceAuthorized(event);

    assert.entityCount("MarketplaceAuthorized", 1);
    assert.fieldEquals(
      "MarketplaceAuthorized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "marketplace",
      "0x0000000000000000000000000000000000000010",
    );
  });

  test("MarketplaceDeauthorized - records deauthorization", () => {
    let event = createMarketplaceDeauthorizedEvent(
      Address.fromString("0x0000000000000000000000000000000000000010"),
      Address.fromString("0x0000000000000000000000000000000000000011"),
    );
    handleMarketplaceDeauthorized(event);

    assert.entityCount("MarketplaceDeauthorized", 1);
  });

  test("PlatformFeeUpdated - stores fee change with updater", () => {
    let event = createPlatformFeeUpdatedEvent(
      BigInt.fromI32(250),
      BigInt.fromI32(300),
      Address.fromString("0x0000000000000000000000000000000000000011"),
    );
    handlePlatformFeeUpdated(event);

    assert.entityCount("PlatformFeeUpdatedEscrow", 1);
    assert.fieldEquals(
      "PlatformFeeUpdatedEscrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "oldFeeBps",
      "250",
    );
    assert.fieldEquals(
      "PlatformFeeUpdatedEscrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newFeeBps",
      "300",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedEscrowManager", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedEscrowManager", 1);
  });
});
