import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { db } from './firebase.js'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Home from './pages/Home'
import Post from './pages/Post'

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

  let reduxTest = useSelector(state => {
    return state
    // return state.testNumbers
  })
  console.log(reduxTest)
  console.log(reduxTest.testNumbers)

  let navigate = useNavigate()

  return (
    <div className="App">
      <Navbar
        fixed="top"
        bg="light"
        variant="light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/')
            }}>
            LYBLOG
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/')
              }}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/post')
              }}>
              Post
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/temp')
              }}>
              Temp
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<Home />}></Route>
        <Route
          path="/post"
          element={<Post />}></Route>
        <Route
          path="/temp"
          element={<div>임시 페이지 입니다.</div>}></Route>
      </Routes>
    </div>
  )
}

export default App
