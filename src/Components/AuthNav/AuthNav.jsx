import { NavLink } from "react-router-dom";
import css from "../AuthNav/AuthNav.module.css";
import clsx from "clsx";

export const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.authNavContainer}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log in
      </NavLink>
    </div>
  );
};
