import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";
import css from "../LoginForm/LoginForm.module.css";
import * as Yup from "yup";

const logInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required!")
    .email("Invalid email format")
    .max(100, "Max is 100 symbols!"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
      "Password should contain only latin characters and standard symbols"
    )
    .min(6, "Password should be at least 6 characters"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(login(values)).then((data) => {
      if (data.meta.rejectedWithValue) {
        toast.error("Wrong email or password");
        return;
      }
      toast.success(`Welcome, ${data.payload.user.name}`);
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={logInSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.formLogin}>
          <label htmlFor="email">Email</label>
          <Field
            className={css.loginField}
            type="text"
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
            className={css.loginField}
            type="password"
            name="password"
            id="password"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
          <button disabled={!isValid || !dirty} type="submit">
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
};
