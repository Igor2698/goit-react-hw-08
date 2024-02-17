import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "../ContactForm/ContactForm.module.css";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/operations";

const NewContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  phone: Yup.string()
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
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", phone: "" }}
      onSubmit={handleSubmit}
      validationSchema={NewContactSchema}
    >
      <Form className={css.form}>
        <div className={css.nameContainer}>
          {" "}
          <Field className={css.nameForm} type="text" name="name"></Field>
          <ErrorMessage
            className={css.errorNameMsg}
            name="name"
            component="span"
          />
        </div>
        <div className={css.numberContainer}>
          {" "}
          <Field type="tel" className={css.numberForm} name="phone"></Field>
          <ErrorMessage
            className={css.errorNumberMsg}
            name="phone"
            component="span"
          />
        </div>

        <button className={css.buttonForm} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
