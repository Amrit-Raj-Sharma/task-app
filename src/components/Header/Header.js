import React from 'react'
import styles from '../../styles/Header.module.css'

const Header = () => {
  return (
    <div className={styles['header']}>
        <div className={styles['header_menu_logo']}>
          <h4>Next Kanban App</h4>
            {/* <div className={styles['header_menu_circle1']}/>
            <div className={styles['header_menu_circle2']}/>
            <div className={styles['header_menu_circle3']}/> */}
        </div>
        <div className={styles['header_menu_right']}>
            <div>
              User
            </div>
            <div>
              Logout
            </div>
        </div>
        {/* <div className={styles['header_menu_user']}>
            User
        </div> */}
    </div>
  )
}

export default Header