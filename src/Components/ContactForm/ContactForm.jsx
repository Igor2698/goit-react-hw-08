import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "../ContactForm/ContactForm.module.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/contactsOperations";
import { Button } from "@mui/material";

const NewContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  number: Yup.string()
    .required("Required!")
    .matches(
      /^\+380[0-9]+$/,
      "Phone must start with '+380' and contain only numbers"
    )
    .max(13, "Max is 13 symbols!"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values)).then(() => {
      toast.success(
        `Hoola! A Contact named ${values.name}  was succesfully added`
      );
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={NewContactSchema}
    >
      {({ dirty, errors }) => (
        <Form className={css.form}>
          <label htmlFor="name">Name</label>
          <Field
            className={css.nameForm}
            id="name"
            type="text"
            name="name"
          ></Field>
          <ErrorMessage
            className={css.errorNameMsg}
            name="name"
            component="span"
          />
          <label htmlFor="number">Number</label>
          <Field
            type="tel"
            className={css.numberForm}
            name="number"
            id="number"
          ></Field>
          <ErrorMessage
            className={css.errorNumberMsg}
            name="number"
            component="span"
          />
          <button
            disabled={!dirty || errors.name || errors.number}
            className={css.buttonForm}
            type="submit"
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
