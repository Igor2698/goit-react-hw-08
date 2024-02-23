import { useDispatch } from "react-redux";
import css from "../Contact/Contact.module.css";
import { openChangeModal, openDeleteModal } from "../../redux/modal/modalSlice";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import {
  setContactToChange,
  setIdToDelete,
} from "../../redux/contacts/contactsSlice";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const onDeleteButtonClick = (id) => {
    dispatch(openDeleteModal());
    dispatch(setIdToDelete(id));
  };

  const onChangeButtonClick = (contact) => {
    dispatch(openChangeModal());
    dispatch(setContactToChange(contact));
  };

  return (
    <>
      <span className={css.contactName}>{name}</span>
      <span className={css.contactNumber}>{number}</span>

      <div className={css.buttonsContainer}>
        <button
          className={css.svgButton}
          onClick={() => onDeleteButtonClick(id)}
          type="button"
        >
          <MdDelete className={css.svgIcon} size="24" />
        </button>
      </div>

      <div className={css.buttonsContainer}>
        <button
          className={css.svgButton}
          type="button"
          onClick={() => onChangeButtonClick({ name, number, id })}
        >
          <FaUserEdit className={css.svgIcon} size="24" />
        </button>
      </div>
    </>
  );
};

export default Contact;
