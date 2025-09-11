import styles from "./About.module.css";
import Aboutcontent from "./Aboutcontent";
const About = () => {
  return (
    <>
      <center>
        <div className={`${styles["about"]}`}>
          <Aboutcontent></Aboutcontent>
        </div>
      </center>
    </>
  );
};
export default About;
