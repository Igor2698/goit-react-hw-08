import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/contactsOperations";
import { selectVisibleContacts } from "../../redux/selectors";

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.contactsList}>
      {visibleContacts.map(({ id, number, name }) => (
        <li className={css.contactsItem} key={id}>
          <Contact name={name} number={number} id={id} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
