import { useEffect } from "react";
import ReactModal from "react-modal";

export const Modal = ({ children, isOpen, onClose }) => {
  ReactModal.setAppElement("#root");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ReactModal
      onRequestClose={onClose}
      isOpen={isOpen}
      overlayClassName="Overlay"
      className="Modal"
    >
      {children}
    </ReactModal>
  );
};
