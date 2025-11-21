import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Collection721Created,
  Collection1155Created,
  CreationFeeUpdated
} from "../generated/NFTFactory/NFTFactory"

export function createCollection721CreatedEvent(
  collection: Address,
  creator: Address,
  name: string,
  symbol: string
): Collection721Created {
  let collection721CreatedEvent = changetype<Collection721Created>(
    newMockEvent()
  )

  collection721CreatedEvent.parameters = new Array()

  collection721CreatedEvent.parameters.push(
    new ethereum.EventParam("collection", ethereum.Value.fromAddress(collection))
  )
  collection721CreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  collection721CreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  collection721CreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )

  return collection721CreatedEvent
}

export function createCollection1155CreatedEvent(
  collection: Address,
  creator: Address,
  name: string,
  symbol: string
): Collection1155Created {
  let collection1155CreatedEvent = changetype<Collection1155Created>(
    newMockEvent()
  )

  collection1155CreatedEvent.parameters = new Array()

  collection1155CreatedEvent.parameters.push(
    new ethereum.EventParam("collection", ethereum.Value.fromAddress(collection))
  )
  collection1155CreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  collection1155CreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  collection1155CreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )

  return collection1155CreatedEvent
}

export function createCreationFeeUpdatedEvent(
  oldFee: BigInt,
  newFee: BigInt
): CreationFeeUpdated {
  let creationFeeUpdatedEvent = changetype<CreationFeeUpdated>(newMockEvent())

  creationFeeUpdatedEvent.parameters = new Array()

  creationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldFee", ethereum.Value.fromUnsignedBigInt(oldFee))
  )
  creationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return creationFeeUpdatedEvent
}
