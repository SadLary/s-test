import React from 'react'
import s from './flipping.module.css'


const Flipping = (props) => {
    return (
        <div className={s.wrapper}>
            <button onClick={props.increment} className={s.btn}>Вперёд</button>
            {props.pageCounter > 1 ? <button onClick={props.decrement} className={s.btn}>Назад</button> : ''}
        </div>
    )
}

export default Flipping