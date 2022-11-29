import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PostDetail() {
  // useParams의 변수 id는 Route에 지정된 :id와 변수명이 같아야 한다.
  // 또한, 이 id값은 String임을 유의
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

  console.log(postData)

  const deletePost = () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      db.collection('post')
        .where('id', '==', parseInt(id))
        .get()
        .then(result => {
          // 게시물 id의 DocumentID 찾기
          let docId
          result.forEach(data => (docId = data.id))
          // 해당하는 Documnet 삭제
          db.collection('post')
            .doc(docId)
            .delete()
            .then(() => {
              console.log('문서 삭제 성공!')
              alert('글 삭제에 성공했습니다!')
              navigate('/post')
            })
            .catch(err => {
              console.log('에러 발생')
              console.log(err)
            })
        })
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <div>
            <span>글번호 : {postData.id}</span>
            <br />
            <span>{postData.date}</span>
          </div>
        </Col>
        <Col sm={4}>
          <h1>POST</h1>
        </Col>
        <Col sm={4}>
          <Button
            onClick={deletePost}
            variant="secondary">
            삭제하기
          </Button>

          <Button
            onClick={() => {
              navigate(`/postEdit/${id}`)
            }}
            variant="danger"
            style={{ float: 'right' }}>
            수정하기
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col sm={2}></Col>
        <Col sm={8}>
          <Form style={{ textAlign: 'left', fontSize: '25px' }}>
            <Form.Group className="mb-3">
              <h4>{postData.title}</h4>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <p>{postData.content}</p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PostDetail
