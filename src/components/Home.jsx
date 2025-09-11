import Container from "./Container";
import Service from "./Service";
import Banner from "./banner";
import HomeImages from "./homeimages";
const Home = () => {
  return (
    <>
      <center>
        <h3>TIRED OF TAKEAWAY? </h3>
        <h3>GET FOOD PREPARED AT YOUR KITCHEN!</h3>
        <HomeImages />
        <Service />
        <Banner />
      </center>
    </>
  );
};
export default Home;
