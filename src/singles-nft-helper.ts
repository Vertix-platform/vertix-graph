import {
  SingleNFTMintedAndListed as SingleNFTMintedAndListedEvent,
} from "../generated/SinglesNFTHelper/SinglesNFTHelper";
import { SingleNFTMintedAndListed } from "../generated/schema";

export function handleSingleNFTMintedAndListed(
  event: SingleNFTMintedAndListedEvent,
): void {
  let entity = new SingleNFTMintedAndListed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.creator = event.params.creator;
  entity.tokenId = event.params.tokenId;
  entity.listingId = event.params.listingId;
  entity.price = event.params.price;
  entity.nftContract = event.params.nftContract;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
