import { CratesIO, Download, DownloadsResult } from "crates.io";
import moment from "moment";
import { useEffect, useState } from "react";

export const cratesIO = new CratesIO();

/**
 * Type cast to include the extra_downloads field since crates.io does not have it in their types.
 * Extra_downloads field has the downloads for versions older than the latest 5 versions, for a more performant UI.
 * See https://crates.io and view the timeseries of a package for an example.
 */
type EnhancedDownloadsResult = DownloadsResult & {
  meta: {
    extra_downloads: Pick<Download, "date" | "downloads">[];
  };
};

import { UseQueryResult } from "@tanstack/react-query";

// Groups the crates.io downloads by date
export const sumByDate = (
  downloadsResult: UseQueryResult<DownloadsResult, Error>
): Record<string, number> => {
  // This is the actual result which is not typed well by the crates.io librar
  if (downloadsResult.data === undefined) {
    return {};
  }
  const actualResult =
    downloadsResult.data as unknown as EnhancedDownloadsResult;

  const result: Record<string, number> = {};
  // Sum all the downloads of the Other versions
  actualResult.meta.extra_downloads.forEach(({ date, downloads }) => {
    result[date] = (result[date] || 0) + downloads;
  });

  // Sum all the downloads of the top 5 versions
  actualResult.version_downloads.forEach(({ date, downloads }) => {
    result[date] = (result[date] || 0) + downloads;
  });

  return result;
};

// Transforms the downloads by date into a format that can be used by recharts
export const formatDownloadsResultToTimeSeries = (
  packages: string[],
  byDateArr: Record<string, number>[]
): Record<string, string | number>[] => {
  const result: Record<string, Record<string, number>> = {};
  byDateArr.forEach((byDate, index) => {
    const packageName = packages[index];
    Object.keys(byDate).forEach((date) => {
      // If no date in result, add it
      if (!result[date]) {
        result[date] = {};
      }
      const downloads = byDate[date];
      const existingDownloads = result[date][packageName] || 0;
      result[date][packageName] = existingDownloads + downloads;
    });
  });
  return Object.entries(result).map(([date, downloads]) => ({
    date,
    ...downloads,
  }));
};

/**
 * hook to get the latest versions of packages
 */
export const useGetLatestVersions = (packages: string[]) => {
  const [data, setData] = useState<Record<string, string>>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const packageVersions = await Promise.all(
        packages.map((p) => cratesIO.api.crates.getVersions(p))
      );
      const latestVersions = packageVersions.reduce(
        (acc, curr, index) => ({
          ...acc,
          [packages[index]]: curr.versions[0].num,
        }),
        {} as Record<string, string>
      );
      setData(latestVersions);
      setLoading(false);
    };
    fetchData();
  }, [packages]);

  return { data, isLoading };
};

/**
 * hook to get the latest version releases of packages
 */
export const useGetReleases = (packages: string[], since: moment.Moment) => {
  const [data, setData] = useState<
    Record<string, Record<string, number | string>[]>
  >({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const packageReleases = await Promise.all(
        packages.map((p) => cratesIO.api.crates.getVersions(p))
      );

      let result: Record<string, Record<string, number | string>[]> = {};
      for (let i = 0; i < packageReleases.length; i++) {
        const crate = packages[i];
        const tmp = packageReleases[i].versions
          .filter(({ created_at }) => moment(created_at).isAfter(since))
          .map(({ created_at, crate }) => ({
            value: i + 1,
            date: moment(created_at).valueOf(),
            package: crate,
          }));

        result[crate] = tmp;
      }

      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [packages]);

  return { data, isLoading };
};
