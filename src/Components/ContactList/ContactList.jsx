import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import { selectVisibleContacts } from "../../redux/selectors";
import { useSelector } from "react-redux";

const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <ul className={css.contactsList}>
      {visibleContacts.map(({ name, id, phone }) => (
        <li className={css.contactsItem} key={id}>
          <Contact name={name} phone={phone} id={id} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
