import { useState } from "react";
import WorkSpace from "../WorkSpace/WorkSpace";
import Modal from "../Modal/Modal";

function WorkSpaceOrModal() {



  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState("");
  const [folderFileName, setFolderFileName] = useState("");
  const [workSpaceId, setWorkSpaceId] = useState("");
  const [folderId, setFolderId] = useState("");
  const [formId, setFormId] = useState("");
  const [token, setToken] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [workSpace, setWorkSpace] = useState(null);
  const [folderWorkspace, setFolderWorkspace] = useState(null);
  const [toDelete, setToDelete] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folderForms, setFolderForms] = useState([]);




  return (
    <div>
      <WorkSpace
        setShowModal={setShowModal}
        setModalFor={setModalFor}
        setWorkSpaceId={setWorkSpaceId}
        workSpaceId={workSpaceId}
        workSpace={workSpace}
        setWorkSpace={setWorkSpace}
        token={token}
        setToken={setToken}
        toastMessage={toastMessage}
        folderWorkspace={folderWorkspace}
        setFolderWorkspace={setFolderWorkspace}
        setFolderId={setFolderId}
        setFormId={setFormId}
        setToDelete={setToDelete}
        toDelete={toDelete}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        folderForms={folderForms}
        setFolderForms={setFolderForms}
      />

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setModalFor={setModalFor}
          modalFor={modalFor}
          folderFileName={folderFileName}
          setFolderFileName={setFolderFileName}
          workSpaceId={workSpaceId}
          workSpace={workSpace}
          setWorkSpace={setWorkSpace}
          token={token}
          setToastMessage={setToastMessage}
          toDelete={toDelete}
          formId={formId}
          folderId={folderId}
          setToDelete={setToDelete}
          selectedFolder={selectedFolder}
          setFolderForms={setFolderForms}

        />
      )}
    </div>
  );
}

export default WorkSpaceOrModal;
