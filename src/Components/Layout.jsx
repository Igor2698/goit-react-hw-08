import { Outlet } from "react-router-dom";
import { AppBar } from "./AppBar/AppBar";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";
import { useSelector } from "react-redux";
import {
  selectAuthIsLoading,
  selectIsContactsLoading,
} from "../redux/selectors";

export const Layout = () => {
  const isAuthLoading = useSelector(selectAuthIsLoading);
  const isContactsLoading = useSelector(selectIsContactsLoading);
  return (
    <>
      <Toaster />

      <AppBar />
      {(isAuthLoading || isContactsLoading) && <Loader />}

      <Outlet />
    </>
  );
};
