import { Container, Card, Col, Row } from 'react-bootstrap'
import { db } from '../firebase.js'
import { useState, useEffect } from 'react'

function Post() {
  let [postData, setPostData] = useState([])

  useEffect(() => {
    db.collection('post')
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
                <Card.Title>{data.제목}</Card.Title>
                <Card.Text>{data.내용}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Post
