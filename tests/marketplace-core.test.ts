import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AuthorizedCallerAdded } from "../generated/schema"
import { AuthorizedCallerAdded as AuthorizedCallerAddedEvent } from "../generated/MarketplaceCore/MarketplaceCore"
import { handleAuthorizedCallerAdded } from "../src/marketplace-core"
import { createAuthorizedCallerAddedEvent } from "./marketplace-core-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let caller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAuthorizedCallerAddedEvent = createAuthorizedCallerAddedEvent(caller)
    handleAuthorizedCallerAdded(newAuthorizedCallerAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("AuthorizedCallerAdded created and stored", () => {
    assert.entityCount("AuthorizedCallerAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuthorizedCallerAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "caller",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
