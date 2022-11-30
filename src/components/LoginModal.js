import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { auth } from '../firebase.js'

function LoginModal(props) {
  const [inputValue, setInputValue] = useState({})

  const inputValueObject = e => {
    const temp = {
      ...inputValue,
      [e.target.name]: e.target.value,
    }
    setInputValue(temp)
  }

  // 로그인 상태 감지
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('** 로그인정보 **')
      console.log(user)
      console.log(user.uid)
      console.log(user.displayName)
      console.log('** 로그인정보 **')
      localStorage.setItem('유저', JSON.stringify(user))
    } else {
      console.log('로그인 정보가 없습니다.')
    }
  })

  const login = () => {
    auth
      .signInWithEmailAndPassword(inputValue.email, inputValue.password)
      .then(userResult => {
        alert('로그인에 성공하였습니다!')
        props.onHide(false)
        props.setUserLoginStatus(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              onChange={inputValueObject}
              name="email"
              type="text"
              placeholder="이메일주소를 입력해 주세요."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              onChange={inputValueObject}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={login}>로그인</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginModal
