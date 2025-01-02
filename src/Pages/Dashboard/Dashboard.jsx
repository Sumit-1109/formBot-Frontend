import styles from "./Dashboard.module.css";
import { useEffect } from "react";
import { getDashBoard } from "../../Services/dashBoard";

import { useTheme } from "../../Context/ThemeContext";

import NavBar from "../../Components/NavBar/NavBar";

import newFolder from "../../assets/newfolder.png";
import addForm from "../../assets/add.png";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from "react-toastify";
import deleteIcon from "../../assets/delete.png";
import { useNavigate, useParams } from "react-router-dom";
import { getFolderDashBoard } from "../../Services/folder";

function Dashboard({
  setShowModal,
  setModalFor,
  setDashBoardId,
  dashBoardId,
  dashBoard,
  setDashBoard,
  token,
  setToken,
  toastMessage,
  setToDelete,
  setFolderId,
  setFileId,
  selectedFolder,
  setSelectedFolder,
  folderFiles,
  setFolderFiles,
  setToShare,
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
    const fetchDashBoard = async () => {
      if (!token) return;

      try {
        const res = await getDashBoard(token);

        if (res.status === 200) {
          const data = await res.json();
          const dashBoard = await data.dashBoard;
          if (dashBoard) {
            setDashBoard(dashBoard);
            setDashBoardId(dashBoard._id);
            console.log(dashBoard);
          } else {
            setDashBoard(null);
          }
        }
      } catch (err) {
        console.log("Failed to fetch dashboard", err);
      }
    };

    fetchDashBoard();
  }, [token]);

  useEffect(() => {
    if (!routeFolderId) {
      setSelectedFolder("");
    } else {
      setSelectedFolder(routeFolderId);
    }
  }, [routeFolderId]);

  useEffect(() => {
    const handleFetchFolder = async () => {
      if (
        !routeFolderId ||
        !token ||
        !dashBoardId ||
        !setFolderFiles ||
        !setSelectedFolder
      ) {
        return;
      }

      try {
        const res = await getFolderDashBoard(token, dashBoardId, routeFolderId);

        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setSelectedFolder(routeFolderId);
          setFolderFiles(data.folder.files);
          console.log(data.folder.files);
        } else {
          setFolderFiles([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchFolder(routeFolderId);
  }, [routeFolderId, token, dashBoardId, setSelectedFolder, setFolderFiles]);

  if (!dashBoard) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${styles.Dashboard} ${theme ? styles.dark : styles.light}`}
    >

      <div className={styles.NavBar}>
        <NavBar
          dashBoardName={dashBoard.name}
          setToShare={setToShare}
          setShowModal={setShowModal}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.foldersList}>
          <button
            className={`${styles.folderContainer} ${theme ? styles.dark : styles.light}`}
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

          {dashBoard?.folders?.length > 0 &&
            dashBoard.folders.map((folder) => (
              <button
                key={folder._id}
                className={`${styles.folderContainer} ${theme ? styles.dark : styles.light} ${
                  selectedFolder === folder._id ? styles.selectedFolder : ""
                }`}
                onClick={() => {
                  navigate(`/dashBoard/${dashBoardId}/folder/${folder._id}`);
                  setSelectedFolder(folder._id);
                }}
              >
                <span>{folder.name}</span>
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

        <div className={styles.filesList}>
          <div className={styles.createFileButton}>
            <button
              onClick={() => {
                setShowModal(true);
                setModalFor("File");
              }}
            >
              <img src={addForm} alt="addIcon" /> <span>Create a typebot</span>
            </button>
          </div>

          {routeFolderId
            ? folderFiles.map((file) => (
                <div
                  key={file._id}
                  className={styles.FileBox}
                  onClick={() => navigate(`/workspace/${file._id}`)}
                >
                  <div className={`${styles.fileNameContainer} ${theme ? styles.dark : styles.light}`}>
                    <span>{file.name}</span>
                    <img
                      src={deleteIcon}
                      className={styles.deleteIcon}
                      alt="deleteIcon"
                      onClick={(e) => {
                        setFileId(file._id);
                        setToDelete(true);
                        setShowModal(true);
                        setModalFor("File");
                        e.stopPropagation();
                      }}
                    />
                  </div>
                </div>
              ))
            : dashBoard?.files?.length > 0 &&
              dashBoard.files.map((file) => (
                <div
                  key={file._id}
                  className={styles.FileBox}
                  onClick={() => navigate(`/workspace/${file._id}`)}
                >
                  <div className={`${styles.fileNameContainer} ${theme ? styles.dark : styles.light}`}>
                    <span>{file.name}</span>
                    <img
                      src={deleteIcon}
                      className={styles.deleteIcon}
                      alt="deleteIcon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileId(file._id);
                        setToDelete(true);
                        setShowModal(true);
                        setModalFor("File");
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

export default Dashboard;

Dashboard.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setModalFor: PropTypes.func.isRequired,
  setDashBoardId: PropTypes.func.isRequired,
  dashBoardId: PropTypes.string,
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  toastMessage: PropTypes.string,
  dashBoard: PropTypes.object,
  setDashBoard: PropTypes.func.isRequired,
  setToDelete: PropTypes.func.isRequired,
  setFolderId: PropTypes.func.isRequired,
  setFileId: PropTypes.func,
  selectedFolder: PropTypes.string,
  setSelectedFolder: PropTypes.func,
  folderFiles: PropTypes.array,
  setFolderFiles: PropTypes.func,
  setToShare: PropTypes.func,
};
