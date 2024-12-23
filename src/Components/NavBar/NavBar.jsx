// import { useTheme } from '../../Context/useTheme';
import styles from './NavBar.module.css';
import PropTypes from 'prop-types';

import Toggle from '../Toggle/Toggle';
import { useTheme } from '../../Context/ThemeContext';

export default function NavBar({workspaceName}) {

    const {theme} = useTheme()

  return (
    <div className={styles.navBar}>
        <div className={styles.workSpaceNameandsettings}>
            <select name='workspace' id="" className={styles.dropDown}>
                <option value={workspaceName}>{workspaceName}</option>
            </select>
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



