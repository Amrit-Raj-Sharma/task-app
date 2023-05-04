import React, { useState } from 'react'
import styles from "../../styles/Board.module.css"
import {MoreHorizontal} from 'react-feather'
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
import Dropdown from '../Dropdown/Dropdown'

const Board = (props) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const bgColor = () => {
    if(props.board?.title.toLowerCase().includes('progress')){
      return '#1ebffa'
    } else if(props.board?.title.toLowerCase().includes('complete')){
      return 'limegreen !important'
    } else {
      return 'blueviolet'
    }
  }

  return (
    <div className={styles['board']}>
        <div className={styles['board_top']} style={{ backgroundColor: bgColor()}}>
            <p className={styles['board_top_title']}>{props.board?.title}<span className={styles['board_count']}>{props.board?.cards?.length}</span></p>
            <div className={styles['board_top_more']} onClick={(e) =>{e.stopPropagation(); setShowDropdown(true);}}>
              <MoreHorizontal />
              {
                showDropdown &&
              (<Dropdown
                onClose={()=> setShowDropdown(false)}
              >
                <div className={styles['board_dropdown']}>
                  <p onClick={() => props.removeBoard(props.board?.id)} style={{ color:'red' }}>Delete Board</p>
                </div>
              </Dropdown>)
              }
            </div>
        </div>
        <div className={styles['board_cards']}>
            {
              props?.board?.cards?.map((item) => (
                <Card 
                  key={item.id} 
                  card={item} 
                  removeCard={props.removeCard} 
                  boardId={props.board?.id}
                  handleDragEnter={props.handleDragEnter}
                  handleDragEnd={props.handleDragEnd}
                  updateCard={props.updateCard} 
                />
              ))
            }
            <Editable 
            displayClass="board_cards_add"
            text="Add Card"
            placeholder="Enter Card Title"
            onSubmit={(value) =>props.addCard(value,props.board?.id)}
            />
        </div>
    </div>
  )
}

export default Board