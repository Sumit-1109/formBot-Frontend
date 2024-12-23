import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { useEffect, useRef } from 'react';

function Modal({setShowModal, modalFor, folderFileName, setFolderFileName}) {

    const modalRef= useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)){
            setShowModal(false);
        };
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className={styles.modal}>

        {modalFor !== 'delete' && (
            <div className={styles.modalContent} ref={modalRef}>
            <div className={styles.heading}>
                <h1 htmlFor="folderName">Create New {modalFor}</h1>
            </div>
            <form onSubmit={handleSubmit}>
            <div className={styles.nameInput}>
                <input type="text" id='folderName' name='folderName' value={folderFileName} onChange={(e) => setFolderFileName(e.target.value)} placeholder={`Enter ${modalFor.toLowerCase()} name`} />
            </div>
            <div className={styles.buttons}>
                <button className={styles.done} type='submit'>Done</button>
                <button className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
            </form>
            
        </div>
        )}

        {
            modalFor === 'delete' && (
                <div className={styles.modalContent}>

                </div>
            )
        }
    </div>
  )
}

export default Modal

Modal.propTypes = {
    modalFor: PropTypes.string.isRequired,
    folderFileName: PropTypes.string.isRequired,
    setFolderFileName: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired
}
