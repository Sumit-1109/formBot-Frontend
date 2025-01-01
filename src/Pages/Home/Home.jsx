import styles from "./Home.module.css";

import formbot from "../../assets/formbot.png";
import triangle from "../../assets/triangleHomePage.png";
import semiCircle from "../../assets/semiCircleHomePage.png";
import { useNavigate } from "react-router-dom";
import homeImage from '../../assets/homeImage.png';

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
        <div className={styles.createFormBotbuttonBar}>
          <button>Create a FormBot for free</button>
        </div>
        <div className={styles.homeImage}>
          <img src={homeImage} alt='FormBot Workflow' />
        </div>
        <div className={styles.footer}>
          <div className={styles.column}>
            <div className={styles.footerHeading}>
            <div className={styles.footerLogoImg}>
            <img src={formbot} alt="formBot" />
          </div>
          <span>FormBot</span>
            </div>
            <ul>
              <li className={styles.lisTItem}>
                Made with by
              </li>
              <li className={styles.lisTItem}>
                @cuvette
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <div className={styles.footerHeading}>
              <span>Product</span>
            </div>
            <ul className={styles.underlined}>
              <li className={styles.lisTItem}>
                Status <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.lisTItem}>
                Documentation <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.lisTItem}>
                Roadmap <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.lisTItem}>
                Pricing <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <div className={styles.footerHeading}>
              <span>Community</span>
            </div>
            <ul className={styles.underlined}>
              <li className={styles.lisTItem}>
                Discord <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.lisTItem}>
                GitHub repository <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.lisTItem}>
                Twitter <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.lisTItem}>
                LinkedIn <div className={styles.linkImage}>
                  <img src="" alt="" />
                </div>
              </li>
              <li className={styles.normal}>
                OSS Friends
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <div className={styles.footerHeading}>
              <span>Company</span>
            </div>
            <ul className={styles.underlined}>
              <li className={styles.lisTItem}>
                About
              </li>
              <li className={styles.lisTItem}>
                Contact
              </li>
              <li className={styles.lisTItem}>
                Terms of Service
              </li>
              <li className={styles.lisTItem}>
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
