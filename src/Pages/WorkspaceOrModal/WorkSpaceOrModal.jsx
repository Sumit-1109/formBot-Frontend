import { useState } from "react";
import WorkSpace from "../WorkSpace/WorkSpace";
import Modal from "../Modal/Modal";

function WorkSpaceOrModal() {

      const [showModal, setShowModal] = useState(false);
      const [modalFor, setModalFor] = useState('');

      const [folderName, setFolderName] = useState('');

  return (
    <div>

            <WorkSpace setShowModal={setShowModal} setModalFor={setModalFor} />

            
            {showModal && <Modal setShowModal={setShowModal} modalFor={modalFor} folderName={folderName} setFolderName={setFolderName} /> }
    </div>
  )
}

export default WorkSpaceOrModal
