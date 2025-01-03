import { useEffect, useRef, useState } from "react";
import styles from "./ShareModal.module.css";
import PropTypes from "prop-types";
import close from "../../assets/close.png";
import { Bounce, toast } from "react-toastify";
import { emailLink, sharingLink } from "../../Services/sharing";

function ShareModal({ setShowModal, setToShare, dashBoardId, token }) {
  const [role, setRole] = useState("viewer");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
      setToShare(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailInvite = async () => {
    setIsLoading(true);
    console.log(dashBoardId);
    try {
      const res = await emailLink(dashBoardId, token, email, role);
      const data = await res.json();
      if (res.status === 200) {
        toast.success('Dashboard shared successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
        setEmail('');
        setError('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An unexpected error occurred:", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateLink = async () => {
    setIsLoading(true);
    try {
      const res = await sharingLink(dashBoardId, token, role);
      const data = await res.json();
      if (res.status === 201) {
        navigator.clipboard.writeText(data.link);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.ShareModalPage}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.dropDown}>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="view">View</option>
            <option value="edit">Edit</option>
          </select>
        </div>

        <div className={styles.emailInvite}>
          <div className={styles.heading}>
            <h1>Invite by Email</h1>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
            <div className={styles.error}>
              <span>{error}</span>
            </div>
          </div>
          <div className={styles.sendButton}>
            <button onClick={handleEmailInvite}>
              {isLoading ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </div>

        <div className={styles.linkInvite}>
          <div className={styles.heading}>
            <h1>Invite Link</h1>
          </div>
          <div className={styles.copyButton}>
            <button
              className={styles.copyButton}
              onClick={handleGenerateLink}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Copy Link"}
            </button>
          </div>
        </div>

        <button
          className={styles.cancelButton}
          onClick={() => {
            setShowModal(false);
            setToShare(false);
          }}
        >
          <img src={close} alt="Close" className={styles.cancel} />
        </button>
      </div>
    </div>
  );
}

ShareModal.propTypes = {
  setToShare: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  dashBoardId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default ShareModal;
