import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PostEdit() {
  let { id } = useParams()
  let navigate = useNavigate()
  let [postData, setPostData] = useState({})

  useEffect(() => {
    db.collection('post')
      .where('id', '==', parseInt(id))
      .get()
      .then(result => {
        result.forEach(doc => {
          let temp = { ...doc.data() }
          setPostData(temp)
        })
      })
  }, [id])

  const inputValueObject = e => {
    const temp = {
      ...postData,
      [e.target.name]: e.target.value,
    }
    setPostData(temp)
  }

  const updatePost = () => {
    db.collection('post')
      .where('id', '==', parseInt(id))
      .get()
      .then(result => {
        // 게시물 id의 Document ID 찾기
        let docId
        result.forEach(data => (docId = data.id))
        // 해당하는 Document 업데이트
        db.collection('post').doc(docId).update(postData)
        navigate('/post')
      })
  }

  return (
    <Container>
      <Row>
        <h1>수정하기</h1>
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
                value={postData.title || ''}
                name="title"
                type="text"
                placeholder="제목을 입력해 주세요."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                onChange={inputValueObject}
                value={postData.content || ''}
                name="content"
                as="textarea"
                rows={12}
                placeholder="내용을 입력해 주세요."
              />
            </Form.Group>
            <Button
              onClick={updatePost}
              style={{ float: 'right' }}>
              수정완료
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PostEdit
