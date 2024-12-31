import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";
import { Bounce, toast } from "react-toastify";
import { createFolder, deleteFolder } from "../../Services/folder";
import { createFile, createFileInFolder, deleteFile } from "../../Services/file";


function Modal({
  setShowModal,
  modalFor,
  folderFileName,
  setFolderFileName,
  dashBoardId,
  token,
  setToastMessage,
  setDashBoard,
  toDelete,
  setModalFor,
  folderId,
  fileId,
  setToDelete,
  selectedFolder,
  setFolderFiles

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
    console.log(dashBoardId);
    if (modalFor === "Folder") {
      try {
        const res = await createFolder(token, dashBoardId, folderFileName);
        console.log("API Endpoint:", `${URL}/api/dashBoard/${dashBoardId}/createFolder`);
console.log("Dashboard ID:", dashBoardId);


        if (res.status === 201) {
          const data = await res.json();
          const dashBoard = data.dashBoard
          const message = data.message;
          setFolderFileName("");
          setDashBoard(dashBoard);
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
    } else if (modalFor === "File") {
      try {
        const res = selectedFolder ? 
        await createFileInFolder(token, dashBoardId, selectedFolder, folderFileName)
        :await createFile(token, dashBoardId,folderFileName);

        if (res.status === 201) {
          const data =await res.json();
          console.log(data);
          const message = data.message;
          setFolderFileName("");
          setToastMessage(message);
          setModalFor('');
          setShowModal(false);

          if (selectedFolder) {
            setFolderFiles(data.folder.files);
        } else {
            setDashBoard(data.dashBoard);
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
          const res = await deleteFolder(token, dashBoardId, folderId);
  
          if(res.status === 200) {
  
            const data = await res.json();
  
            setDashBoard(prev => ({
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

    const handleDeleteFile =async (fileId) => {
  
      console.log(fileId);
  
      try{
          const res = await deleteFile(token, dashBoardId, fileId);
  
          if(res.status === 200) {
  
            const data = await res.json();
  
            setDashBoard((prev) => ({
              ...prev,
              files: prev.files.filter((file) => file._id !== fileId),
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
                  modalFor === 'Folder' ? handleDeleteFolder(folderId) : handleDeleteFile(fileId)
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
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default Modal;

Modal.propTypes = {
  modalFor: PropTypes.string.isRequired,
  folderFileName: PropTypes.string,
  setFolderFileName: PropTypes.func,
  setShowModal: PropTypes.func.isRequired,
  dashBoardId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setToastMessage: PropTypes.func.isRequired,
  setDashBoard: PropTypes.func.isRequired,
  toDelete: PropTypes.bool.isRequired,
  setModalFor: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  fileId: PropTypes.string,
  setToDelete: PropTypes.func,
  selectedFolder: PropTypes.string,
  setFolderFiles: PropTypes.func
};
