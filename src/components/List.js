import React from 'react'
import s from './list.module.css'


const List = (props) => {

    return (
        <div className={s.list}>
            {props.filtred.length > 0 ?
                props.filtred.map(user => {
                    return (
                        <div className={s.item} key={user.id}>
                            <p>First name: {user.first_name}</p>
                            <p>Last name: {user.last_name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    )
                }) : props.users ? props.users.map(user => {
                    return (
                        <div className={s.item} key={user.id}>
                            <p>First name: {user.first_name}</p>
                            <p>Last name: {user.last_name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    )
                }) : ''}
        </div>
    )
}
export default List