import {
  NFTTransferred as NFTTransferredEvent,
  PaymentDistributed as PaymentDistributedEvent,
} from "../generated/NFTMarketplace/NFTMarketplace";
import { NFTTransferred, PaymentDistributedNFT } from "../generated/schema";

export function handleNFTTransferred(event: NFTTransferredEvent): void {
  let entity = new NFTTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.nftContract = event.params.nftContract;
  entity.tokenId = event.params.tokenId;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.quantity = event.params.quantity;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaymentDistributed(event: PaymentDistributedEvent): void {
  let entity = new PaymentDistributedNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.seller = event.params.seller;
  entity.sellerNet = event.params.sellerNet;
  entity.platformFee = event.params.platformFee;
  entity.royaltyReceiver = event.params.royaltyReceiver;
  entity.royaltyAmount = event.params.royaltyAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
