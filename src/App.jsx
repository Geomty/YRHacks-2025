import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  form.addEventListener(`focus`, () => form.select());
  return (
    <div className ="App">
      <label>
          <input value="untitled root" className="form"/>
      </label>

      <div className="prompt-window">
        <div className="embed-window">
            insert website
        </div>

        <label>
          <input value="Type here to search..." id="browseFor" className="form"/>
        </label>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
  
    </div>
  )
}

export default App
