import { useEffect, useState } from "react";
import styles from "./Settings.module.css";

import name from "../../assets/userName.png";
import show from "../../assets/show.png";
import lock from "../../assets/lock.png";
import logOut from "../../assets/Logout.png";
import hide from "../../assets/hide.png";
import { modify } from "../../Services/client";
import { handleLogout } from "../../Services/LogOut";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast, Bounce } from "react-toastify";
import PropTypes from "prop-types";

function Settings( {userId}) {
  const navigate = useNavigate();

  const [updateDetails, setUpdateDetails] = useState({
    userName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });


  const [view, setView] = useState({
    email: false,
    oldPassword: false,
    newPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [token, setToken] = useState(null);

  const handleShow = (field) => {
    if (updateDetails[field]) {
      setView((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    }
  };

  const handleOnChange = (e) => {
    setUpdateDetails((prevUpdateDetails) => ({
      ...prevUpdateDetails,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await modify(updateDetails, token);
      if (res.status === 200) {
        const data = await res.json();
        const { message } = data;

        navigate(`/workspace/${userId}/dashboard`, {state: {toastMessage: message}});        

      } else {
        const data = await res.json();
        const { message } = data;
        setErrorMessage(message);
      }
    } catch (err) {
      console.log(err);

     toast.error("An unexpected error occurred", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <div className={styles.settingsPage}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className={styles.settingsArea}>
        <div className={styles.settingsHeading}>
          <h3>Settings</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.formArea}>
          <div className={styles.modifyArea}>
            <div
              className={`${styles.inputFieldContainer} ${styles.userNameBox}`}
            >
              <div className={styles.icon}>
                <img className={styles.iconImg} src={name} alt="user" />
              </div>

              <input
                type="text"
                placeholder="Name"
                name="userName"
                id="userName"
                value={updateDetails.userName}
                onChange={handleOnChange}
              />
            </div>

            <div className={`${styles.inputFieldContainer} ${styles.emailBox}`}>
              <div className={styles.icon}>
                <img className={styles.iconImg} src={lock} alt="icon" />
              </div>

              <input
                type={`${view.email ? "email" : "password"}`}
                placeholder="Update Email"
                id="email"
                name="email"
                value={updateDetails.email}
                onChange={handleOnChange}
              />

              <div className={styles.showButton}>
                <button type="button" onClick={() => handleShow("email")}>
                  <img
                    className={`${view.email ? styles.hide : styles.show}`}
                    src={view.email ? hide : show}
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div
              className={`${styles.inputFieldContainer} ${styles.oldPassowrdBox}`}
            >
              <div className={styles.icon}>
                <img className={styles.iconImg} src={lock} alt="oldPassword" />
              </div>

              <input
                type={`${view.oldPassword ? "text" : "password"}`}
                placeholder="Old Password"
                id="oldPassword"
                name="oldPassword"
                value={updateDetails.oldPassword}
                onChange={handleOnChange}
              />

              <div className={styles.showButton}>
                <button type="button" onClick={() => handleShow("oldPassword")}>
                  <img
                    className={`${
                      view.oldPassword ? styles.hide : styles.show
                    }`}
                    src={view.oldPassword ? hide : show}
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div
              className={`${styles.inputFieldContainer} ${styles.newPasswordBox}`}
            >
              <div className={styles.icon}>
                <img className={styles.iconImg} src={lock} alt="lock" />
              </div>

              <input
                type={`${view.newPassword ? "text" : "password"}`}
                placeholder="New Password"
                id="newPassword"
                name="newPassword"
                value={updateDetails.newPassword}
                onChange={handleOnChange}
              />

              <div className={styles.showButton}>
                <button type="button" onClick={() => handleShow("newPassword")}>
                  <img
                    className={`${
                      view.newPassword ? styles.hide : styles.show
                    }`}
                    src={view.newPassword ? hide : show}
                    alt="show"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.errorContainer}>
            <span>{errorMessage}</span>
          </div>
          <div className={styles.updateButton}>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
      <div className={styles.logOut}>
        <button onClick={() => handleLogout(navigate)}>
          <img src={logOut} alt="logOut" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Settings;

Settings.propTypes = {
  userId: PropTypes.string.isRequired,
}
