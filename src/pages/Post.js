import { Container, Card, Col, Row, Button } from 'react-bootstrap'
import { db } from '../firebase.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Post() {
  let navigate = useNavigate()
  let [postData, setPostData] = useState([])

  useEffect(() => {
    db.collection('post')
      .orderBy('id', 'desc')
      .get()
      .then(result => {
        let temp = []
        result.forEach(doc => {
          // push()는 원본 배열을 변경함
          temp.push(doc.data())
        })
        setPostData(temp)
      })
  }, [])

  // 아래 코드가 두번 출력되는 이유는 리액트의 의도된 기능
  console.log(postData)

  return (
    <Container>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          <h1>POST</h1>
        </Col>
        <Col sm={4}>
          <Button
            onClick={() => {
              navigate('/postWrite')
            }}
            variant="danger"
            style={{ float: 'right' }}>
            글쓰기
          </Button>
        </Col>
      </Row>
      <hr />
      <Row
        xs={1}
        md={2}
        className="g-4">
        {postData.map((data, i) => (
          <Col key={i}>
            <Card>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="favicon.ico"
                  style={{ width: '100px', float: 'left' }}
                />
                <Card.Subtitle>글번호 : {data.id}</Card.Subtitle>
                <Card.Subtitle>작성자 : {data.name}</Card.Subtitle>
                <Card.Title
                  onClick={() => {
                    navigate(`/postDetail/${data.id}`)
                  }}>
                  {data.title}
                </Card.Title>
                <Card.Text>{data.content}</Card.Text>
                <Card.Subtitle>{data.date}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Post
