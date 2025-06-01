import { CratesIO } from "crates.io";
import { useQueries } from "@tanstack/react-query";
import { formatDownloadsResultToTimeSeries, sumByDate } from "./utils";
import moment from "moment";

const cratesIO = new CratesIO();

// Hooks for crates.io API
function useCratesDownloads(crateNames: string[]) {
  return useQueries({
    queries: crateNames.map((crateName) => ({
      queryKey: ["crateDownloads", crateName],
      queryFn: () => cratesIO.api.crates.getDownloads(crateName),
    })),
  });
}

function useCratesVersions(crateNames: string[]) {
  return useQueries({
    queries: crateNames.map((crateName) => ({
      queryKey: ["crateVersions", crateName],
      queryFn: () => cratesIO.api.crates.getVersions(crateName),
    })),
  });
}

// Hooks for data in the visualisation format
export function useCratesDownloadsChart(crateNames: string[]) {
  const cargoApiResults = useCratesDownloads(crateNames);
  const byDate = cargoApiResults.map((result) => sumByDate(result));
  const data = formatDownloadsResultToTimeSeries(crateNames, byDate);

  return data;
}

export function useCratesLatestVersions(crateNames: string[]) {
  const cargoApiResults = useCratesVersions(crateNames);
  const latestVersions = cargoApiResults.reduce(
    (acc, curr, index) => ({
      ...acc,
      [crateNames[index]]: curr.data?.versions[0].num!,
    }),
    {} as Record<string, string>
  );
  return latestVersions;
}

export function useCratesVersionTimeline(
  crateNames: string[],
  since: moment.Moment
) {
  const cargoApiResults = useCratesVersions(crateNames);
  let crateVersionsSince: Record<string, Record<string, number | string>[]> =
    {};
  for (let i = 0; i < cargoApiResults.length; i++) {
    const crate = crateNames[i];
    const tmp = cargoApiResults[i].data?.versions
      .filter(({ created_at }) => moment(created_at).isAfter(since))
      .map(({ created_at, crate }) => ({
        value: i + 1,
        date: moment(created_at).valueOf(),
        package: crate,
      }));

    crateVersionsSince[crate] = tmp || [];
  }
  const datesOfCrateReleases = Object.values(crateVersionsSince).flatMap(
    (releases) => releases
  );
  return datesOfCrateReleases;
}
