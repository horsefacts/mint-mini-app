import { sdk } from "@farcaster/miniapp-sdk";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { contractConfig, mintMetadata } from "../../config";
import { isUserRejectionError } from "../../lib/errors";
import { AnimatedBorder } from "../ui/animatedBorder";
import { Button } from "../ui/button";

interface CollectButtonProps {
  timestamp?: number;
  priceEth: string;
  onCollect: () => void;
  onError: (error: string | undefined) => void;
  isMinting: boolean;
}

export function CollectButton({
  priceEth,
  onCollect,
  onError,
  isMinting,
}: CollectButtonProps) {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}`>();
  const [isLoadingTxData, setIsLoadingTxData] = useState(false);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const isPending = isLoadingTxData || isWriting || isConfirming;

  // Call onCollect when transaction is confirmed
  useEffect(() => {
    if (isSuccess && hash) {
      onCollect();
      setHash(undefined);
    }
  }, [isSuccess, hash, onCollect]);

  const handleClick = async () => {
    try {
      // If minting is closed, prompt to add the mini app for notifications
      if (!isMinting) {
        sdk.actions.addMiniApp();
        return;
      }

      // Reset state for new transaction
      setHash(undefined);

      // Step 1: Connect wallet if not connected
      if (!isConnected || !address) {
        connect({ connector: farcasterMiniApp() });
        return;
      }

      // Step 2: Prepare and send the mint transaction
      setIsLoadingTxData(true);

      const hash = await writeContractAsync({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: "vectorMint721",
        args: [BigInt(contractConfig.vectorId), 1n, address],
        value: parseEther(mintMetadata.priceEth),
        chainId: contractConfig.chain.id,
      });

      // Step 3: Wait for transaction confirmation (handled by useEffect)
      setHash(hash);
    } catch (error) {
      if (!isUserRejectionError(error)) {
        onError(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      }
      setHash(undefined);
    } finally {
      setIsLoadingTxData(false);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="pb-4 px-4 pt-2">
        {isMinting && (
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="text-muted text-sm">Cost</span>
            <span className="text-foreground font-medium">{priceEth} ETH</span>
          </div>
        )}

        {isPending ? (
          <AnimatedBorder>
            <Button
              className="w-full relative bg-[var(--color-active)] text-[var(--color-active-foreground)]"
              disabled
            >
              {isMinting ? "Collecting..." : "Adding..."}
            </Button>
          </AnimatedBorder>
        ) : (
          <Button className="w-full" onClick={handleClick} disabled={isPending}>
            {!isConnected && isMinting
              ? "Connect"
              : isMinting
                ? "Collect"
                : "Add Mini App"}
          </Button>
        )}
      </div>
    </div>
  );
}
