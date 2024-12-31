import { useEffect, useRef, useState } from "react";
import styles from "./ShareModal.module.css";
import PropTypes from "prop-types";
import close from "../../assets/close.png";
import { emailLink, sharingLink } from "../../Services/dashBoard";
import { Bounce, toast } from "react-toastify";

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmailInvite = async () => {
    
    setIsLoading(true);

    try{
        const res = await emailLink(dashBoardId ,token, email, role);

        const data =await res.json();

        if (res.status === 200){
            toast.success(data.message, {
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
              setEmail('');
        } else {
            setError(data.message);
        }
    } catch (err){
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
              });;
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerateLink = async () => {
    setIsLoading(true);

    try{
        const res = await sharingLink(dashBoardId, token, role);

        const data = await res.json();

        if(res.status === 201){
            navigator.clipboard.writeText(data.shareLink);
            toast.success(data.message, {
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
        } else {
            console.log(data.message);
        }
    } catch (err) {
        console.log(err);
    } finally{
        setIsLoading(false);
    }
  };

  return (
    <div className={styles.ShareModalPage}>

      <div className={styles.modalContent} ref={modalRef}>

          <div className={styles.dropDown}>
            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="viewer">View</option>
                <option value="editor">Edit</option>
            </select>
          </div>

        <div className={styles.emailInvite}>
        <div className={styles.heading}>
          <h1 htmlFor="folderName">Invite by Email</h1>
        </div>
        <div className={styles.input}>
            <input type="text" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value) } />
            <div className={styles.error}>
                <span>{error}</span>
            </div>
        </div>
        <div className={styles.sendButton}>
            <button onClick={handleEmailInvite} disabled={isLoading || !email}>{isLoading ? "Sending..." : "Send Invite"}</button>
        </div>
        </div>

        <div className={styles.linkInvite}>
        <div className={styles.heading}>
          <h1 htmlFor="folderName">Invite Link</h1>
        </div>

        <div className={styles.sendButton}>
            <button className={styles.copyButton} onClick={handleGenerateLink} disabled={isLoading}>{isLoading ? "Generating..." : "Copy Link"}</button>
        </div>
      </div>

        </div>

      <div className={styles.buttons}>
        <button
          className={styles.cancel}
          onClick={() => {
            setShowModal(false);
            setToShare(false);
          }}
        >
          <img src={close} alt="" />
        </button>
      </div>
    </div>
  );
}

export default ShareModal;

ShareModal.propTypes = {
  setToShare: PropTypes.func,
  setShowModal: PropTypes.func,
  dashBoardId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
