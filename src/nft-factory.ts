import {
  Collection721Created as Collection721CreatedEvent,
  Collection1155Created as Collection1155CreatedEvent,
  CreationFeeUpdated as CreationFeeUpdatedEvent,
} from "../generated/NFTFactory/NFTFactory";
import {
  Collection721Created,
  Collection1155Created,
  CreationFeeUpdated,
} from "../generated/schema";

export function handleCollection721Created(
  event: Collection721CreatedEvent,
): void {
  let entity = new Collection721Created(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.collection = event.params.collection;
  entity.creator = event.params.creator;
  entity.name = event.params.name;
  entity.symbol = event.params.symbol;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollection1155Created(
  event: Collection1155CreatedEvent,
): void {
  let entity = new Collection1155Created(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.collection = event.params.collection;
  entity.creator = event.params.creator;
  entity.name = event.params.name;
  entity.symbol = event.params.symbol;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCreationFeeUpdated(event: CreationFeeUpdatedEvent): void {
  let entity = new CreationFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.oldFee = event.params.oldFee;
  entity.newFee = event.params.newFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
