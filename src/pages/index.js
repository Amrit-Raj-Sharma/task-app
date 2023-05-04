
import Board from '@/components/Board/Board.js'
import Editable from '@/components/Editable/Editable'
import Header from '@/components/Header/Header'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'


export default function Home() {

  // const [boards, setBoards] = useState(
  //   (typeof window !== 'undefined'&& JSON.parse(localStorage.getItem('app'))) || []
  // )
  const [boards, setBoards] = useState([
    {
        "id": 1682658186307.68,
        "title": "To DO",
        "cards": [
            {
                "id": 1682658386577.8345,
                "title": "UI: Create New Dashboard",
                "labels": [
                    {
                        "text": "Frontend",
                        "color": "#9975bd"
                    }
                ],
                "tasks": [
                    {
                        "id": 1682659388934.1326,
                        "text": "Convert Dashboard XD into React.",
                        "completed": false
                    },
                    {
                        "id": 1682659396918.054,
                        "text": "Implment all Dashborad Funtionalities.",
                        "completed": false
                    }
                ],
                "date": "2023-04-28",
                "desc": "Created Dashborad UI and implement required funtionalities."
            },
            {
              "id": 1682658386577.8346,
              "title": "API: Integrate Auth API",
              "labels": [
                  {
                      "text": "Frontend",
                      "color": "#9975bd"
                  }
              ],
              "tasks": [
                  {
                      "id": 1682659388934.1327,
                      "text": "Create all auth UIs",
                      "completed": false
                  },
                  {
                      "id": 1682659396918.055,
                      "text": "Integrate all auth API with their respective UIs",
                      "completed": false
                  }
              ],
              "date": "2023-04-28",
              "desc": "Integrate all auth APIs with their respective UIs."
          }
        ]
    },
    {
        "id": 1682658195306.214,
        "title": "In Progress",
        "cards": [
          {
            "id": 1682658386577.8347,
            "title": "UI: Create All UIs",
            "labels": [
                {
                    "text": "Frontend",
                    "color": "#9975bd"
                }
            ],
            "tasks": [
                {
                    "id": 1682659388934.1328,
                    "text": "Task1",
                    "completed": true
                },
                {
                    "id": 1682659396918.059,
                    "text": "Task 2",
                    "completed": false
                }
            ],
            "date": "2023-04-28",
            "desc": "Integrate all auth APIs with there respective UIs."
        }
        ]
    },
    {
      "id": 1682658195306.210,
      "title": "Completed",
      "cards": [
        {
          "id": 1682658386577.8348,
          "title": "Create All Auth APIs",
          "labels": [
              {
                  "text": "Backend",
                  "color": "#1ebffa"
              }
          ],
          "tasks": [
              {
                  "id": 1682659388934.1325,
                  "text": "Created All required auth APIs",
                  "completed": true
              },
              {
                  "id": 1682659396918.052,
                  "text": "Add Refresh token",
                  "completed": true
              }
          ],
          "date": "2023-04-28",
          "desc": "Created All required auth APIs and Add Refresh token."
      }
      ]
  }
])

  const [target, setTarget] = useState({
    cid:"",
    bid:""
  })

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels:[],
      tasks:[],
      date:"",
      desc:""
    }
    const index = boards.findIndex((item) => item.id === bid)
    if(index < 0) return;

    const tempBoards=[...boards]
    tempBoards[index].cards.push(card)
    setBoards(tempBoards)
  }

  const removeCard = (cid,bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if(bIndex < 0)return;
    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if(cIndex < 0)return;

    const tempBoards=[...boards]
    tempBoards[bIndex].cards.splice(cIndex,1)
    setBoards(tempBoards)
  }

  const addBoard =(title) => {
    setBoards([
      ...boards,
      {
        id:Date.now() + Math.random(),
        title,
        cards:[],
      }
    ])
  }

  const removeBoard = (bid) => {
    const tempBoards = boards.filter(item => item.id !==bid)

    setBoards(tempBoards)
  }

  const handleDragEnter = (cid,bid) => {
    setTarget({
      cid,bid
    })
  }

  const handleDragEnd = (cid,bid) => {
    let s_bIndex=0, s_cIndex=0, t_bIndex=0, t_cIndex=0

    // source boardIndex
    s_bIndex=boards.findIndex((item) => item.id === bid)
    if(s_bIndex<0) return;

    // source cardIndex
    s_cIndex=boards[s_bIndex].cards?.findIndex((item) => item.id === cid)
    if(s_cIndex < 0) return;

    // target boardIndex
    t_bIndex=boards.findIndex((item) => item.id === target.bid)
    if(t_bIndex<0) return;

    // target cardIndex
    t_cIndex=boards[t_bIndex].cards?.findIndex((item) => item.id === target.cid)
    if(t_cIndex < 0) return;

    const tempboards = [...boards]
    const tempcard = tempboards[s_bIndex].cards[s_cIndex]

    tempboards[s_bIndex].cards.splice(s_cIndex,1)
    tempboards[t_bIndex].cards.splice(t_cIndex,0,tempcard)

    setBoards(tempboards)
  }

  const updateCard = (cid,bid,card) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if(bIndex < 0)return;
    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if(cIndex < 0)return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards)
  }

  // useEffect(() => {
  //   typeof window !== 'undefined' && localStorage.setItem('app', JSON.stringify(boards))
  // }, [boards])

  return (
    <div className={styles['app']}>
      <div className={styles['app_navbar']}>
        <Header />
      </div>
      <div className={styles['app_outer']}>
        <div className={styles['app_boards']}>
          {
            boards.map((item) => (
              <Board 
                key={item.id} 
                board={item} 
                removeBoard={removeBoard} 
                addCard={addCard} 
                removeCard={removeCard}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
                updateCard={updateCard}
              />
            ))
          }
          <div className={styles['app_boards_board']}>
            <Editable
              displayClass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter board title"
              onSubmit={value => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
