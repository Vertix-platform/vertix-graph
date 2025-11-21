import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleAuctionCreated,
  handleBidPlaced,
  handleAuctionEnded,
  handleAuctionCancelled,
  handleAuctionFailedReserveNotMet,
  handleBidRefunded,
  handleNFTEscrowed,
  handleWithdrawn,
  handlePaused,
  handleUnpaused,
} from "../src/auction-manager";
import {
  createAuctionCreatedEvent,
  createBidPlacedEvent,
  createAuctionEndedEvent,
  createAuctionCancelledEvent,
  createAuctionFailedReserveNotMetEvent,
  createBidRefundedEvent,
  createNFTEscrowedEvent,
  createWithdrawnEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./auction-manager-utils";

describe("AuctionManager", () => {
  afterEach(() => {
    clearStore();
  });

  test("AuctionCreated - creates and stores entity with all fields", () => {
    let auctionId = BigInt.fromI32(1);
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000001",
    );
    let assetType = 1;
    let nftContract = Address.fromString(
      "0x0000000000000000000000000000000000000002",
    );
    let tokenId = BigInt.fromI32(100);
    let bidIncrementBps = BigInt.fromI32(500);
    let reservePrice = BigInt.fromString("1000000000000000000");
    let startTime = BigInt.fromI32(1640000000);
    let endTime = BigInt.fromI32(1640086400);

    let event = createAuctionCreatedEvent(
      auctionId,
      seller,
      assetType,
      nftContract,
      tokenId,
      reservePrice,
      startTime,
      endTime,
      bidIncrementBps,
    );
    handleAuctionCreated(event);

    assert.entityCount("AuctionCreated", 1);
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "auctionId",
      "1",
    );
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "seller",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "assetType",
      "1",
    );
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "nftContract",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "100",
    );
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "bidIncrementBps",
      "500",
    );
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reservePrice",
      "1000000000000000000",
    );
  });

  test("BidPlaced - creates and stores entity", () => {
    let event = createBidPlacedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      BigInt.fromString("2000000000000000000"),
      BigInt.fromI32(1640090000),
    );
    handleBidPlaced(event);

    assert.entityCount("BidPlaced", 1);
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "auctionId",
      "1",
    );
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "bidder",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "bidAmount",
      "2000000000000000000",
    );
  });

  test("AuctionEnded - creates and stores entity with fee breakdown", () => {
    let event = createAuctionEndedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromString("2000000000000000000"),
      BigInt.fromString("50000000000000000"),
      BigInt.fromString("100000000000000000"),
      BigInt.fromString("1850000000000000000"),
      Address.fromString("0x0000000000000000000000000000000000000004"),
    );
    handleAuctionEnded(event);

    assert.entityCount("AuctionEnded", 1);
    assert.fieldEquals(
      "AuctionEnded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "auctionId",
      "1",
    );
    assert.fieldEquals(
      "AuctionEnded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "winner",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "AuctionEnded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "finalBid",
      "2000000000000000000",
    );
    assert.fieldEquals(
      "AuctionEnded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "platformFee",
      "50000000000000000",
    );
    assert.fieldEquals(
      "AuctionEnded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "sellerNet",
      "1850000000000000000",
    );
  });

  test("AuctionCancelled - stores cancellation reason", () => {
    let event = createAuctionCancelledEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      "No bids received",
    );
    handleAuctionCancelled(event);

    assert.entityCount("AuctionCancelled", 1);
    assert.fieldEquals(
      "AuctionCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reason",
      "No bids received",
    );
  });

  test("AuctionFailedReserveNotMet - stores price comparison", () => {
    let event = createAuctionFailedReserveNotMetEvent(
      BigInt.fromI32(1),
      BigInt.fromString("500000000000000000"),
      BigInt.fromString("1000000000000000000"),
    );
    handleAuctionFailedReserveNotMet(event);

    assert.entityCount("AuctionFailedReserveNotMet", 1);
    assert.fieldEquals(
      "AuctionFailedReserveNotMet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "highestBid",
      "500000000000000000",
    );
    assert.fieldEquals(
      "AuctionFailedReserveNotMet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reservePrice",
      "1000000000000000000",
    );
  });

  test("BidRefunded - tracks refund amounts", () => {
    let event = createBidRefundedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      BigInt.fromString("1500000000000000000"),
    );
    handleBidRefunded(event);

    assert.entityCount("BidRefunded", 1);
    assert.fieldEquals(
      "BidRefunded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "1500000000000000000",
    );
  });

  test("NFTEscrowed - stores NFT details", () => {
    let event = createNFTEscrowedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromI32(100),
      BigInt.fromI32(1),
      1,
    );
    handleNFTEscrowed(event);

    assert.entityCount("NFTEscrowed", 1);
    assert.fieldEquals(
      "NFTEscrowed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "100",
    );
    assert.fieldEquals(
      "NFTEscrowed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "quantity",
      "1",
    );
  });

  test("Withdrawn - tracks user withdrawals", () => {
    let event = createWithdrawnEvent(
      Address.fromString("0x0000000000000000000000000000000000000005"),
      BigInt.fromString("500000000000000000"),
    );
    handleWithdrawn(event);

    assert.entityCount("Withdrawn", 1);
    assert.fieldEquals(
      "Withdrawn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "500000000000000000",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedAuctionManager", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedAuctionManager", 1);
  });
});
