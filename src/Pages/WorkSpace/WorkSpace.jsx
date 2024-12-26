import styles from "./WorkSpace.module.css";
import { useEffect } from "react";
import { deleteFolder, deleteForm, getWorkspace } from "../../Services/workspace";

import { useTheme } from "../../Context/ThemeContext";

import NavBar from "../../Components/NavBar/NavBar";

import newFolder from "../../assets/newfolder.png";
import addForm from "../../assets/add.png";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import deleteIcon from '../../assets/delete.png';

function WorkSpace({
  setShowModal,
  setModalFor,
  setWorkSpaceId,
  workSpace,
  setWorkSpace,
  token,
  setToken,
  toastMessage,
  // folderWorkspace,
  // setFolderWorkspace,
  // setFolderId,
  // folderId
}) {
  const { theme } = useTheme();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

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
    }
  }, []);


  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!token) return;
      try {
        const res = await getWorkspace(token);
        const data = await res.json();

        if (res.status === 200) {
          setWorkSpace(data.workspace);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkspace();
  }, [token]);

  // useEffect(() => {

  //   const fetchFolderWorkspace = async () => {
  //     if (!folder) {
  //       return;
  //     };
  //     if (!token) return;
  //   }
  // })

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage, {
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
  }, [toastMessage]);

  const handleDeleteFolder =async (folderId) => {

    try{
        const res = await deleteFolder(token, workSpace._id, folderId);

        if(res.status === 200) {

          const data = await res.json();

          setWorkSpace(prev => ({
            ...prev,
            folders: prev.folders.filter((folder) => folder._id !== folderId),
          }));
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
        const res = await deleteForm(token, workSpace._id, formId);

        if(res.status === 200) {

          const data = await res.json();

          setWorkSpace(prev => ({
            ...prev,
            forms: prev.forms.filter((form) => form._id !== formId),
          }));
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

  if (!workSpace) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${styles.WorkSpace} ${theme ? styles.dark : styles.light}`}
    >
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

      <div className={styles.NavBar}>
        <NavBar workspaceName={workSpace.name} />
      </div>

      <div className={styles.body}>
        <div className={styles.foldersList}>

            <button
                className={styles.folderContainer}
              onClick={() => {
                setShowModal(true);
                setModalFor("Folder");
                setWorkSpaceId(workSpace._id);
              }}
            >
              <img src={newFolder} alt="folderIcon" className={styles.addFolderButton} />
              <span>Create a folder</span>
            </button>

          {workSpace.folders.map((folder) => (
            <button key={folder._id} className={styles.folderContainer}>
                    <span>{folder.folderName}</span>
                        <img src={deleteIcon} className={styles.deleteIcon} alt="delete" onClick={() => handleDeleteFolder(folder._id)} />
            </button>
          ))}
        </div>

        <div className={styles.formsList}>
          <div className={styles.createFormButton}>
            <button
              onClick={() => {
                setShowModal(true);
                setModalFor("Form");
                setWorkSpaceId(workSpace._id);
              }}
            >
              <img src={addForm} alt="addIcon" /> <span>Create a typebot</span>
            </button>
          </div>

          {workSpace.forms.map((form) => (
            <div key={form._id} className={styles.FormBox}>
            <div className={styles.formNameContainer}>
              <span>{form.formName}</span><img src={deleteIcon} className={styles.deleteIcon} alt="deleteIcon" onClick={() => handleDeleteForm(form._id)} /> 
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;

WorkSpace.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setModalFor: PropTypes.func.isRequired,
  setWorkSpaceId: PropTypes.func.isRequired,
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  toastMessage: PropTypes.string,
  workSpace: PropTypes.object,
  setWorkSpace: PropTypes.func.isRequired,
};
