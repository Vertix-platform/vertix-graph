import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleSingleNFTMinted,
  handleTransfer,
  handleApproval,
  handleApprovalForAll,
  handlePaused,
  handleUnpaused,
} from "../src/vertix-singles-nft-721";
import {
  createSingleNFTMintedEvent,
  createTransferEvent,
  createApprovalEvent,
  createApprovalForAllEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./vertix-singles-nft-721-utils";

describe("VertixSinglesNFT721", () => {
  afterEach(() => {
    clearStore();
  });

  test("SingleNFTMinted - stores minting details with URI", () => {
    let event = createSingleNFTMintedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromI32(1),
      "ipfs://QmTest123",
    );
    handleSingleNFTMinted(event);

    assert.entityCount("SingleNFTMinted", 1);
    assert.fieldEquals(
      "SingleNFTMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "minter",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "SingleNFTMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
    assert.fieldEquals(
      "SingleNFTMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "uri",
      "ipfs://QmTest123",
    );
  });

  test("Transfer - tracks NFT ownership change", () => {
    let event = createTransferEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromI32(1),
    );
    handleTransfer(event);

    assert.entityCount("Transfer", 1);
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "from",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "to",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
  });

  test("Approval - grants approval for specific token", () => {
    let event = createApprovalEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      BigInt.fromI32(1),
    );
    handleApproval(event);

    assert.entityCount("Approval", 1);
    assert.fieldEquals(
      "Approval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "owner",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "Approval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "approved",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "Approval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
  });

  test("ApprovalForAll - grants operator approval", () => {
    let event = createApprovalForAllEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000004"),
      true,
    );
    handleApprovalForAll(event);

    assert.entityCount("ApprovalForAll", 1);
    assert.fieldEquals(
      "ApprovalForAll",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "owner",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "ApprovalForAll",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "operator",
      "0x0000000000000000000000000000000000000004",
    );
    assert.fieldEquals(
      "ApprovalForAll",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "approved",
      "true",
    );
  });

  test("ApprovalForAll - revokes operator approval", () => {
    let event = createApprovalForAllEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000004"),
      false,
    );
    handleApprovalForAll(event);

    assert.entityCount("ApprovalForAll", 1);
    assert.fieldEquals(
      "ApprovalForAll",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "approved",
      "false",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedSinglesNFT", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedSinglesNFT", 1);
  });
});
