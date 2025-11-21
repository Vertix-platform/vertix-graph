import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  handleNFTTransferred,
  handlePaymentDistributed,
} from "../src/nft-marketplace";
import {
  createNFTTransferredEvent,
  createPaymentDistributedEvent,
} from "./nft-marketplace-utils";

describe("NFTMarketplace", () => {
  afterEach(() => {
    clearStore();
  });

  test("NFTTransferred - tracks single NFT transfer", () => {
    let event = createNFTTransferredEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      BigInt.fromI32(1),
    );
    handleNFTTransferred(event);

    assert.entityCount("NFTTransferred", 1);
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "nftContract",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "1",
    );
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "from",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "to",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "quantity",
      "1",
    );
  });

  test("NFTTransferred - tracks batch transfer", () => {
    let event = createNFTTransferredEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromI32(5),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      BigInt.fromI32(10),
    );
    handleNFTTransferred(event);

    assert.entityCount("NFTTransferred", 1);
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "tokenId",
      "5",
    );
    assert.fieldEquals(
      "NFTTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "quantity",
      "10",
    );
  });

  test("PaymentDistributedNFT - includes platform and royalty fees", () => {
    let event = createPaymentDistributedEvent(
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromString("950000000000000000"),
      BigInt.fromString("25000000000000000"),
      Address.fromString("0x0000000000000000000000000000000000000004"),
      BigInt.fromString("25000000000000000"),
    );
    handlePaymentDistributed(event);

    assert.entityCount("PaymentDistributedNFT", 1);
    assert.fieldEquals(
      "PaymentDistributedNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "seller",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "PaymentDistributedNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "sellerNet",
      "950000000000000000",
    );
    assert.fieldEquals(
      "PaymentDistributedNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "platformFee",
      "25000000000000000",
    );
    assert.fieldEquals(
      "PaymentDistributedNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "royaltyReceiver",
      "0x0000000000000000000000000000000000000004",
    );
    assert.fieldEquals(
      "PaymentDistributedNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "royaltyAmount",
      "25000000000000000",
    );
  });
});
