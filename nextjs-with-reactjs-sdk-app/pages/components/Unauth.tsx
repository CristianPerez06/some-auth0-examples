import { FC } from 'react'
import LoginButton from './LoginButton'

const Unauth: FC = () => {
  return (
    <div>
      <p style={{ fontSize: "1.5rem" }}>Please Login.</p>
      <LoginButton />
    </div>
  )
}

export default Unauth
