import { useState } from "react";
import WorkSpace from "../WorkSpace/WorkSpace";
import Modal from "../Modal/Modal";

function WorkSpaceOrModal() {

      const [showModal, setShowModal] = useState(false);
      const [modalFor, setModalFor] = useState('');

      const [folderFileName, setFolderFileName] = useState('');

      const [workSpaceId, setWorkSpaceId] = useState('');
      const [folderId, setFolderId] = useState('');
      const [token, setToken] = useState('');
      const [toastMessage, setToastMessage] = useState('');
      const [workSpace, setWorkSpace] = useState(null);
      const [folderWorkspace, setFolderWorkspace] = useState(null);

  return (
    <div>

            <WorkSpace setShowModal={setShowModal} setModalFor={setModalFor} setWorkSpaceId={setWorkSpaceId} workSpace={workSpace} setWorkSpace={setWorkSpace} token={token} setToken={setToken} toastMessage={toastMessage} folderWorkspace={folderWorkspace} setFolderWorkspace={setFolderWorkspace} setFolderId={setFolderId} folderId={folderId} />

            
            {showModal && <Modal setShowModal={setShowModal} modalFor={modalFor} folderFileName={folderFileName} setFolderFileName={setFolderFileName} workSpaceId={workSpaceId} workSpace={workSpace} setWorkSpace={setWorkSpace} token={token} setToastMessage={setToastMessage} /> }
    </div>
  )
}

export default WorkSpaceOrModal
