import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  handleVerificationAdded,
  handleVerificationRevoked,
  handleVerifierAdded,
  handlePaused,
  handleUnpaused,
} from "../src/verification-registry";
import {
  createVerificationAddedEvent,
  createVerificationRevokedEvent,
  createVerifierAddedEvent,
  createPausedEvent,
  createUnpausedEvent,
} from "./verification-registry-utils";

describe("VerificationRegistry", () => {
  afterEach(() => {
    clearStore();
  });

  test("VerificationAdded - stores complete verification details", () => {
    let proofHash = Bytes.fromHexString(
      "0x1234567890123456789012345678901234567890123456789012345678901234",
    );
    let event = createVerificationAddedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      1,
      proofHash,
      BigInt.fromI32(1640086400),
      "ipfs://QmTest123",
    );
    handleVerificationAdded(event);

    assert.entityCount("VerificationAdded", 1);
    assert.fieldEquals(
      "VerificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "verificationId",
      "1",
    );
    assert.fieldEquals(
      "VerificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "owner",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "VerificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "verifier",
      "0x0000000000000000000000000000000000000002",
    );
    assert.fieldEquals(
      "VerificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "assetType",
      "1",
    );
    assert.fieldEquals(
      "VerificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "expiresAt",
      "1640086400",
    );
    assert.fieldEquals(
      "VerificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "metadataURI",
      "ipfs://QmTest123",
    );
  });

  test("VerificationRevoked - includes revocation reason", () => {
    let event = createVerificationRevokedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000003"),
      "Fraudulent verification",
    );
    handleVerificationRevoked(event);

    assert.entityCount("VerificationRevoked", 1);
    assert.fieldEquals(
      "VerificationRevoked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "verificationId",
      "1",
    );
    assert.fieldEquals(
      "VerificationRevoked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "owner",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "VerificationRevoked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "revokedBy",
      "0x0000000000000000000000000000000000000003",
    );
    assert.fieldEquals(
      "VerificationRevoked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "reason",
      "Fraudulent verification",
    );
  });

  test("VerifierAdded - tracks new verifiers", () => {
    let event = createVerifierAddedEvent(
      Address.fromString("0x0000000000000000000000000000000000000004"),
      Address.fromString("0x0000000000000000000000000000000000000005"),
    );
    handleVerifierAdded(event);

    assert.entityCount("VerifierAdded", 1);
    assert.fieldEquals(
      "VerifierAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "verifier",
      "0x0000000000000000000000000000000000000004",
    );
    assert.fieldEquals(
      "VerifierAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "addedBy",
      "0x0000000000000000000000000000000000000005",
    );
  });

  test("Paused and Unpaused - tracks contract state", () => {
    let pausedEvent = createPausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handlePaused(pausedEvent);
    assert.entityCount("PausedVerificationRegistry", 1);

    let unpausedEvent = createUnpausedEvent(
      Address.fromString("0x0000000000000000000000000000000000000006"),
    );
    handleUnpaused(unpausedEvent);
    assert.entityCount("UnpausedVerificationRegistry", 1);
  });
});
