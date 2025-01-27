"use client";

import React, { useState } from "react";
import Dropzone from "@/components/Dropzone";
import { getCSV } from "@/utils/csv";
import { getXLSX } from "@/utils/xlsx";
import { useToast } from "@/components/Toast";
import Modal from "@/components/Modal";
import DeleteEntireTimeline from "@/modules/Buttons/DeleteEntireTimeline";
import useTimeline from "@/hooks/useTimeline";
import { TimelineData } from "@/validation/timeline.validation";
import DataTable from "@/components/DataTable";
import { income_column } from "@/constants/datatable";
import { fromError } from 'zod-validation-error';
import { ZodError } from "zod";

const DropCSV = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();
  const [timelineObj, setTimelineObject] = useState<TimelineData[]>([]);
  const { timelineData, addBulkTimeline } = useTimeline();

  const toogleModal = () => setIsOpen(!isOpen);

  const handleFileDrop = async (file: File) => {
    try {
      const timelineObject = file.name.match(/\.(xlsx|xls)$/i)
        ? await getXLSX(file)
        : await getCSV(file);
      console.log(timelineObj);
      setTimelineObject(timelineObject);
      toogleModal();
    } catch (error) {
      if(error instanceof ZodError) {
        addToast(fromError(error).toString(), "error");
        return;
      }
      addToast("File is Invalid", "error");
    }
  };

  const handleFileUpload = async () => {
    await addBulkTimeline(timelineObj);
    toogleModal();
  };

  return (
    <section>
      <Dropzone onFiledrop={handleFileDrop} />
      <Modal isOpen={isOpen} onClose={toogleModal} className="max-w-lg">
        <h1>Preview Data</h1>
        <DataTable
          columns={income_column}
          data={timelineObj}
          className="max-h-40 md:max-h-80"
        />
        <div className="modal-buttons flex gap-2">
          {timelineData.length !== 0 && (
            <DeleteEntireTimeline
              onComplete={handleFileUpload}
              text="Override Existing Timeline"
              modalText="Are you Want to Sure to Replace Entire Database?"
            />
          )}
          <button onClick={handleFileUpload} className="bg-blue-500">
            Merge Timeline
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default DropCSV;
