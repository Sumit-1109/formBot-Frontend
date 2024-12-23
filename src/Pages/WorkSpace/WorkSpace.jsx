import { useParams } from 'react-router-dom';
import styles from './Workspace.module.css';
import { useEffect, useState } from 'react';
import { getWorkspace } from '../../Services/workspace';

import { useTheme } from '../../Context/ThemeContext';

import NavBar from '../../Components/NavBar/NavBar';

import folderIcon from '../../assets/folderSVG.png';
import addForm from '../../assets/add.png';
import PropTypes from 'prop-types';

function WorkSpace({setShowModal, setModalFor}) {

    const {theme} = useTheme();

    const {userId} = useParams();
    const [workspace, setWorkspace] = useState(null);


    useEffect(() => {
        const fetchWorkspace = async () => {
            try{
                const res = await getWorkspace(userId);
                const data =await res.json();

                if(res.status === 200) {
                    setWorkspace(data.workspace)
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchWorkspace();
    }, [userId]);


    if (!workspace) {
        return <div>Loading...</div>
    }

  return (
    <div className={`${styles.WorkSpace} ${theme ? styles.dark : styles.light}`}>

        <div className={styles.NavBar}>
            <NavBar workspaceName={workspace.name} />
        </div>

        <div className={styles.body}>
            <div className={styles.foldersList}>
                <div className={styles.createFolderButton}>
                <button onClick={() => {
                    setShowModal(true);
                    setModalFor('Folder');
                    }}> 
                <img src={folderIcon} alt="folderIcon" /> <span>Create a folder</span></button>
                </div>
            </div>
            <div className={styles.formsList}>
                <div className={styles.createFormButton}>
                <button onClick={() => {
                    setShowModal(true);
                    setModalFor('Form')
                }}> 
                <img src={addForm} alt="addIcon" /> <span>Create a typebot</span></button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default WorkSpace;

WorkSpace.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    setModalFor: PropTypes.func.isRequired
}
