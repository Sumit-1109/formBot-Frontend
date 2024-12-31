import Toggle from "../Toggle/Toggle";
import styles from "./WorkspaceNavBar.module.css";
import close from "../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

function WorkspaceNavBar({ formName, setFormName, handleSave }) {
  const [isFlow, setIsFlow] = useState(true);

  const navigate = useNavigate();

  return (
    <div className={styles.WorkspaceNavBar}>
      <div className={styles.formName}>
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>

      <div className={styles.screenSelector}>
        <button
          className={`${styles.flow} ${
            isFlow ? styles.active : styles.inActive
          }`}
          onClick={() => setIsFlow(true)}
        >
          Flow
        </button>
        <button
          className={`${styles.Response} ${
            isFlow ? styles.inActive : styles.active
          }`}
          onClick={() => setIsFlow(false)}
        >
          Response
        </button>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.theme}>
          <Toggle />
        </div>

        <div className={styles.action}>
          <button className={styles.share}>Share</button>
          <button className={styles.save} onClick={handleSave}>Save</button>
        </div>

        <button className={styles.close} onClick={() => navigate(-1)}>
          <img src={close} alt="close" />
        </button>
      </div>
    </div>
  );
}

export default WorkspaceNavBar;

WorkspaceNavBar.propTypes = {
    formName: PropTypes.string,
    setFormName: PropTypes.func,
    handleSave: PropTypes.func,
}
