import React, { useState } from 'react'
import styles from '../../styles/Editable.module.css'
import { Plus, X } from 'react-feather'

const Editable = (props) => {

    const [showEdit, setShowEdit] = useState(false)
    const [inputValue, setInputvalue] = useState(props.default || "")

  return (
    <div className={styles['editable']}>
        { showEdit ? 
        (<form
         className={`${styles['editable_edit']} ${props.editClass || ""}`}
         onSubmit={(e) =>{ 
                    e.preventDefault()
                    if(props.onSubmit)props.onSubmit(inputValue)
                    setShowEdit(false)
                    setInputvalue("")
         }}
         >
            <input value={inputValue} onChange={(e) => setInputvalue(e.target.value)} autoFocus type='text' placeholder={props.placeholder || props.text} />
            <div className={styles['editable_edit_footer']}>
                <button type='submit'>{props.buttonText || "Add"}</button>
                <X onClick={() => setShowEdit(false)} />
            </div>
        </form>)
        : 
        <p className={`${styles['editable_display']} ${styles[`${props.displayClass}`] || ""}`} onClick={() => setShowEdit(true)}>
          <Plus /> {props.text || "Add item"}
        </p>
}
    </div>
  )
}

export default Editable