import { forwardRef } from "react";
import { cn } from "../../lib/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(({ className, src, alt, ...props }, ref) => (
  <img ref={ref} src={src} alt={alt} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";
