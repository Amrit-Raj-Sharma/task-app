import React from 'react'
import styles from '../../styles/Modal.module.css'

const Modal = (props) => {
  return (
    <div 
        className={styles['modal']}
        onClick={() => (props.onClose ? props.onClose() : '')}
    >
        <div 
            className={styles['modal_content']}
            onClick={(event) => event.stopPropagation()}
        >
            {props.children}
        </div>
    </div>
  )
}

export default Modal