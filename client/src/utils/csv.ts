import Papa from "papaparse";
import {
  convertToTimelineData,
  TimelineData as CSVRow,
} from "@/validation/timeline.validation";

const getCSV = (
  file: File,
): Promise<CSVRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      complete: (results) => {
        try {
          const data: CSVRow[] = results.data.map((item) => {
            return convertToTimelineData(item);
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase(),
    });
  });
};

export { getCSV };
