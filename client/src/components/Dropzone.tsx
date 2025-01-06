import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface Props {
    onFiledrop: (file: File) => void;
}

const Dropzone = ({onFiledrop}: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFiledrop(file);
    }

  }, [onFiledrop]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        {...getRootProps()}
        className={twMerge(
          "relative rounded-lg border-2 border-dashed p-6 sm:p-8",
          "flex flex-col items-center justify-center text-center",
          "cursor-pointer transition-colors",
          isDragActive && "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/50",
          isDragReject && "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950/50",
          !isDragActive && !isDragReject && "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
        )}
      >
        <input {...getInputProps()} />

        <div className="mb-4">
          {isDragReject ? (
            <X className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 dark:text-red-400" />
          ) : isDragActive ? (
            <FileSpreadsheet className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 dark:text-blue-400" />
          ) : (
            <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {isDragReject ? (
              fileRejections.length > 1 ? (
                "Please upload only one file"
              ) : (
                "Only CSV or Excel files are accepted"
              )
            ) : isDragActive ? (
              "Drop your CSV file here"
            ) : (
              <>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Click to upload
                </span>{" "}
                or drag and drop your CSV file
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            CSV files only, up to 10MB
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dropzone;
