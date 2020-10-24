import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search'
import Preloader from './components/Preloader'
import List from './components/List'

function App() {
  const [users, setUsers] = useState([])
  const [filtred, setFiltred] = useState(users)
  const [isFetching, setIsFetching] = useState(true)


  const searchFirstName = (event) => {
    const firstNameValue = event.target.value
    if (filtred.length > 0) {
      const filtredUsers = filtred.filter(user => {
        return user.first_name.toLowerCase().includes(firstNameValue)
      })
      if (firstNameValue === '') {
        setFiltred(users)
      } else {
        setFiltred(filtredUsers)
      }
    } else {
      console.log(filtred);
      const filtredUsers = users.filter(user => {
        return user.first_name.toLowerCase().includes(firstNameValue);
      });
      if (firstNameValue === '') {
        setFiltred(users)
      } else {
        setFiltred(filtredUsers)
      }
    }
  }
  const searchLastName = (event) => {
    const lastNameValue = event.target.value
    if (filtred.length > 0) {
      const filtredUsers = filtred.filter(user => {
        return user.last_name.toLowerCase().includes(lastNameValue)
      })
      if (lastNameValue === '') {
        setFiltred(users)
      } else {
        setFiltred(filtredUsers)
      }
    } else {
      const filtredUsers = users.filter(user => {
        return user.last_name.toLowerCase().includes(lastNameValue);
      });
      if (lastNameValue === '') {
        setFiltred(users)
      } else {
        setFiltred(filtredUsers)
      }
    }
  }
  let pageCounter = 1
  let full = []
  // Вообще изначально моя идея заключалась в том чтобы конкатенировать
  // предыдущее состояние и результат запроса, но тогда рендер выдавал ошибку о уникальном key
  // Данной решение скорее всего очень не лаконично и это плохой пример кода, но как сделать лучше я не знаю.
  async function requestUsers() {
    setIsFetching(true)
    const res = await (await fetch(`https://us-central1-smooth-topic-238416.cloudfunctions.net/test-fn?page=${pageCounter}`)).json()
    full.push(res)
    // Единственное единственное условие, которое я смог придумать.
    if (res.length === full.flat(1).length / pageCounter) {
      pageCounter++
      return requestUsers()
    }
    setUsers(full.flat(1))
    setIsFetching(false)
  }
  useEffect(() => {
    requestUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App">
      <Search searchLastName={searchLastName} searchFirstName={searchFirstName} />
      {isFetching ? <Preloader /> : ''}
      <List users={users} filtred={filtred} />
    </div>
  );
}

export default App;
