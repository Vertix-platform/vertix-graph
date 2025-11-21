import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleSingleEditionMinted,
  handleTransferSingle,
  handleTransferBatch,
  handleApprovalForAll,
  handleURI,
  handlePaused,
  handleUnpaused,
} from "../src/vertix-singles-nft-1155";
import {
  createSingleEditionMintedEvent,
  createTransferSingleEvent,
  createTransferBatchEvent,
  createApprovalForAllEvent,
  createURIEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./vertix-singles-nft-1155-utils";

describe("VertixSinglesNFT1155", () => {
  afterEach(() => {
    clearStore();
  });

  test("SingleEditionMinted - stores edition with supply details", () => {
    let event = createSingleEditionMintedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromI32(1),
      BigInt.fromI32(100),
      BigInt.fromI32(1000),
      "ipfs://QmTest123",
    );
    handleSingleEditionMinted(event);

    assert.entityCount("SingleEditionMinted", 1);
    assert.fieldEquals(
      "SingleEditionMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "minter",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "SingleEditionMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
    assert.fieldEquals(
      "SingleEditionMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "amount",
      "100",
    );
    assert.fieldEquals(
      "SingleEditionMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "maxSupply",
      "1000",
    );
    assert.fieldEquals(
      "SingleEditionMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "uri",
      "ipfs://QmTest123",
    );
  });

  test("TransferSingle - tracks single token transfer", () => {
    let event = createTransferSingleEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      BigInt.fromI32(1),
      BigInt.fromI32(10),
    );
    handleTransferSingle(event);

    assert.entityCount("TransferSingle", 1);
    assert.fieldEquals(
      "TransferSingle",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "operator",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "TransferSingle",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "from",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "TransferSingle",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "to",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "TransferSingle",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
    assert.fieldEquals(
      "TransferSingle",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "value",
      "10",
    );
  });

  test("TransferBatch - tracks multiple token transfer", () => {
    let ids = [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)];
    let values = [BigInt.fromI32(5), BigInt.fromI32(10), BigInt.fromI32(15)];

    let event = createTransferBatchEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      ids,
      values,
    );
    handleTransferBatch(event);

    assert.entityCount("TransferBatch", 1);
    assert.fieldEquals(
      "TransferBatch",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "operator",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "TransferBatch",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "from",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "TransferBatch",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "to",
      "0x0000000000000000000000000000000000000003",
    );
  });

  test("ApprovalForAll - grants operator approval", () => {
    let event = createApprovalForAllEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000004"),
      true,
    );
    handleApprovalForAll(event);

    assert.entityCount("ApprovalForAll1155", 1);
    assert.fieldEquals(
      "ApprovalForAll1155",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "account",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "ApprovalForAll1155",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "operator",
      "0x0000000000000000000000000000000000000004",
    );
    assert.fieldEquals(
      "ApprovalForAll1155",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "approved",
      "true",
    );
  });

  test("URIUpdated - tracks metadata changes", () => {
    let event = createURIEvent("ipfs://QmUpdated456", BigInt.fromI32(1));
    handleURI(event);

    assert.entityCount("URIUpdated", 1);
    assert.fieldEquals(
      "URIUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "value",
      "ipfs://QmUpdated456",
    );
    assert.fieldEquals(
      "URIUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedSinglesNFT1155", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedSinglesNFT1155", 1);
  });
});
