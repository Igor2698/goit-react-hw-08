import { useSelector } from "react-redux";
import { AuthNav } from "../AuthNav/AuthNav";

import { selectIsLoggedIn } from "../../redux/selectors";
import { UserMenu } from "../UserMenu/UserMenu";
import css from "../AppBar/AppBar.module.css";
import { Divider, Box } from "@mui/material";

export const AppBar = () => {
  const isLoggedin = useSelector(selectIsLoggedIn);
  return (
    <>
      <header className={css.header}>
        {!isLoggedin ? <AuthNav /> : <UserMenu />}
      </header>
      <Divider
        sx={{ backgroundColor: "white", height: "1px" }}
        orientation="vertical"
      />
    </>
  );
};
