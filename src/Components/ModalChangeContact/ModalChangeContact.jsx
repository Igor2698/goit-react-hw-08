import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { closeChangeModal } from "../../redux/modal/modalSlice";
import { selectContactToChange } from "../../redux/selectors";
import { changeContact } from "../../redux/contacts/contactsOperations";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "../ModalChangeContact/ModalChangeContact.module.css";

export const ModalChangeContact = () => {
  const dispatch = useDispatch();
  const { name, number, id } = useSelector(selectContactToChange);

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
      .max(30, "Max is 30 symbols!"),
  });

  return (
    <Formik
      initialValues={{
        name,
        number,
      }}
      validationSchema={NewContactSchema}
      onSubmit={({ name, number }) => {
        dispatch(
          changeContact({
            name,
            number,
            id: id,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("A contact was sucescessfully changed");
            dispatch(closeChangeModal());
          })
          .catch(() => toast.error("Something went wrong. Please try again"));
      }}
    >
      {({ dirty, isValid, errors }) => {
        return (
          <Form className={css.form}>
            <Field
              className={`${css.field} ${
                errors.name ? css.invalidName : css.validName
              }`}
              id="name"
              type="text"
              name="name"
              placeholder=""
            />
            <ErrorMessage
              className={css.errorNameMsg}
              name="name"
              component="span"
            />
            <label className={css.labelForName} htmlFor="name">
              Change a name
            </label>
            <Field
              className={`${css.field}  ${
                errors.number ? css.invalidNumber : css.validNumber
              }
               
        `}
              type="tel"
              name="number"
              id="number"
              placeholder=""
            />
            <ErrorMessage
              className={css.errorNumberMsg}
              name="number"
              component="span"
            />
            <label className={css.labelForNumber} htmlFor="number">
              Change a number
            </label>
            <button
              className={css.buttonChangeModal}
              type="submit"
              disabled={!dirty || !isValid}
            >
              Change
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
