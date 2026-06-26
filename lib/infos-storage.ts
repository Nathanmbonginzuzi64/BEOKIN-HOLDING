export type { InfoPost, PublishInfoInput } from "@/lib/infos-types";
export { normalizeInfoPost, sortInfos } from "@/lib/infos-types";

// Ancien stockage local — conservé uniquement pour migration manuelle éventuelle.
export const INFOS_STORAGE_KEY = "beokin-published-infos";
