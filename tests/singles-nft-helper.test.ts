import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleSingleNFTMintedAndListed } from "../src/singles-nft-helper";
import { createSingleNFTMintedAndListedEvent } from "./singles-nft-helper-utils";

describe("SinglesNFTHelper", () => {
  afterEach(() => {
    clearStore();
  });

  test("SingleNFTMintedAndListed - stores mint and listing together", () => {
    let event = createSingleNFTMintedAndListedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromI32(1),
      BigInt.fromI32(10),
      BigInt.fromString("1000000000000000000"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
    );
    handleSingleNFTMintedAndListed(event);

    assert.entityCount("SingleNFTMintedAndListed", 1);
    assert.fieldEquals(
      "SingleNFTMintedAndListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "creator",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "SingleNFTMintedAndListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
    assert.fieldEquals(
      "SingleNFTMintedAndListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "listingId",
      "10",
    );
    assert.fieldEquals(
      "SingleNFTMintedAndListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "price",
      "1000000000000000000",
    );
    assert.fieldEquals(
      "SingleNFTMintedAndListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "nftContract",
      "0x0000000000000000000000000000000000000002",
    );
  });
});
