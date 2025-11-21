import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"

// Helper to create events with different log indices
export function createEventWithLogIndex(logIndex: i32): ethereum.Event {
  let event = newMockEvent()
  event.logIndex = ethereum.Value.fromI32(logIndex).toBigInt()
  return event
}

// Helper to get entity ID for specific log index
export function getEntityId(logIndex: i32): string {
  let hash = Bytes.fromHexString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a")
  let id = hash.concatI32(logIndex)
  return id.toHexString()
}
