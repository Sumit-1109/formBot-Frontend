import styles from "./WorkSpace.module.css";
import { useEffect } from "react";
import { getFolderWorkspace, getWorkspace } from "../../Services/workspace";

import { useTheme } from "../../Context/ThemeContext";

import NavBar from "../../Components/NavBar/NavBar";

import newFolder from "../../assets/newfolder.png";
import addForm from "../../assets/add.png";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import deleteIcon from "../../assets/delete.png";
import { useNavigate, useParams } from "react-router-dom";

function WorkSpace({
  setShowModal,
  setModalFor,
  setWorkSpaceId,
  workSpaceId,
  workSpace,
  setWorkSpace,
  token,
  setToken,
  toastMessage,
  setToDelete,
  // folderWorkspace,
  // setFolderWorkspace,
  setFolderId,
  setFormId,
  selectedFolder,
  setSelectedFolder,
  folderForms,
  setFolderForms,
}) {
  const { theme } = useTheme();
  const { folderId: routeFolderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken || "");
    }
  }, []);

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

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!token) return;

      try {
        const res = await getWorkspace(token);

        if (res.status === 200) {
          const data = await res.json();
          setWorkSpace(data.workspace);
          setWorkSpaceId(data.workspace._id);
        }
      } catch (err) {
        console.log("Failed to fetch workspace", err);
      }
    };

    fetchWorkspace();
    console.log(workSpace);
  }, [token]);

  useEffect(() => {
    const handleFetchFolder = async () => {

      if (!routeFolderId || !token || !workSpaceId || !setFolderForms || !setSelectedFolder) {
        return;
      }

      try {
        const res = await getFolderWorkspace(token, workSpaceId, routeFolderId);
        if (res.status === 200) {
          const data = await res.json();
          setSelectedFolder(routeFolderId);
          setFolderForms(data.folder.forms);
        } else {
          console.error(`Failed to fetch folder forms: ${res.statusText}`)
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchFolder(routeFolderId);
  }, [routeFolderId, token, workSpaceId, setSelectedFolder, setFolderForms]);

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
            }}
          >
            <img
              src={newFolder}
              alt="folderIcon"
              className={styles.addFolderButton}
            />
            <span>Create a folder</span>
          </button>

          {workSpace.folders.map((folder) => (
            <button
              key={folder._id}
              className={`${styles.folderContainer} ${
                selectedFolder === folder._id ? styles.selectedFolder : ""
              }`}
              onClick={() => {
                navigate(`/workspace/${workSpaceId}/folder/${folder._id}`);
                setSelectedFolder(folder._id);
              }}
            >
              <span>{folder.folderName}</span>
              <img
                src={deleteIcon}
                className={styles.deleteIcon}
                alt="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                  setModalFor("Folder");
                  setToDelete(true);
                  setFolderId(folder._id);
                }}
              />
            </button>
          ))}
        </div>

        <div className={styles.formsList}>
          <div className={styles.createFormButton}>
            <button
              onClick={() => {
                setShowModal(true);
                setModalFor("Form");
              }}
            >
              <img src={addForm} alt="addIcon" /> <span>Create a typebot</span>
            </button>
          </div>

          {routeFolderId
            ? folderForms.map((form) => (
                <div key={form._id} className={styles.FormBox}>
                  <div className={styles.formNameContainer}>
                    <span>{form.formName}</span>
                    <img
                      src={deleteIcon}
                      className={styles.deleteIcon}
                      alt="deleteIcon"
                      onClick={() => {
                        setFormId(form._id);
                        setToDelete(true);
                        setShowModal(true);
                        setModalFor("Form");
                      }}
                    />
                  </div>
                </div>
              ))
            : workSpace.forms.map((form) => (
                <div key={form._id} className={styles.FormBox}>
                  <div className={styles.formNameContainer}>
                    <span>{form.formName}</span>
                    <img
                      src={deleteIcon}
                      className={styles.deleteIcon}
                      alt="deleteIcon"
                      onClick={() => {
                        setFormId(form._id);
                        setToDelete(true);
                        setShowModal(true);
                        setModalFor("Form");
                      }}
                    />
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
  workSpaceId: PropTypes.string,
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  toastMessage: PropTypes.string,
  workSpace: PropTypes.object,
  setWorkSpace: PropTypes.func.isRequired,
  setToDelete: PropTypes.func.isRequired,
  setFolderId: PropTypes.func.isRequired,
  setFormId: PropTypes.func.isRequired,
  selectedFolder: PropTypes.string,
  setSelectedFolder: PropTypes.func,
  folderForms: PropTypes.array,
  setFolderForms: PropTypes.func,
};
