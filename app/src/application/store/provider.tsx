"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./index";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
