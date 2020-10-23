import React from 'react'
import s from './search.module.css'


const Search = (props) => {
    return (
        <div>
            <input type="text" className={s.input} onChange={props.searchFirstName} placeholder="first name" />
            <input type="text" className={s.input} onChange={props.searchLastName} placeholder="last name" />
        </div>
    )
}
export default Search