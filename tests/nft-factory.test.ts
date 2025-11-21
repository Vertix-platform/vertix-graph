import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleCollection721Created,
  handleCollection1155Created,
  handleCreationFeeUpdated,
} from "../src/nft-factory";
import {
  createCollection721CreatedEvent,
  createCollection1155CreatedEvent,
  createCreationFeeUpdatedEvent,
} from "./nft-factory-utils";

describe("NFTFactory", () => {
  afterEach(() => {
    clearStore();
  });

  test("Collection721Created - stores ERC721 collection details", () => {
    let event = createCollection721CreatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      "Test Collection",
      "TEST",
    );
    handleCollection721Created(event);

    assert.entityCount("Collection721Created", 1);
    assert.fieldEquals(
      "Collection721Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "collection",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "Collection721Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "creator",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "Collection721Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "name",
      "Test Collection",
    );
    assert.fieldEquals(
      "Collection721Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "symbol",
      "TEST",
    );
  });

  test("Collection1155Created - stores ERC1155 collection details", () => {
    let event = createCollection1155CreatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000003"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      "Test Collection 1155",
      "TEST1155",
    );
    handleCollection1155Created(event);

    assert.entityCount("Collection1155Created", 1);
    assert.fieldEquals(
      "Collection1155Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "collection",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "Collection1155Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "creator",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "Collection1155Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "name",
      "Test Collection 1155",
    );
    assert.fieldEquals(
      "Collection1155Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "symbol",
      "TEST1155",
    );
  });

  test("CreationFeeUpdated - tracks fee changes", () => {
    let event = createCreationFeeUpdatedEvent(
      BigInt.fromString("100000000000000000"),
      BigInt.fromString("200000000000000000"),
    );
    handleCreationFeeUpdated(event);

    assert.entityCount("CreationFeeUpdated", 1);
    assert.fieldEquals(
      "CreationFeeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "oldFee",
      "100000000000000000",
    );
    assert.fieldEquals(
      "CreationFeeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newFee",
      "200000000000000000",
    );
  });

  test("Multiple collections - tracks separate entities", () => {
    let event1 = createCollection721CreatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      "Collection A",
      "COLLA",
    );
    handleCollection721Created(event1);

    let event2 = createCollection1155CreatedEvent(
      Address.fromString("0x0000000000000000000000000000000000000003"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      "Collection B",
      "COLLB",
    );
    handleCollection1155Created(event2);

    assert.entityCount("Collection721Created", 1);
    assert.entityCount("Collection1155Created", 1);
  });
});
