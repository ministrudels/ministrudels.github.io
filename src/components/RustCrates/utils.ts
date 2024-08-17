import { CratesIO, Download } from "crates.io";
import { useEffect, useState } from "react";

const cratesIO = new CratesIO();

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
 * hook to get download time series for a package
 */
export const useGetDownloadTimeSeries = (packageName: string) => {
  const [data, setData] = useState<Pick<Download, "date" | "downloads">[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    cratesIO.api.crates.getDownloads(packageName).then((data) => {
      setData(sumDownloadsToDate(data.version_downloads));
      setLoading(false);
    });
  }, [packageName]);

  return { data, isLoading };
};
