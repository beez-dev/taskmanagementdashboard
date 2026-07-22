import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/src/common/utils";

interface LabeledInputProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  error?: string;
}

export function LabeledInput({ id, label, error, className, ...props }: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={!!error || undefined}
        className={cn("h-11 text-base", className)}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
