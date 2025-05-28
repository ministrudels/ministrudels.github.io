import { CratesIO } from "crates.io";
import { useQueries, useQuery } from "@tanstack/react-query";

const cratesIO = new CratesIO();

export function useCratesDownloads(crateNames: string[]) {
  return useQueries({
    queries: crateNames.map((crateName) => ({
      queryKey: ["crateDownloads", crateName],
      queryFn: () => cratesIO.api.crates.getDownloads(crateName),
      enabled: !!crateName,
    })),
  });
}
