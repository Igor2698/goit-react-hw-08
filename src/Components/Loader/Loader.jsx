import { Circles } from "react-loader-spinner";
import css from "../Loader/Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperClass={css.loader}
        visible={true}
      />
    </div>
  );
};

export default Loader;
