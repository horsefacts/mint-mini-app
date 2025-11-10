/**
 * Application Configuration
 *
 * This file contains all the configuration for the mini app.
 * Update these values to customize the app for your own NFT collection.
 */

import type { Abi, Address } from "viem";
import { base } from "viem/chains";

/**
 * NFT Metadata Configuration
 * Customize this with your collection's details
 */
export const mintMetadata = {
  // Your NFT collection name
  name: "Mini App Mint Demo",
  // Description shown in the UI
  description:
    "A simple example of an onchain action in a Farcaster mini app. Tap the button below to mint this image.",
  // URL to your NFT image - update to match your Replit deployment
  imageUrl: "https://mint-demo.replit.app/nft.png",
  creator: {
    // Your name or handle
    name: "horsefacts.eth",
    // Your Farcaster ID (FID)
    fid: 3621,
    // Your profile image URL
    profileImageUrl: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/27ebb092-6f26-4397-6027-8c90d909ce00/original",
  },
  chain: "Base",
  // Mint price in ETH
  priceEth: "0.0004",
  startsAt: null,
  endsAt: null,
  isMinting: true,
} as const;

/**
 * Contract Configuration
 * Update this with your NFT contract's address and ABI
 */
export const contractConfig = {
  // Your NFT contract address on Base
  address: "0x8087039152c472Fa74F47398628fF002994056EA" as Address,
  chain: base,
  // Your contract's ABI - only include the functions and events you need
  abi: [
    { inputs: [], name: "MintPaused", type: "error" },
    { inputs: [], name: "InvalidPaymentAmount", type: "error" },
    { inputs: [], name: "SenderNotDirectEOA", type: "error" },
    {
      inputs: [
        { internalType: "uint256", name: "vectorId", type: "uint256" },
        { internalType: "uint48", name: "numTokensToMint", type: "uint48" },
        { internalType: "address", name: "mintRecipient", type: "address" },
      ],
      name: "vectorMint721",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "vectorId",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bool",
          name: "onChainVector",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "numMinted",
          type: "uint256",
        },
      ],
      name: "NumTokenMint",
      type: "event",
    },
  ] as const as Abi,
  // Vector ID for Highlight protocol - specific to your mint setup
  vectorId: 6506,
  // Referrer address for this mint
  referrer: "0x075b108fC0a6426F9dEC9A5c18E87eB577D1346a" as Address,
} as const;

/**
 * Farcaster Mini App Embed Configuration
 * This is used to generate the fc:miniapp meta tag for sharing
 * Update these URLs to match your deployed Replit URL
 */
export const embedConfig = {
  version: "1",
  // Image shown in cast embeds - update to match your Replit deployment
  imageUrl: "https://mint-demo.replit.app/nft.png",
  button: {
    title: "Mint",
    action: {
      type: "launch_miniapp",
      name: "NFT Mint",
      // Your mini app URL - update to match your Replit deployment
      url: "https://mint-demo.replit.app/",
    },
  },
} as const;

/**
 * Main App Configuration
 */
export const config = {
  ...mintMetadata,
  contract: contractConfig,
  embed: embedConfig,
} as const;
