import React, { useEffect, useRef } from 'react'
import styles from '../../styles/Dropdown.module.css'

const Dropdown = (props) => {

    const dropdownRef = useRef()

    const handleClick = (e) => {
        if(dropdownRef && !dropdownRef?.current.contains(e?.target)){
            if(props.onClose) props.onClose();
        } else {
            ""
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return()=>{
            document.removeEventListener('click', handleClick)
        }
    })

  return (
    <div 
        ref={dropdownRef} 
        className={styles['dropdown']}
        style={{
            position:"absolute",
            top:"100%",
            right:"0"
        }}
    >
        {props.children}
    </div>
  )
}

export default Dropdown