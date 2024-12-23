import styles from "./Home.module.css";

import formbot from "../../assets/formbot.png";
import triangle from "../../assets/triangleHomePage.png";
import semiCircle from "../../assets/semiCircleHomePage.png";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <div className={styles.logoImg}>
            <img src={formbot} alt="formBot" />
          </div>
          <h1>FormBot</h1>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => navigate('/signIn')} className={styles.signIn}>Sign in</button>
          <button className={styles.create}>Create a FormBot</button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.heroPage}>
          <div className={styles.triangleHomePage}>
            <img src={triangle} alt="semicircle" />
          </div>

          <div className={styles.homePageCenterContent}>
            <div className={styles.headingText}>
              <h1>Build advanced chatbots visually</h1>
            </div>
            <div className={styles.subHeading}>
              <p>Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.</p>
            </div>
          </div>

          <div className={styles.semiCircleHomePage}>
            <img src={semiCircle} alt="triangle" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
