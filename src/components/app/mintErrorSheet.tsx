import { AlertIcon } from "../core/icons";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";

interface MintErrorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  error?: string;
}

export function MintErrorSheet({ isOpen, onClose, error }: MintErrorSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-card">
        <DrawerTitle className="sr-only">Mint Error</DrawerTitle>

        <div className="flex flex-col items-center pt-4 pb-8">
          <div className="flex items-center gap-1">
            <AlertIcon className="text-[#E53935]" stroke="#E53935" />
            <span className="text-2xl font-semibold">Error</span>
          </div>
        </div>

        <div className="px-4 mb-6">
          <p className="text-center text-sm mb-4">{error ?? ""}</p>
          <Button className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="pb-4" />
      </DrawerContent>
    </Drawer>
  );
}
