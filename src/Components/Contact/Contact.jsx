import { useDispatch } from "react-redux";
import css from "../Contact/Contact.module.css";
import { deleteContact } from "../../redux/operations";

const Contact = ({ name, phone, id }) => {
  const dispatch = useDispatch();

  return (
    <>
      <span className={css.contactName}>{name}</span>
      <span className={css.contactNumber}>{phone}</span>
      <button
        className={css.contactButton}
        onClick={() => dispatch(deleteContact(id))}
        type="button"
      >
        Delete
      </button>
    </>
  );
};

export default Contact;
