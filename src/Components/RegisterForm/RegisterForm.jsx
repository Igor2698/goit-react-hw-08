import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import css from "../RegisterForm/RegisterForm.module.css";
import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .matches(
      /^[a-zA-Zа-яА-Я\s]+$/,
      "Name should contain only letters and spaces"
    )
    .max(25, "Too Long!")
    .required("Required!"),
  email: Yup.string()
    .required("Required!")
    .email("Invalid email format")
    .max(100, "Max is 100 symbols!"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
      "Password should contain only Latin characters and standard symbols"
    )
    .min(6, "Password should be at least 6 characters"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        toast.success(`Welcome, ${data.user.name}`);
      })
      .catch((error) => {
        if (error === 400) {
          toast.error("There is already a user with the same email");
          return;
        }
        toast.error("Something went wrong. Please try to reload the page");
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      {({ dirty, isValid }) => (
        <Form className={css.registerForm}>
          <label htmlFor="name">Username</label>
          <Field
            className={css.registerField}
            type="text"
            name="name"
            id="name"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
          <label htmlFor="email">Email</label>
          <Field
            className={css.registerField}
            type="email"
            name="email"
            id="email"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="span"
          />
          <label htmlFor="password">Password</label>
          <Field
            className={css.registerField}
            type="password"
            name="password"
            id="password"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
          <button disabled={!dirty || !isValid} type="submit">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};
