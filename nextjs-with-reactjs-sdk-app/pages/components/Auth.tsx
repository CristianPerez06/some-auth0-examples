import { FC } from 'react'
import LogoutButton from './LogoutButton'

type AuthProps = {
  user: any
}

const Auth: FC<AuthProps> = (props) => {
  const { user } = props
  
  return (
    <div>
      <h2>Username: {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <LogoutButton />
    </div>
  )
}

export default Auth
