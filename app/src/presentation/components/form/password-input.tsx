import * as React from "react";

import { LabeledInput } from "./labeled-input";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  error?: string;
};

export function PasswordInput(props: PasswordInputProps) {
  return <LabeledInput type="password" {...props} />;
}
