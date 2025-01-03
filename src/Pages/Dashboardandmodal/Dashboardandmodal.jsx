import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Dashboard from "../Dashboard/Dashboard";
import ShareModal from "../ShareModal/ShareModal";
import { useNavigate, useParams } from "react-router-dom";
import { getSharedDashBoard } from "../../Services/dashBoard";
import { toast } from "react-toastify";

function Dashboardandmodal() {
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState("");
  const [folderFileName, setFolderFileName] = useState("");
  const [dashBoardId, setDashBoardId] = useState("");
  const [dashBoard, setDashBoard] = useState({
    folders: [],
    files: [],
  });

  const [folderId, setFolderId] = useState("");
  const [fileId, setFileId] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folderFiles, setFolderFiles] = useState([]);
  const [token, setToken] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toDelete, setToDelete] = useState(false);
  const [toShare, setToShare] = useState(false);
  const [sharedDashboards, setSharedDashboards] = useState([]);

  const { dashBoardId: sharedDashBoardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken || "");
  }, []);

  useEffect(() => {
    const fetchSharedDashboards = async () => {
      try {
        const res = await getSharedDashBoard(token);
        const data = await res.json();

        if (res.status === 200) {
          setSharedDashboards(data);
          if (sharedDashBoardId) {
            const sharedDashboard = data.find((db) => db._id === sharedDashBoardId);
            if (sharedDashboard) {
              setDashBoard(sharedDashboard);
              setDashBoardId(sharedDashBoardId);
            } else {
              toast.error("Shared dashboard not found");
            }
          }
        } else {
          toast.error("Failed to fetch shared dashboards");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading shared dashboards");
      }
    };

    if (token) fetchSharedDashboards();
  }, [token, sharedDashBoardId]);

  const handleDashBoardClick = (id) => {
    if (id) {
      navigate(`/dashboard/${id}`);
    } else {
      toast.error("Invalid Dashboard ID");
    }
  };

  return (
    <div>
      <Dashboard
        setShowModal={setShowModal}
        setModalFor={setModalFor}
        setDashBoardId={setDashBoardId}
        dashBoardId={dashBoardId}
        dashBoard={dashBoard}
        setDashBoard={setDashBoard}
        token={token}
        setToken={setToken}
        toastMessage={toastMessage}
        setFolderId={setFolderId}
        setFileId={setFileId}
        setToDelete={setToDelete}
        toDelete={toDelete}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        setToShare={setToShare}
        toShare={toShare}
        handleDashBoardClick={handleDashBoardClick}
        sharedDashboards={sharedDashboards}
      />

      {showModal && !toShare && (
        <Modal
          setShowModal={setShowModal}
          setModalFor={setModalFor}
          modalFor={modalFor}
          folderFileName={folderFileName}
          setFolderFileName={setFolderFileName}
          dashBoardId={dashBoardId}
          dashBoard={dashBoard}
          setDashBoard={setDashBoard}
          token={token}
          setToastMessage={setToastMessage}
          toDelete={toDelete}
          fileId={fileId}
          folderId={folderId}
          setToDelete={setToDelete}
          selectedFolder={selectedFolder}
          setFolderFiles={setFolderFiles}
          toShare={toShare}
          setToShare={setToShare}
        />
      )}

      {showModal && toShare && dashBoardId && (
        <ShareModal
          setShowModal={setShowModal}
          setToShare={setToShare}
          dashBoardId={dashBoardId}
          token={token}
        />
      )}
    </div>
  );
}

export default Dashboardandmodal;
