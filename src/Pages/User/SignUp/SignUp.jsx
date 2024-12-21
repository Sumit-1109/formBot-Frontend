import styles from "./signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import triangle from "../../../assets/triangle.png";
import EclipseRight from "../../../assets/EclipseRight.png";
import EclipseBottom from "../../../assets/EclipseBottom.png";
import { useState } from "react";
import { signUp } from "../../../Services/client";

function SignUp() {
  const navigate = useNavigate();

  const [signUpDetails, setSignUpDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signUp(signUpDetails);

      if (res.status === 201) {
        const data = await res.json();
        const successMessage = data.message;

        setSignUpDetails({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/signIn", {state: {toastMessage: successMessage}});

      } else if (res.status === 400 || res.status === 500) {
        const data = await res.json();
        const { field, message } = data;
        setFieldErrors((prev) => ({
          ...prev,
          [field]: message,
        }));
      }
    } catch (err) {
      console.error(err);
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

  const handleChange = (e) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.id] : e.target.value
    });

    setFieldErrors({
      ...fieldErrors,
      [e.target.id] : '',
      general: '',
    });
  }

  return (
    <div className={styles.signUpPage}>
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

      <img className={styles.triangle} src={triangle} alt="triangle" />
      <img
        className={styles.EclipseRight}
        src={EclipseRight}
        alt="Eclipse Right"
      />
      <img
        className={styles.EclipseBottom}
        src={EclipseBottom}
        alt="Eclipse Botttom"
      />

      <div className={styles.signUpArea}>
        <form onSubmit={handleSubmit} className={styles.formArea}>
          <div className={styles.inputBoxes}>

            <div className={styles.inputBox}>
              <label htmlFor="userName" className={fieldErrors.userName ? styles.errorLabel : styles.label}>Username</label>
              <div className={styles.inputAndError}>
                <input
                  className={fieldErrors.userName ? styles.errorInput : styles.input}
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter a username"
                  value={signUpDetails.userName}
                  onChange={handleChange}
                />
                <div className={styles.error}>
                  {fieldErrors.userName && <p>{fieldErrors.userName}</p>}
                </div>
              </div>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="email" className={fieldErrors.email ? styles.errorLabel : styles.label}>Email</label>
              <div className={styles.inputAndError}>
                <input
                  className={fieldErrors.email ? styles.errorInput : styles.input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signUpDetails.email}
                  onChange={handleChange}
                />
                <div className={styles.error}>
                  {fieldErrors.email && <p>{fieldErrors.email}</p>}
                </div>
              </div>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="password" className={fieldErrors.password ? styles.errorLabel : styles.label}>Password</label>
              <div className={styles.inputAndError}>
                <input
                  className={fieldErrors.password ? styles.errorInput : styles.input}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a password"
                  value={signUpDetails.password}
                  onChange={handleChange}
                />
                <div className={styles.error}>
                  {fieldErrors.password && <p>{fieldErrors.password}</p>}
                </div>
              </div>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="confirmPassword" className={fieldErrors.confirmPassword ? styles.errorLabel : styles.label}>Confirm Passwrord</label>
              <div className={styles.inputAndError}>
                <input
                  className={fieldErrors.confirmPassword ? styles.errorInput : styles.input}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter the password again"
                  value={signUpDetails.confirmPassword}
                  onChange={handleChange}
                />
                <div className={styles.error}>
                  {fieldErrors.confirmPassword && (
                    <p>{fieldErrors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.error}>
            {fieldErrors.general && <p>{fieldErrors.general}</p>}
          </div>

          <div className={styles.buttons}>
            <button type="submit">Sign Up</button>
            <div className={styles.or}>OR</div>
            <button type="none">Sign Up with Google</button>
          </div>
        </form>

        <div className={styles.alreadyHaveAccount}>
          <p>Already have an account?</p>
          <span>
            <NavLink
              className={({isActive}) => isActive ? `${styles.toLogin} ${styles.active}` : styles.toLogin}
              to="/signIn"
            >
              Login
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
