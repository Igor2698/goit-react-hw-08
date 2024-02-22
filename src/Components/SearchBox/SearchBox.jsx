import { useDispatch, useSelector } from "react-redux";
import css from "../SearchBox/SearchBox.module.css";
import { selectContacts, selectFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/filter/filterSlice";
import Fuse from "fuse.js";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className={css.searchBoxContainer}>
      <input
        value={filter}
        type="text"
        id="contact"
        name="contact"
        placeholder=""
        className={css.searchBoxInput}
        onChange={(ev) => dispatch(setFilter(ev.target.value))}
      />
      <label htmlFor="contact" className={css.searchBoxText}>
        Find contacts by name or phone
      </label>
    </div>
  );
};

export default SearchBox;
