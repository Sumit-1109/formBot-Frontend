import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './signin.module.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';


import triangle from "../../../assets/triangle.png";
import EclipseRight from "../../../assets/EclipseRight.png";
import EclipseBottom from "../../../assets/EclipseBottom.png";
import { signIn } from '../../../Services/client';

function Signin() {

  const location = useLocation();

  const navigate = useNavigate();

  const [signInDetails, setSignInDetails] = useState({
      email: '',
      password: ''
  })
  const [fieldErrors, setFieldErrors] = useState('');

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
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

      window.history.replaceState({}, document.title);

    }
  }, [location]);

  const handleChange = (e) => {
    setSignInDetails({
      ...signInDetails,
      [e.target.id]: e.target.value.trim(),
    });

    setFieldErrors('');
  }


  const handleSubmit =async (e) => {
    e.preventDefault();

    try{
      const res = await signIn(signInDetails);

      if (res.status === 200){

        const data = await res.json();
        const {message, token} = data;

        localStorage.setItem("token", token);

        setSignInDetails({
          email: '',
          password: ''
        });

        navigate(`/dashboard`, {state: {toastMessage: message}});

      } else {
        const data = await res.json();
        const errorMessage = data.message;
        setFieldErrors(errorMessage);
      }
    }catch (err) {
      console.log(err);
    }
  } 

  return (
    <div className={styles.signInPage}>

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

<div className={styles.signInArea}>
        <form onSubmit={handleSubmit} className={styles.formArea}>
          <div className={styles.inputBoxes}>

            <div className={styles.inputBox}>
              <label htmlFor="email" className={fieldErrors ? styles.errorLabel : styles.label}>Email</label>
              <div className={styles.inputAndError}>
                <input
                  className={fieldErrors ? styles.errorInput : styles.input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signInDetails.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="password" className={fieldErrors ? styles.errorLabel : styles.label}>Password</label>
              <div className={styles.inputAndError}>
                <input
                  className={fieldErrors ? styles.errorInput : styles.input}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a password"
                  value={signInDetails.password}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
          <div className={styles.error}>
            <p>{fieldErrors}</p>
          </div>

          <div className={styles.buttons}>
            <button type="submit">Log In</button>
            <div className={styles.or}>OR</div>
            <button type="none">Sign Up with Google</button>
          </div>
        </form>

        <div className={styles.dontHaveAccount}>
          <p>Don’t have an account?</p>
          <span>
            <NavLink
              className={({isActive}) => isActive ? `${styles.toLogin} ${styles.active}` : styles.toLogin}
              to="/signUp"
            >
              Register Now
            </NavLink>
          </span>
        </div>
      </div>
      
    </div>
  )
}

export default Signin;
