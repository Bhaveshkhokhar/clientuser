import styles from "./Aboutcontent.module.css";
const Aboutcontent = () => {
  return (
    <>
      <div className="container py-4">
        <h1 className="text-center mb-4">About Us</h1>
        <div className="row align-items-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <img
              src="https://serverofchefbooking.onrender.com/about.jpg"
              className="img-fluid"
              alt="About"
              style={{ borderRadius: "10px", width: "100%", height: "auto" }}
            />
          </div>
          <div className="col-12 col-md-8 text-start">
            <h5>Tired of Eating Outside Every Day? We’ve Got You Covered!</h5>
            <p>
              Living in a Tier 1 city often means a fast-paced lifestyle — and
              for many students, working professionals, and bachelors, that also
              means depending on outside food that’s often unhealthy,
              repetitive, or just doesn’t feel like home. We understand how hard
              it can be to find meals that are both nutritious and comforting
              when you're away from home.
            </p>
            <p>
              That’s where ChefWale comes in — your personalized chef booking
              platform that brings the magic of home-cooked meals right to your
              kitchen. With our flexible and affordable subscription plans, you
              can now hire skilled, verified, and experienced home chefs who
              will cook meals tailored to your taste, dietary preferences, and
              schedule.
            </p>
            <p>
              Our chefs are trained to follow high standards of hygiene and food
              safety. From simple vegetarian dishes to elaborate regional
              cuisines, they bring the flavors of home wherever you are. Whether
              you want daily meals, weekend specials, or festive treats,
              ChefWale connects you with the perfect culinary expert.
            </p>
            <h6>
              Why settle for food that fills your stomach but not your soul?
            </h6>
            <p>
              Choose ChefWale and bring health, freshness, and that “ghar ka
              khana” feeling back into your life.
            </p>
          </div>
        </div>
        <div className="row">
          <h3 className="text-start my-4">Why Choose Us</h3>
        </div>
        <div className="row text-start">
          <div
            className={`col-12 col-md border ${styles["hover-box"]} mb-3 mb-md-0`}
          >
            <h5>SAFETY:</h5>
            <p>
              Your safety is our top priority. All our chefs follow strict
              hygiene protocols and are thoroughly background-verified for your
              peace of mind.
            </p>
          </div>
          <div
            className={`col-12 col-md border ${styles["hover-box"]} mb-3 mb-md-0`}
          >
            <h5>QUALITY:</h5>
            <p>
              We never compromise on quality. Our chefs use fresh ingredients
              and follow the highest culinary standards to deliver delicious,
              home-style meals every time.
            </p>
          </div>
          <div className={`col-12 col-md border ${styles["hover-box"]}`}>
            <h5>CUSTOMIZATION:</h5>
            <p>
              Meals made just the way you like them. With ChefWale, you can
              personalize dishes to suit your taste, dietary needs, and
              lifestyle preferences.
            </p>
          </div>
        </div>
        <h3 className="text-start my-4">Your Vision And Mission</h3>
        <p className="text-start my-3">
          To revolutionize home dining by making fresh, healthy, and
          personalized meals accessible to everyone through trusted,
          professional chefs.
        </p>
        <p className="text-start mb-4">
          At ChefWale, our mission is to connect households with skilled chefs
          who bring the joy of home-cooked food to every table. We are committed
          to quality, safety, and customization, ensuring every meal is prepared
          with care and passion.
        </p>
      </div>
    </>
  );
};
export default Aboutcontent;
