// import { useTheme } from '../../Context/useTheme';
import styles from "./NavBar.module.css";
import PropTypes from "prop-types";

import Toggle from "../Toggle/Toggle";
import { useTheme } from "../../Context/ThemeContext";
import { useState } from "react";
import dropDownIcon from "../../assets/dropDown.png";
import { useNavigate } from "react-router-dom";
import dropdownLight from "../../assets/dropdownLight.png";

export default function NavBar({
  dashBoardName,
  setToShare,
  setShowModal,
  handleDashBoardClick,
  sharedDashboards,
}) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div className={`${styles.navBar} ${theme ? styles.dark : styles.light}`}>
      <div className={styles.dashBoardNameAndSettings}>
        <div
          className={`${styles.dropDownContainer} ${
            isOpen ? styles.open : ""
          } `}
          onClick={toggleDropDown}
        >
          <div
            className={`${styles.dropDownHeader} ${
              theme ? styles.dark : styles.light
            } ${isOpen ? styles.open : ""}`}
          >
            <span className={`${styles.dashBoardName} ${styles.headerContent}`}>
              {dashBoardName}
            </span>
            <span
              className={`${styles.icon} ${isOpen ? styles.open : ""} ${
                styles.headerContent
              }`}
            >
              <img
                className={styles.dropDownImage}
                src={theme ? dropDownIcon : dropdownLight}
                alt="dropDown"
              />
            </span>
          </div>

          {isOpen && (
            <div
              className={`${styles.dropDownList} ${
                theme ? styles.dark : styles.light
              } `}
            >
              <ul className={styles.list}>
                {sharedDashboards.map((db) => (
                  <li
                    key={db.dashboardId}
                    onClick={() => handleDashBoardClick(db.dashboardId)}
                  >
                    {db.dashboardName}
                  </li>
                ))}
                <li
                  onClick={() => navigate(`/settings`)}
                  className={`${styles.listItems} ${
                    theme ? styles.dark : styles.light
                  }`}
                >
                  Settings
                </li>
                <li className={`${styles.listItems} ${styles.logOut}`}>
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.theme}>
        <Toggle />
      </div>

      <div className={styles.share}>
        <button
          className={styles.shareButton}
          onClick={() => {
            setToShare(true);
            setShowModal(true);
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  dashBoardName: PropTypes.string,
  setShowModal: PropTypes.func,
  setToShare: PropTypes.func,
  handleDashBoardClick: PropTypes.func,
  sharedDashboards: PropTypes.array,
};
