import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../Components/ContactForm/ContactForm";
import ContactList from "../Components/ContactList/ContactList";
import SearchBox from "../Components/SearchBox/SearchBox";
import {
  selectIsChangeModalOpen,
  selectIsDeleteModalOpen,
} from "../redux/selectors";
import { ModalDeleteContent } from "../Components/ModalDeleteContent/ModalDeleteContent.";
import { closeDeleteModal, closeChangeModal } from "../redux/modal/modalSlice";
import { ModalChangeContact } from "../Components/ModalChangeContact/ModalChangeContact";
import { Modal } from "../Components/Modal";



const ContactsPage = () => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isChangeModalOpen = useSelector(selectIsChangeModalOpen);

  return (
    <>
      {isDeleteModalOpen && (
        <Modal
          onClose={() => dispatch(closeDeleteModal())}
          isOpen={isDeleteModalOpen}
        >
          <ModalDeleteContent />
        </Modal>
      )}

      {isChangeModalOpen && (
        <Modal
          onClose={() => dispatch(closeChangeModal())}
          isOpen={isChangeModalOpen}
        >
          <ModalChangeContact />
        </Modal>
      )}

      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
};

export default ContactsPage;
