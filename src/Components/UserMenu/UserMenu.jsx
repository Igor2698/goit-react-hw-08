import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { logout } from "../../redux/auth/authOperations";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { IoExitOutline } from "react-icons/io5";

import css from "../UserMenu/UserMenu.module.css";
import toast from "react-hot-toast";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentHours = new Date().getHours();
  const partOfDay =
    currentHours > 5 && currentHours < 12
      ? "morning"
      : currentHours >= 12 && currentHours <= 17
      ? "day"
      : currentHours > 17 && currentHours <= 23
      ? "evening"
      : "night";

  return (
    <div className={css.userMenuContainer}>
      <p>
        Good {partOfDay}, {user.name}
      </p>
      <Avatar src="" sx={{ bgcolor: deepPurple[300] }}>
        {user.name.charAt(0)}
      </Avatar>
      <button
        type="button"
        className={css.logoutButton}
        onClick={() =>
          dispatch(logout()).then(() =>
            toast.success("You have successfully logged out")
          )
        }
      >
        Log out
        <IoExitOutline className={css.logoutSvg} size="26" />
      </button>
    </div>
  );
};
