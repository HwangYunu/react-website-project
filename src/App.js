import './App.css'
import { db } from './firebase.js'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    db.collection('todo')
      .get()
      .then(result => {
        result.forEach(doc => {
          console.log(doc.data())
        })
      })
  })

  return (
    <div className="App">
      <h1>Hello React!</h1>
      <h1>zz</h1>
    </div>
  )
}

export default App
