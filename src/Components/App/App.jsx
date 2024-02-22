import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { lazy, Suspense } from "react";
import { Layout } from "../Layout";
import "./App.css";
import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
import { refreshUser } from "../../redux/auth/authOperations";
import { selectIsRefreshing } from "../../redux/selectors";
import Loader from "../Loader/Loader";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const isToastShownRef = useRef(false);
  useEffect(() => {
    dispatch(refreshUser()).then((data) => {
      if (!isToastShownRef.current && data.type !== "auth/refresh/rejected") {
        toast.success(`Welcome, ${data.payload.name}`);
        isToastShownRef.current = true;
      }
    });
  }, [dispatch]);

  return isRefreshing ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
