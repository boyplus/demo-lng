import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api/axios';

function App() {
  const [count, setCount] = useState(undefined)

  const fetchCount = async () => {
    const res = await api.get('/count');
    const { count } = res.data;
    setCount(count);
  }

  const addCount = async () => {
    await api.post('/add-count');
    await fetchCount();
  }

  useEffect(() => {
    fetchCount();
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={addCount}>
          count is {count}
        </button>
        <p>
          Hello
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
