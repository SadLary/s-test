import React from 'react'
import s from './list.module.css'


const List = (props) => {

    return (
        <div className={s.list}>
            <div className={s.heading_row}>
                <span className={s.cell}>First name</span>
                <span className={s.cell}>Last name</span>
                <span className={s.cell}>Email</span>
            </div>
            {props.filtred.length > 0 ?
                props.filtred.map(user => {
                    return (
                        <div className={s.item} key={user.id}>
                            <span className={s.cell}>{user.first_name}</span>
                            <span className={s.cell}>{user.last_name}</span>
                            <span className={s.cell}>{user.email}</span>
                        </div>
                    )
                }) : props.users ? props.users.map(user => {
                    return (
                        <div className={s.item} key={user.id}>
                            <span className={s.cell}>{user.first_name}</span>
                            <span className={s.cell}>{user.last_name}</span>
                            <span className={s.cell}>{user.email}</span>
                        </div>
                    )
                }) : ''}
        </div>
    )
}
export default List