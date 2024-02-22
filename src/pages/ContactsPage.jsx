import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../Components/ContactForm/ContactForm";
import ContactList from "../Components/ContactList/ContactList";
import SearchBox from "../Components/SearchBox/SearchBox";
import {
  selectIsChangeModalOpen,
  selectIsDeleteModalOpen,
} from "../redux/selectors";
import Modal from "react-modal";
import { ModalDeleteContent } from "../Components/ModalDeleteContent/ModalDeleteContent.";
import { closeDeleteModal, closeChangeModal } from "../redux/modal/modalSlice";
import { ModalChangeContact } from "../Components/ModalChangeContact/ModalChangeContact";

Modal.setAppElement("#root");

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isChangeModalOpen = useSelector(selectIsChangeModalOpen);

  if (isChangeModalOpen || isDeleteModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <Modal
        onRequestClose={() => dispatch(closeDeleteModal())}
        isOpen={isDeleteModalOpen}
        overlayClassName="Overlay"
        className="Modal"
      >
        <ModalDeleteContent />
      </Modal>
      <Modal
        onRequestClose={() => dispatch(closeChangeModal())}
        isOpen={isChangeModalOpen}
        overlayClassName="Overlay"
        className="Modal"
      >
        <ModalChangeContact />
      </Modal>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
};

export default ContactsPage;
