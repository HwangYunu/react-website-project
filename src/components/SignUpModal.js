import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { auth, db } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

function SignUpModal(props) {
  let navigate = useNavigate()
  const [inputValue, setInputValue] = useState({})

  const inputValueObject = e => {
    const temp = {
      ...inputValue,
      [e.target.name]: e.target.value,
    }
    setInputValue(temp)
  }

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(inputValue.email, inputValue.password)
      .then(userResult => {
        userResult.user.updateProfile({ displayName: inputValue.name })

        db.collection('userInfo')
          .doc(userResult.user.uid)
          .set({
            userName: inputValue.name,
            userEmail: inputValue.email,
          })
          .then(() => {})
          .catch(() => {})

        setTimeout(() => {
          alert('회원가입이 완료되었습니다!')
          props.onHide(false)
          localStorage.removeItem('유저')
          window.location.reload()
        }, 1000)
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
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              onChange={inputValueObject}
              name="email"
              type="text"
              placeholder="사용할 이메일주소를 입력해 주세요."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control
              onChange={inputValueObject}
              name="name"
              type="text"
              placeholder="사용할 이름을 입력해 주세요."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              onChange={inputValueObject}
              name="password"
              type="password"
              placeholder="사용할 비밀번호를 입력해 주세요."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={signUp}
          variant="danger">
          회원가입
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignUpModal
