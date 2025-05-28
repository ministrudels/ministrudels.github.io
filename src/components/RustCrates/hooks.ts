import { CratesIO } from "crates.io";
import { useQueries } from "@tanstack/react-query";
import { formatDownloadsResultToTimeSeries, sumByDate } from "./utils";

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

export function useCratesDownloadsChart(crateNames: string[]) {
  const queryResults = useCratesDownloads(crateNames);
  const byDate = queryResults.map((result) => sumByDate(result));
  const data = formatDownloadsResultToTimeSeries(crateNames, byDate);

  return {
    data,
  };
}
