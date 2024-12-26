// import { useTheme } from '../../Context/useTheme';
import styles from './NavBar.module.css';
import PropTypes from 'prop-types';

import Toggle from '../Toggle/Toggle';
// import { useTheme } from '../../Context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import dropDownIcon from '../../assets/dropDown.png';
import { useNavigate } from 'react-router-dom';

export default function NavBar({workspaceName}) {


    // const {theme} = useTheme()
    const [isOpen, setIsOpen] = useState(false);
    // const dropRef = useRef(null);

    const toggleDropDown = () => {
        setIsOpen((prev) => !prev);
    }

    const navigate = useNavigate();

  return (
    <div className={styles.navBar}>

        <div className={styles.workSpaceNameAndSettings}>
            <div className={`${styles.dropDownContainer} ${isOpen ? styles.open : ''} `} onClick={toggleDropDown}>
            <div className={`${styles.dropDownHeader} ${isOpen ? styles.open : ''}`}>
                <span className={`${styles.workSpaceName} ${styles.headerContent}`}>{workspaceName}</span>
                <span className={`${styles.icon} ${isOpen ? styles.open : ''} ${styles.headerContent}`}><img src={dropDownIcon} alt="dropDown" /></span>
            </div>

                {
                    isOpen && (
                        <div className={styles.dropDownList}>
                            <ul className={styles.list}>
                                <li onClick={() => navigate(`/settings`)} className={styles.listItems}>Settings</li>
                                <li className={`${styles.listItems} ${styles.logOut}`}>Log Out</li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>


        
        <div className={styles.theme}>
            <Toggle />
        </div>

        <div className={styles.share}>
            <button className={styles.shareButton}>Share</button>
        </div>
      </div>
  )
};

NavBar.propTypes = {
    workspaceName: PropTypes.string.isRequired,
}



