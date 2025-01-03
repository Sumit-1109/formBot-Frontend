import Toggle from "../Toggle/Toggle";
import styles from "./WorkspaceNavBar.module.css";
import close from "../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../Context/ThemeContext";

function WorkspaceNavBar({ formName, setFormName, handleSave }) {
  const {theme} = useTheme();
  const [isFlow, setIsFlow] = useState(true);

  const navigate = useNavigate();

  // const generateFormLink = async () => {
  //   try{
  //     const res = await getFormLink(formId, token);
  //     if(res.status === 200) {
  //       const data = await res.json();
  //       const link = data.link;
  //       console.log(link);
  //       toast.success("Form Link generated");
  //     } else {
  //       toast.error("Failed to generate form link");
  //     }
  //   } catch (err) {
  //     toast.error("Error generating form link: " + err.message);
  //   }
  // }

  return (
    <div className={`${styles.WorkspaceNavBar} ${theme ? styles.dark : styles.light}`}>
      <div className={`${styles.formName} ${theme ? styles.dark : styles.light}`}>
        <input
          type="text"
          placeholder="Enter Form Name"
          className={`${styles.formNameInput} ${theme ? styles.dark : styles.light}`}
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>

      <div className={`${styles.screenSelector} ${theme ? styles.dark : styles.light}`}>
        <button
          className={`${styles.flow} ${styles.screenButton} ${theme ? styles.dark : styles.light} ${
            isFlow ? styles.active : styles.inActive
          }`}
          onClick={() => setIsFlow(true)}
        >
          Flow
        </button>
        <button
          className={`${styles.Response} ${styles.screenButton} ${theme ? styles.dark : styles.light} ${
            isFlow ? styles.inActive : styles.active
          }`}
          onClick={() => setIsFlow(false)}
        >
          Response
        </button>
      </div>

      <div className={styles.rightSide}>
        <div className={`${styles.theme} ${theme ? styles.dark : styles.light}`}>
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
