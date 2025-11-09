# Farcaster Mini App - NFT Mint Demo

A simple Farcaster mini app that demonstrates minting an NFT. This project is designed as a teaching example for building mini apps on Farcaster.

## What You'll Learn

This app demonstrates the **5 core concepts** of Farcaster mini apps:

### 1. Mini Apps are Standard Web Apps
Built with familiar technologies: React, TypeScript, Vite, and CSS. No special framework required! See `src/main.tsx` for the standard React setup.

### 2. SDK Integration for Native Capabilities
The Farcaster Mini App SDK (`@farcaster/miniapp-sdk`) provides access to native features:
- `sdk.actions.ready()` - Signal the app is loaded (see `src/App.tsx`)
- `sdk.actions.addMiniApp()` - Prompt user to add the mini app
- `sdk.actions.viewProfile()` - Open a user's profile
- `sdk.actions.composeCast()` - Open composer with pre-filled content

### 3. Native Ethereum Wallet Connection
Using wagmi with the `farcasterMiniApp` connector, mini apps automatically connect to the user's Ethereum wallet—no wallet selection UI needed! See `src/wagmi.ts` for the configuration and `src/components/app/collectButton.tsx` for usage.

### 4. Embeds via Meta Tags
Mini apps are surfaced in the social feed through HTML meta tags. This project uses a Vite plugin (`vite.config.ts`) to automatically generate the `fc:miniapp` meta tag from your configuration at build time. See the comments in `index.html` for details.

### 5. Discovery via Manifest
Mini apps publish a JSON manifest file at `public/.well-known/farcaster.json` that provides metadata and enables client indexing. This includes app name, icon, URLs, and domain verification.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **wagmi** - Ethereum interactions
- **Tailwind CSS** - Styling
- **Farcaster Mini App SDK** - Native capabilities

## Getting Started

### Prerequisites
- Node.js 22.11.0+ (LTS recommended)
- pnpm

### Installation

1. Clone this repository
2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser to the URL shown in the terminal

## Customization

To customize this mini app for your own NFT collection:

### 1. Update Configuration (`src/config.ts`)

**NFT Metadata:**
- `name` - Your collection name
- `description` - Collection description
- `imageUrl` - NFT image URL
- `creator` - Creator details (name, FID, profile image)
- `priceEth` - Mint price in ETH

**Contract Configuration:**
- `address` - Your NFT contract address
- `abi` - Contract ABI
- Update function name and arguments if different from the example

**Embed Configuration:**
- `imageUrl` - Image shown in cast embeds
- `button.title` - Button text
- `button.action.name` - Mini app name
- `button.action.url` - Your deployed URL (TODO: Update for your Replit deployment!)

### 2. Update Manifest (`public/.well-known/farcaster.json`)

**TODO before deploying:**
- Update all URLs to match your deployed Replit URL
- Regenerate the `accountAssociation` signature for your domain using Farcaster dev tools

### 3. Update Contract Interaction (`src/components/app/collectButton.tsx`)

If your NFT contract uses a different mint function:
- Update the `functionName` in the `writeContractAsync` call
- Update the `args` array to match your contract's parameters
- Update the ABI in `src/config.ts`

## Build & Deploy

### Build for Production

```bash
pnpm build
```

The build output will be in the `dist` directory. You can preview it with:

```bash
pnpm preview
```

### Deploy to Replit

This project is designed to work on Replit:

1. Fork this repository on Replit
2. Update all URLs in `src/config.ts` to match your Replit deployment URL
3. Update the manifest file `public/.well-known/farcaster.json` with your deployment URL
4. Generate a new `accountAssociation` signature using Farcaster dev tools
5. Run `pnpm build` to build the production version
6. Deploy using Replit's deployment features

**Important:** Development tunnels (like Replit preview URLs) may have limitations. For full functionality including search indexing and the `addMiniApp()` action, deploy to your production Replit URL.

## How It Works

### Meta Tag Generation

The `fc:miniapp` meta tag is **not** manually added to `index.html`. Instead:

1. Configuration is defined in `src/config.ts` (the `embedConfig` object)
2. A Vite plugin (`fcMiniAppMeta()` in `vite.config.ts`) reads this config
3. At build time, the plugin injects the meta tag into the HTML `<head>`
4. This keeps the embed config in sync with your app configuration

Check the comments in `index.html` to see where the tag gets injected!

### The Mint Flow

1. **Connect**: User clicks "Connect" → wagmi connects to their Farcaster wallet
2. **Sign**: User clicks "Collect" → transaction is prepared and sent to their wallet
3. **Confirm**: User approves in their wallet → transaction is sent to the blockchain
4. **Wait**: App waits for transaction confirmation
5. **Success**: Success sheet appears → user can share their mint

See `src/components/app/collectButton.tsx` for the complete implementation.

## Code Structure

```
src/
├── components/
│   ├── app/              # App-specific components
│   │   ├── artworkCard.tsx       # NFT display with creator info
│   │   ├── collectButton.tsx     # Mint button with wallet connection
│   │   ├── mintSuccessSheet.tsx  # Success modal
│   │   └── mintErrorSheet.tsx    # Error modal
│   ├── ui/               # Reusable UI primitives
│   └── core/             # Icons and utilities
├── lib/                  # Utility functions
├── App.tsx               # Main app component (SDK initialization)
├── main.tsx              # Entry point (React + providers)
├── wagmi.ts              # Ethereum wallet configuration
├── config.ts             # All app configuration
└── index.css             # Global styles

public/
└── .well-known/
    └── farcaster.json    # Mini app manifest
```

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Lint code with Biome

## Learn More

- [Farcaster Mini Apps Documentation](https://docs.farcaster.xyz/developers/frames/v2)
- [Mini App SDK Reference](https://github.com/farcasterxyz/miniapp-sdk)
- [wagmi Documentation](https://wagmi.sh)
- [Vite Documentation](https://vitejs.dev)

## License

MIT
