"use client";

import React, { useState } from "react";
import Dropzone from "@/components/Dropzone";
import { getCSV } from "@/utils/csv";
import { useToast } from "@/components/Toast";
import Modal from "@/components/Modal";
import DeleteEntireTimeline from "@/modules/Buttons/DeleteEntireTimeline";
import useTimeline from "@/hooks/useTimeline";
import { TimelineData } from "@/validation/timeline.validation";
import DataTable from "@/components/DataTable";
import { income_column } from "@/constants/datatable";

const DropCSV = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();
  const [timelineObj, setTimelineObject] = useState<TimelineData[]>([]);
  const { addBulkTimeline } = useTimeline();

  const toogleModal = () => setIsOpen(!isOpen);

  const handleFileDrop = async (file: File) => {
    try {
      const timelineObject = await getCSV(file);
      console.log(timelineObj);
      setTimelineObject(timelineObject);
      toogleModal();
    } catch (error) {
      console.error(error);
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
          <DeleteEntireTimeline
            onComplete={handleFileUpload}
            text="Override Existing Timeline"
            modalText="Are you Want to Sure to Replace Entire Database?"
          />
          <button onClick={handleFileUpload} className="bg-blue-500">
            Merge Timeline
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default DropCSV;
