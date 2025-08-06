"use client"

import { Progress } from "@/components/ui/progress";
import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProviders({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  const persistorRef = useRef<ReturnType<typeof persistStore>>(undefined);

  const [progress, setProgress] = useState(0);
  const [rehydrated, setRehydrated] = useState(false);

  // Init store + persistor only once
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  // Simulated loading progress (until 90%)
  useEffect(() => {
    if (rehydrated) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [rehydrated]);

  // Complete to 100% on rehydration
  const handleBeforeLift = () => {
    setRehydrated(true);
    setProgress(100);
  };

  const loadingComponent = (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-[60%]">
        <Progress
          value={progress}
          className="h-2 transition-all duration-300 ease-in-out"
        />
        <p className="text-center mt-2 text-sm text-muted-foreground">
          Loading application state...
        </p>
      </div>
    </div>
  );

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={loadingComponent}
        persistor={persistorRef.current!}
        onBeforeLift={handleBeforeLift}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
