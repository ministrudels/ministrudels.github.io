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
/**
 * hook to get download time series for a package. x axis is "date"
 */
export const useGetDownloadTimeSeries = (packages: string[]) => {
  const [data, setData] = useState<Record<string, number | string>[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      // Step 1: Fetch the data
      const packageDownloads = (await Promise.all(
        packages.map((p) => cratesIO.api.crates.getDownloads(p))
      )) as unknown as EnhancedDownloadsResult[];

      // Step 2: Transform the to time series data structure for recharts
      const downloadsByDateByPackage: Record<
        string,
        Record<string, number>
      > = {};
      packageDownloads.forEach((data, index) => {
        const packageName = packages[index];
        // Sum all the downloads of the Other versions
        data.meta.extra_downloads.forEach(({ date, downloads }) => {
          // If date is not in the object, add it and initialise all package counts to 0
          if (!downloadsByDateByPackage[date]) {
            downloadsByDateByPackage[date] = {};
            for (const p of packages) {
              downloadsByDateByPackage[date][p] = 0;
            }
          }
          downloadsByDateByPackage[date][packageName] += downloads;
        });

        // Sum all the downloads of the top 5 versions
        data.version_downloads.forEach(({ date, downloads }) => {
          // If date is not in the object, add it and initialise all package counts to 0
          if (!downloadsByDateByPackage[date]) {
            downloadsByDateByPackage[date] = {};
            for (const p of packages) {
              downloadsByDateByPackage[date][p] = 0;
            }
          }
          downloadsByDateByPackage[date][packageName] += downloads;
        });
        const rechartsFormat = Object.entries(downloadsByDateByPackage).map(
          ([date, downloads]) => ({
            date,
            ...downloads,
          })
        );
        setData(rechartsFormat);
        setLoading(false);
      });
    };
    fetchData();
  }, [packages]);

  return { data, isLoading };
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
export const useGetReleases = (
  packages: string[],
  since = moment().subtract(1, "year")
) => {
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
