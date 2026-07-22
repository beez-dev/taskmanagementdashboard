import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/src/common/utils";

type AppButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

export function AppButton({ className, size = "lg", ...props }: AppButtonProps) {
  return (
    <Button
      size={size}
      className={cn("h-11 text-base font-medium", className)}
      {...props}
    />
  );
}
