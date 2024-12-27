import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";
import { createFolder, createForm, createFormInFolder, deleteFolder, deleteForm } from "../../Services/workspace";
import { Bounce, toast } from "react-toastify";

function Modal({
  setShowModal,
  modalFor,
  folderFileName,
  setFolderFileName,
  workSpaceId,
  token,
  setToastMessage,
  setWorkSpace,
  toDelete,
  setModalFor,
  folderId,
  formId,
  setToDelete,
  selectedFolder,
  setFolderForms

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
          setModalFor('');
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
        const res = selectedFolder ? 
        await createFormInFolder(token, workSpaceId, selectedFolder, folderFileName)
        :await createForm(token, workSpaceId,folderFileName);

        if (res.status === 201) {
          const data =await res.json();
          const message = data.message;
          setFolderFileName("");
          setToastMessage(message);
          setModalFor('');
          setShowModal(false);

          if (selectedFolder) {
            setFolderForms(data.folder.forms);
        } else {
            setWorkSpace(data.workspace);
        }

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



    const handleDeleteFolder =async (folderId) => {
  
      try{
          const res = await deleteFolder(token, workSpaceId, folderId);
  
          if(res.status === 200) {
  
            const data = await res.json();
  
            setWorkSpace(prev => ({
              ...prev,
              folders: prev.folders.filter((folder) => folder._id !== folderId),
            }));
            setToastMessage(data.message);
            setToDelete(false);
            setModalFor('');
            setShowModal(false);
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

    const handleDeleteForm =async (formId) => {
  
      console.log(formId);
  
      try{
          const res = await deleteForm(token, workSpaceId, formId);
  
          if(res.status === 200) {
  
            const data = await res.json();
  
            setWorkSpace((prev) => ({
              ...prev,
              forms: prev.forms.filter((form) => form._id !== formId),
            }));
            setToDelete(false)
            setShowModal(false);
            setModalFor('');
            setToastMessage(data.message)
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

  return (
    <div className={styles.modal}>
      {toDelete ? (
        <div className={styles.modalContent} ref={modalRef}>
          <div className={styles.heading}>
            <h1 htmlFor="folderName">Are you sure you want to delete this {modalFor} ?</h1>
          </div>
            
            <div className={styles.buttons}>
              <button className={styles.done} type="submit" onClick={() => {
                  modalFor === 'Folder' ? handleDeleteFolder(folderId) : handleDeleteForm(formId)
                  }}>
                Done
              </button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setToDelete(false);
                  setModalFor('');
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
        </div>
      ):(
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
  setWorkSpace: PropTypes.func.isRequired,
  toDelete: PropTypes.bool.isRequired,
  setModalFor: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  formId: PropTypes.string,
  setToDelete: PropTypes.func,
  selectedFolder: PropTypes.string,
  setFolderForms: PropTypes.func
};
