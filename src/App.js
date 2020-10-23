import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search'
import Preloader from './components/Preloader'
import List from './components/List'
import Flipping from './components/Flipping'

function App() {
  const [users, setUsers] = useState([])
  const [filtred, setFiltred] = useState(users)
  const [pageCounter, setPageCounter] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const searchFirstName = (event) => {
    const firstNameValue = event.target.value

    const filtredUsers = users.filter(user => {
      return user.first_name.toLowerCase().includes(firstNameValue);
    });
    if (filtredUsers === []) {
      setFiltred(users)
    } else {
      setFiltred(filtredUsers)
    }
  }
  const searchLastName = (event) => {

    const firstNameValue = event.target.value

    const filtredUsers = users.filter(user => {
      return user.last_name.toLowerCase().includes(firstNameValue);
    });
    if (filtredUsers === []) {
      setFiltred(users)
    } else {
      setFiltred(filtredUsers)
    }
  }
  function increment() {
    setPageCounter(pageCounter + 1)
  }
  function decrement() {
    setPageCounter(pageCounter - 1)
  }
  async function requestUsers(counter) {
    setIsFetching(true)
    await fetch(`https://us-central1-smooth-topic-238416.cloudfunctions.net/test-fn?page=${counter}`)
      .then(response => response.json())
      .then(json => {
        setUsers(json)
        setFiltred(json)
        setIsFetching(false)
        console.log(counter);
      })
  }
  useEffect(() => {
    requestUsers(pageCounter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCounter])
  return (
    <div className="App">
      <Search searchLastName={searchLastName} searchFirstName={searchFirstName} />
      {isFetching ? <Preloader /> : ''}
      <List users={users} filtred={filtred} />
      <Flipping increment={increment} decrement={decrement} pageCounter={pageCounter} />
    </div>
  );
}

export default App;
