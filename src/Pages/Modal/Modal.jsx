import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";
import { createFolder, createForm } from "../../Services/workspace";
import { ToastContainer, Bounce, toast } from "react-toastify";

function Modal({
  setShowModal,
  modalFor,
  folderFileName,
  setFolderFileName,
  workSpaceId,
  token,
  setToastMessage,
 setWorkSpace,

}) {
  const modalRef = useRef(null);
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalFor === "Folder") {
      try {
        const res = await createFolder(token, workSpaceId, folderFileName);

        if (res.status === 201) {
          const data = await res.json();
          const message = data.message;
          setFolderFileName("");
          setWorkSpace(data.workspace);
          setToastMessage(message);
          setShowModal(false);
          toast.success(message, {
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
    } else if (modalFor === "Form") {
      try {
        const res = await createForm(token, workSpaceId,folderFileName);

        if (res.status === 201) {
          const data =await res.json();
          const message = data.message;
          setFolderFileName("");
          setWorkSpace(prev => ({
            ...prev,
            forms: [...prev.forms, data.form]
          }))
          setToastMessage(message);
          setShowModal(false);
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
    }
  };

  return (
    <div className={styles.modal}>
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
      {modalFor !== "delete" && (
        <div className={styles.modalContent} ref={modalRef}>
          <div className={styles.heading}>
            <h1 htmlFor="folderName">Create New {modalFor}</h1>
          </div>
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <div className={styles.nameInput}>
              <input
                type="text"
                id="folderName"
                name="folderName"
                value={folderFileName}
                onChange={(e) => setFolderFileName(e.target.value)}
                placeholder={`Enter ${modalFor.toLowerCase()} name`}
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.done} type="submit">
                Done
              </button>
              <button
                className={styles.cancel}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {modalFor === "delete" && <div className={styles.modalContent}></div>}
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  modalFor: PropTypes.string.isRequired,
  folderFileName: PropTypes.string,
  setFolderFileName: PropTypes.func,
  setShowModal: PropTypes.func.isRequired,
  workSpaceId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setToastMessage: PropTypes.func.isRequired,
  setWorkSpace: PropTypes.func.isRequired
};
