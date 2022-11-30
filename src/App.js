import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, Button, ButtonGroup } from 'react-bootstrap'
import Home from './pages/Home'
import Post from './pages/Post'
import PostDetail from './pages/PostDetail'
import PostWrite from './pages/PostWrite'
import PostEdit from './pages/PostEdit'
import UserLogedIn from './components/UserLogedIn'
import LoginModal from './components/LoginModal'
import SignUpModal from './components/SignUpModal'
import { useState } from 'react'

function App() {
  const [loginModal, setLoginModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
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
          <Nav>
            {localStorage.getItem('유저') ? (
              <UserLogedIn />
            ) : (
              <ButtonGroup>
                <Button onClick={() => setLoginModal(true)}>로그인</Button>
                <Button onClick={() => setSignUpModal(true)}>회원가입</Button>
              </ButtonGroup>
            )}
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
          path="/postDetail/:id"
          element={<PostDetail />}></Route>
        <Route
          path="/postEdit/:id"
          element={<PostEdit />}></Route>
        <Route
          path="/postWrite"
          element={<PostWrite />}></Route>
        <Route
          path="/temp"
          element={<div>임시 페이지 입니다.</div>}></Route>
      </Routes>

      <LoginModal
        show={loginModal}
        onHide={() => setLoginModal(false)}
      />
      <SignUpModal
        show={signUpModal}
        onHide={() => setSignUpModal(false)}
      />
    </div>
  )
}

export default App
