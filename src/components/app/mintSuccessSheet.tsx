import { sdk } from "@farcaster/miniapp-sdk";
import { useCallback } from "react";

import { embedConfig } from "../../config";
import { CheckCircleIcon } from "../core/icons";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";

interface MintSuccessSheetProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  imageUrl: string;
}

export function MintSuccessSheet({ isOpen, onClose, name, imageUrl }: MintSuccessSheetProps) {
  const handleShare = useCallback(() => {
    sdk.actions.composeCast({
      text: `I just minted ${name}!`,
      embeds: [embedConfig.button.action.url],
    });
  }, [name]);

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-card">
        <DrawerTitle className="sr-only">Collection Successful</DrawerTitle>

        <div className="flex flex-col items-center pt-4 pb-8">
          <div className="flex items-center gap-1">
            <CheckCircleIcon className="text-[#43B748]" stroke="#43B748" strokeWidth={2} />
            <span className="text-2xl font-semibold">Collected</span>
          </div>
        </div>

        <div className="max-w-[272px] mx-auto w-full">
          <div className="bg-mat rounded-xl p-2 shadow mb-4">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden">
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mb-8 px-4">
          <Button className="w-full" onClick={handleShare}>
            Share
          </Button>
        </div>

        <div className="pb-4" />
      </DrawerContent>
    </Drawer>
  );
}
