import { CratesIO, Download } from "crates.io";
import { useEffect, useState } from "react";

export const cratesIO = new CratesIO();

/**
 * Sum the downloads across versions on the same date.
 */
export const sumDownloadsToDate = (
  data: Download[]
): Pick<Download, "date" | "downloads">[] => {
  const grouped = data.reduce((acc: { [key: string]: number }, curr) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.downloads;
    } else {
      acc[curr.date] = curr.downloads;
    }
    return acc;
  }, {});
  return Object.entries(grouped).map(([date, downloads]) => ({
    date,
    downloads,
  }));
};

/**
 * hook to get download time series for a package. x axis is "date"
 */
export const useGetDownloadTimeSeries = (packages: string[]) => {
  const [data, setData] = useState<Record<string, number | string>[]>([]);
  // const [data, setData] = useState<[]>();
  const [isLoading, setLoading] = useState(true);
  cratesIO.api.crates.getCrates;
  useEffect(() => {
    const fetchData = async () => {
      // Step 1: Fetch the data
      const packageDownloads = await Promise.all(
        packages.map((p) => cratesIO.api.crates.getDownloads(p))
      );

      // Step 2: Transform the to time series data structure for recharts
      const downloadsByDate: Record<
        string,
        Record<string, number | string>
      > = {};

      packageDownloads.forEach((data, index) => {
        const packageName = packages[index];
        data.version_downloads.forEach((entry) => {
          if (!downloadsByDate[entry.date]) {
            downloadsByDate[entry.date] = { date: entry.date };
          }
          downloadsByDate[entry.date][packageName] = entry.downloads;
        });
      });

      const rechartsFormat = Object.values(downloadsByDate).sort((a, b) =>
        a.date.toString().localeCompare(b.date.toString())
      );

      setData(rechartsFormat);
      setLoading(false);
    };
    fetchData();
  }, [packages]);

  return { data, isLoading };
};
