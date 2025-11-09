/**
 * CONCEPT 3: Native Ethereum Wallet Connection
 *
 * Mini apps automatically connect to the user's Ethereum wallet
 * using the farcasterMiniApp connector. No wallet selection UI needed!
 *
 * The user's wallet is already available in the Farcaster app,
 * so we can use wagmi hooks like:
 * - useAccount(): Get the connected address
 * - useConnect(): Trigger the connection
 * - useWriteContract(): Send transactions
 *
 * This makes onchain actions seamless within the social context.
 */

import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig({
  chains: [base],
  connectors: [farcasterMiniApp()],
  transports: {
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
