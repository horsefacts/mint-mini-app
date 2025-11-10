/**
 * CONCEPT 2: Mini Apps Use the Farcaster SDK for Native Capabilities
 *
 * The Farcaster Mini App SDK provides access to native features:
 * - sdk.actions.ready(): Signal the app is loaded (hides splash screen)
 * - sdk.actions.addMiniApp(): Prompt user to add this mini app
 * - sdk.actions.viewProfile(): Open a user's profile
 * - sdk.actions.composeCast(): Open the composer with pre-filled content
 *
 * See usage throughout the components!
 */

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";

import { ArtworkCard } from "./components/app/artworkCard";
import { CollectButton } from "./components/app/collectButton";
import { MintErrorSheet } from "./components/app/mintErrorSheet";
import { MintSuccessSheet } from "./components/app/mintSuccessSheet";
import { mintMetadata } from "./config";

function App() {
  // IMPORTANT: Call sdk.actions.ready() when your app is loaded
  // Without this, users will see an infinite loading screen!
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <ArtworkCard
        imageUrl={mintMetadata.imageUrl}
        name={mintMetadata.name}
        creator={{
          name: mintMetadata.creator.name,
          profileImageUrl: mintMetadata.creator.profileImageUrl,
        }}
        chain={mintMetadata.chain}
        description={mintMetadata.description}
        isMinting={mintMetadata.isMinting}
      >
        <CollectButton
          priceEth={mintMetadata.priceEth}
          isMinting={mintMetadata.isMinting}
          onCollect={() => setShowSuccess(true)}
          onError={setError}
        />
      </ArtworkCard>
      <MintSuccessSheet
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        name={mintMetadata.name}
        imageUrl={mintMetadata.imageUrl}
      />
      <MintErrorSheet isOpen={!!error} onClose={() => setError(undefined)} error={error} />
    </div>
  );
}

export default App;
