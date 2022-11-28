import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { db, fieldValue } from '../firebase.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PostWrite() {
  let navigate = useNavigate()
  const [inputValue, setInputValue] = useState({})

  const inputValueObject = e => {
    const temp = {
      ...inputValue,
      [e.target.name]: e.target.value,
    }
    setInputValue(temp)
    // ...inputValue : 지금 업데이트 하는 state 외의 기존 state 값들
  }

  const uploadPost = () => {
    console.log('******** 글쓰기 작성내용 ********')
    console.log(inputValue)

    const docId = db.collection('post').doc().id

    // 게시물 갯수 구하기
    db.collection('postCounter')
      .doc('postCounter')
      .get()
      .then(resultForCounter => {
        // 게시물 작성
        db.collection('post')
          .doc(docId)
          .set({
            ...inputValue,
            docId: docId,
            id: resultForCounter.data().posts + 1,
            date: new Date().toLocaleString(),
          })
          .then(result => {
            console.log('********* 글 작성 성공! *********')
            console.log(result)
            console.log('********************************')

            // 게시물 번호 업데이트
            db.collection('postCounter')
              .doc('postCounter')
              .update({ posts: fieldValue.increment(1) })

            // post페이지로 이동
            navigate('/post')
          })
          .catch(err => {
            console.log('******* 글 작성 에러 발생 *******')
            console.log(err)
            console.log('********************************')
            alert('글 작성 도중 에러가 발생하였습니다!')
          })
      })
  }

  return (
    <Container>
      <Row>
        <h1>글쓰기</h1>
      </Row>
      <hr />
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <Form style={{ textAlign: 'left', fontSize: '25px' }}>
            <Form.Group className="mb-3">
              <Form.Label>글제목</Form.Label>
              <Form.Control
                onChange={inputValueObject}
                name="title"
                type="text"
                placeholder="제목을 입력해 주세요."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                onChange={inputValueObject}
                name="content"
                as="textarea"
                rows={12}
                placeholder="내용을 입력해 주세요."
              />
            </Form.Group>
            <Button
              onClick={uploadPost}
              style={{ float: 'right' }}>
              글 올리기
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PostWrite
