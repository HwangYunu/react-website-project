import { Button } from 'react-bootstrap'
import { auth } from '../firebase.js'

function UserLogedIn() {
  const logout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('유저')
      alert('로그아웃 되었습니다!')
      window.location.reload()
    })
  }

  return (
    <div>
      {JSON.parse(localStorage.getItem('유저')).name}님 안녕하세요!
      <Button
        onClick={logout}
        className="mx-3">
        로그아웃
      </Button>
    </div>
  )
}

export default UserLogedIn
