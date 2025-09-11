import Chefcard from "./Chefcard";
import styles from "./Chefs.module.css"
const Chefs = ({ type, chefs }) => {
  return (
    <>
      <div style={{ margin: "10px 0px 0px 10px" }} className={`${styles["cantainer"]}`}>
        {chefs.map(
          (chef,indx) =>
            (chef.type === type || type == "All Chefs") && (
             
                <Chefcard key={indx} chef={chef} />
              
            )
        )}
      </div>
    </>
  );
};
export default Chefs;
