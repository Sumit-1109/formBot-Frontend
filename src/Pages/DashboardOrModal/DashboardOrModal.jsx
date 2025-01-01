import { useState } from "react";
import Modal from "../Modal/Modal";
import Dashboard from "../Dashboard/Dashboard";
// import ShareModal from "../ShareModal/ShareModal";

function DashboardOrModal() {



  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState("");

  const [folderFileName, setFolderFileName] = useState("");

  const [dashBoardId, setDashBoardId] = useState("");
  const [dashBoard, setDashBoard] = useState({
    folders: [],
    files: []
  });

  const [folderId, setFolderId] = useState("");
  const [fileId, setFileId] = useState("");

  const [folderDashBoard, setFolderDashBoard] = useState(null);

  const [selectedFolder, setSelectedFolder] = useState('');

  const [folderFiles, setFolderFiles] = useState([]);

  const [token, setToken] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const [toDelete, setToDelete] = useState(false);
  const [toShare, setToShare] = useState(false);



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
        folderDashBoard={folderDashBoard}
        setFolderDashBoard={setFolderDashBoard}
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
      />

      {(showModal && !toShare) && (
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

      {/* {
        (showModal && toShare && dashBoardId) && (
          <ShareModal  
            setShowModal={setShowModal} 
            setToShare={setToShare}
            dashBoardId={dashBoardId}
            token={token}
           />
        )
      } */}
    </div>
  );
}

export default DashboardOrModal;
