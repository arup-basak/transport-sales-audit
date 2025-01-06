import * as XLSX from "xlsx";
import {
  convertToTimelineData,
  TimelineData as CSVRow,
} from "@/validation/timeline.validation";

const getXLSX = (file: File): Promise<CSVRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to array of objects with lowercase headers
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          header: 1,
        });

        if (jsonData.length < 2) {
          reject(new Error("Empty or invalid XLSX file"));
          return;
        }

        // Get headers from first row and convert to lowercase
        const headers = (jsonData[0] as string[]).map((header) =>
          String(header).toLowerCase()
        );

        // Convert data rows to objects with lowercase headers
        const rows = jsonData.slice(1).map((row) => {
          const obj: Record<string, any> = {};
          headers.forEach((header, index) => {
            obj[header] = (row as any[])[index];
          });
          return convertToTimelineData(obj);
        });

        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsArrayBuffer(file);
  });
};

export { getXLSX };
