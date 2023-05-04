import React, { useState } from 'react'
import styles from '../../styles/Card.module.css'
import {CheckSquare, Clock, MoreHorizontal} from 'react-feather'
import Chip from '../Chip/Chip'
import Dropdown from '../Dropdown/Dropdown'
import CardInfo from './CardInfo/CardInfo'

const Card = (props) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

  return (
    <>
    {showModal && <CardInfo updateCard={props.updateCard} boardId={props.boardId} card={props.card} onClose={(() => setShowModal(false))} />}
    <div 
      className={styles['card']}
      draggable
      onDragEnd={() =>props.handleDragEnd(props.card?.id, props.boardId)}
      onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
      // onClick={() => setShowModal(true)}
      >
        <div className={styles['card_top']}>
            <div className={styles['card_top_labels']}>
              {
                props.card?.labels?.map((item, index) => (
                  <Chip key={index} text={item.text} color={item.color} />
                ))
              }
                {/* <Chip close text="Frontend" color="green" /> */}
            </div>
            <div className={styles['card_top_more']} onClick={(e) =>{e.stopPropagation(); setShowDropdown(true);}}>
              <MoreHorizontal />
              {
                showDropdown &&
              (<Dropdown
                onClose={()=> setShowDropdown(false)}
              >
                <div className={styles['card_dropdown']}>
                  <p onClick={(e) => {setShowModal(true); setShowDropdown(false); e.stopPropagation();}}>Edit</p>
                  <p onClick={() => props.removeCard(props.card?.id, props.boardId)}>Delete Card</p>
                </div>
              </Dropdown>)
              }
            </div>
        </div>
        <div className={styles['card_title']}>
            {props.card?.title}
        </div>
        <div className={styles['card_footer']}>
          {
            props.card?.date && 
            <p><Clock />{props.card?.date}</p>
          }
            {props.card?.tasks?.length > 0 &&
              <p><CheckSquare />
                {props.card?.tasks?.filter((item) => item.completed).length}/
                {props.card?.tasks.length}
              </p>
            }
        </div>
    </div>
    </>
  )
}

export default Card