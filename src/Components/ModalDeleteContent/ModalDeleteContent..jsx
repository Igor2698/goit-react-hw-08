import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/contactsOperations";
import { selectIdToDelete } from "../../redux/selectors";
import { closeDeleteModal } from "../../redux/modal/modalSlice";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import css from "../ModalDeleteContent/ModalDeleteContent.module.css";

export const ModalDeleteContent = () => {
  const dispatch = useDispatch();
  const idToDelete = useSelector(selectIdToDelete);

  function handleDelete() {
    dispatch(deleteContact(idToDelete)).then(() =>
      toast.success("A contact was successfully deleted")
    );
    dispatch(closeDeleteModal());
  }

  return (
    <div className={css.deleteModalContainer}>
      <p className={css.deleteQuestion}>Delete contact?</p>
      <button className={css.buttonDeleteContact} onClick={handleDelete}>
        <MdDelete size="32" className={css.deleteIcon} />
      </button>

      <button
        className={css.saveButton}
        color="success"
        label="Save contact"
        onClick={() => dispatch(closeDeleteModal())}
      >
        Save
      </button>
    </div>
  );
};
