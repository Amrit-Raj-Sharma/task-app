import Modal from '@/components/Modal/Modal'
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/CardInfo.module.css'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import Editable from '@/components/Editable/Editable'
import Chip from '@/components/Chip/Chip'

const CardInfo = (props) => {

    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959"
    ]

    const [activeColor, setActiveColor] = useState('')

    const [values, setValues] = useState({ ...props.card })

    const calculatePercentage = () => {
        if(values.tasks?.length ===0)return "0"
        const completed = values.tasks?.filter((item) => item.completed)?.length

        return (completed/values.tasks?.length)*100 +""
    }

    const addLabel = (value, color) => {
        const index = values.labels?.findIndex((item) => item.text === value)
        if(index > -1) return;

        const label = {
            text: value,
            color
        }
        setValues({...values, labels: [...values?.labels, label]})
        setActiveColor("")
    }

    const removeLabel = (text) => {
        const tempLabels=values.labels?.filter(item => item.text !==text)
        setValues({ ...values, labels: tempLabels })
    }

    const addTask=(value) => {
        const task = {
            id: Date.now() + Math.random(),
            text:value,
            completed:false
        }

        setValues({ ...values, tasks: [...values.tasks, task] })
    }

    const removeTask = (id) => {
        const index = values.tasks?.findIndex(item=>item.id === id)
        if(index < 0) return;

        const tempTasks = values.tasks?.splice(index, 1)
        setValues({ ...values, tasks: tempTasks })
    }

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex(item=>item.id === id)
        if(index < 0) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].completed = completed;
        setValues({ ...values, tasks: tempTasks })
    }

    useEffect(() => {
        if(
            values.title === props.card?.title &&
            values.date === props.card?.date &&
            values.desc === props.card?.desc &&
            values.labels?.length === props.card?.labels?.length &&
            values.tasks?.length === props.card?.tasks?.length
        ) return;

        props.updateCard(props.card.id, props.boardId,values)
    },[props,values])

  return (
        <Modal onClose={() => props.onClose()}>
            <div className={styles['cardinfo']}>
                <div className={styles['cardinfo_box']}>
                    <div className={styles['cardinfo_box_title']}>
                        <Type />
                        Title
                    </div>
                    <div className={styles['cardinfo_box_body']}>
                        <Editable 
                            text={values.title} 
                            default={values.title} 
                            placeholder="Enter Title" 
                            buttonText="Set Title"
                            onSubmit={(value) => setValues({...values,title:value})} 
                        />
                    </div>
                </div>

                <div className={styles['cardinfo_box']}>
                    <div className={styles['cardinfo_box_title']}>
                        <List />
                        Description
                    </div>
                    <div className={styles['cardinfo_box_body']}>
                        <Editable 
                            text={values.desc || "Add a Description"} 
                            default={values.desc} 
                            placeholder="Enter Description" 
                            buttonText="Set Description"
                            onSubmit={(value) => setValues({...values,desc:value})} 
                        />
                    </div>
                </div>

                <div className={styles['cardinfo_box']}>
                    <div className={styles['cardinfo_box_title']}>
                        <Calendar />
                        Date
                    </div>
                    <div className={styles['cardinfo_box_body']}>
                        <input 
                            type='date' 
                            defaultValue={values.date ? new Date(values.date).toISOString().substr(0,10) : ""}
                            onChange={(event) => setValues({...values,date:event.target.value})} 
                        />
                    </div>
                </div>

                <div className={styles['cardinfo_box']}>
                    <div className={styles['cardinfo_box_title']}>
                        <Tag />
                        Labels
                    </div>
                    <div className={styles['cardinfo_box_labels']}>
                        {
                            values.labels?.map((item, index) => (
                            <Chip 
                                key={item.text+index} 
                                close 
                                onClose={() => removeLabel(item.text)}
                                color={item.color}
                                text={item.text} 
                            />
                            ))
                        }
                    </div>
                    <div className={styles['cardinfo_box_colors']}>
                        {
                            colors.map((item, index) => (
                                <li 
                                    key={index} 
                                    style={{ backgroundColor: item }}
                                    className={item === activeColor ? styles["active"]: ""}
                                    onClick={() => setActiveColor(item)}
                                />
                            ))
                        }
                    </div>
                    <div className={styles['cardinfo_box_body']}>
                        <Editable 
                            text={"Add Label"} 
                            placeholder="Enter Label" 
                            buttonText="Add"
                            onSubmit={(value) =>addLabel(value, activeColor)} 
                        />
                    </div>
                </div>

                <div className={styles['cardinfo_box']}>
                    <div className={styles['cardinfo_box_title']}>
                        <CheckSquare />
                        Tasks
                    </div>

                    <div className={styles['cardinfo_box_progress_bar']}>
                        <div className={styles[`cardinfo_box_progress`]} style={{ 
                            width: calculatePercentage()+"%",
                            backgroundColor: calculatePercentage() == "100" ? "limegreen" : ""
                        }}/>
                    </div>

                    <div className={styles['cardinfo_box_list']}>
                        <div className={styles['cardinfo_task']}>
                            {
                                values.tasks?.map((item) => (
                                    <div key={item.id} className='cardinfo_task'>
                                        <input 
                                            type='checkbox' 
                                            defaultChecked={item?.completed}
                                            onChange={(event) => updateTask(item.id, event.target.checked)}
                                        />
                                        <p>{item.text}</p>
                                        <Trash onClick={() => removeTask(item.id)} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles['cardinfo_box_body']}>
                        <Editable 
                            text={"Add new task"} 
                            placeholder="Enter Task" 
                            buttonText="Add Task"
                            onSubmit={(value) => addTask(value)} 
                        />
                    </div>
                </div>
            </div>
        </Modal>
  )
}

export default CardInfo