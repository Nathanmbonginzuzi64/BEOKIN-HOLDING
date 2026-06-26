"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  INFOS_STORAGE_KEY,
  type InfoPost,
  type PublishInfoInput,
  loadInfos,
  publishInfo,
  removeInfo,
  updateInfo,
} from "@/lib/infos-storage";

type InfosContextValue = {
  infos: InfoPost[];
  isLoaded: boolean;
  publish: (input: PublishInfoInput) => void;
  update: (id: string, input: PublishInfoInput) => void;
  remove: (id: string) => void;
  refresh: () => void;
};

const InfosContext = createContext<InfosContextValue | null>(null);

export function InfosProvider({ children }: { children: React.ReactNode }) {
  const [infos, setInfos] = useState<InfoPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = useCallback(() => {
    setInfos(loadInfos());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refresh();

    const onStorage = (event: StorageEvent) => {
      if (event.key === INFOS_STORAGE_KEY) {
        refresh();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const publish = useCallback(
    (input: PublishInfoInput) => {
      publishInfo(input);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      removeInfo(id);
      refresh();
    },
    [refresh]
  );

  const update = useCallback(
    (id: string, input: PublishInfoInput) => {
      updateInfo(id, input);
      refresh();
    },
    [refresh]
  );

  const value = useMemo(
    () => ({ infos, isLoaded, publish, update, remove, refresh }),
    [infos, isLoaded, publish, update, remove, refresh]
  );

  return <InfosContext.Provider value={value}>{children}</InfosContext.Provider>;
}

export function useInfos() {
  const context = useContext(InfosContext);
  if (!context) {
    throw new Error("useInfos doit être utilisé dans InfosProvider");
  }
  return context;
}
