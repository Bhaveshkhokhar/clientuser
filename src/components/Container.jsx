import styles from "./Container.module.css";
const Container = ({ children }) => {
  return (
    <>
      <center>
        <div className={`${styles["container"]}`}>{children}</div>
      </center>
    </>
  );
};
export default Container;
