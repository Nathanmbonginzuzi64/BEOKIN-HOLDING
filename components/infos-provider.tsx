"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { InfoPost, PublishInfoInput } from "@/lib/infos-types";
import {
  createInfoPost,
  deleteInfoPost,
  fetchPublishedInfos,
  updateInfoPost,
} from "@/lib/infos-api-client";

type InfosContextValue = {
  infos: InfoPost[];
  isLoaded: boolean;
  publish: (input: PublishInfoInput) => Promise<void>;
  update: (id: string, input: PublishInfoInput) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const InfosContext = createContext<InfosContextValue | null>(null);

export function InfosProvider({ children }: { children: React.ReactNode }) {
  const [infos, setInfos] = useState<InfoPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = (await fetchPublishedInfos()) as InfoPost[];
      setInfos(Array.isArray(data) ? data : []);
    } catch {
      setInfos([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const publish = useCallback(
    async (input: PublishInfoInput) => {
      await createInfoPost(input);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteInfoPost(id);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, input: PublishInfoInput) => {
      await updateInfoPost(id, input);
      await refresh();
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
