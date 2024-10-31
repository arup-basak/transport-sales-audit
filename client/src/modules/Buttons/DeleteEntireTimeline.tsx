"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import useTimeline from "@/hooks/useTimeline";
import { Trash } from "lucide-react";

interface Props {
  text?: string;
  modalText?: string;
  onComplete?: () => void;
}

const DeleteEntireTimeline = ({
  text = "Delete Entire Timeline",
  modalText = "Are you want to Delete Entire Database",
  onComplete,
}: Props) => {
  const { deleteAllTimeline } = useTimeline();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleClick = async () => {
    const resp = await deleteAllTimeline();
    if (resp) {
      onComplete?.();
      toggleModal();
    }
  };
  return (
    <>
      <button className="bg-red-500" onClick={toggleModal}>
        <Trash size={14} />
        {text}
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal} zIndex={70} className="max-w-sm">
        <h1>{modalText}</h1>
        <div className="modal-buttons flex gap-2">
          <button onClick={handleClick} className="bg-red-500">
            Yes
          </button>
          <button onClick={toggleModal} className="bg-blue-500">No</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteEntireTimeline;
