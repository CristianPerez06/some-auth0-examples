import { useState, useEffect, FC } from 'react'
import Auth from './Auth'
import Unauth from './Unauth'
import { useAuth0 } from '@auth0/auth0-react'

const AppContainer: FC = () => {
  const { user, error, isAuthenticated, isLoading } = useAuth0()
  // const [user, setUser] = useState<any>()
  // const [error, setError] = useState<any>()
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  if (isLoading) return <div style={{ textAlign: 'center' }}>Loading...</div>
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error.message}</div>

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { user, error, isAuthenticated } = useAuth0()
  //       setUser(user)
  //       setError(error)
  //       setIsAuthenticated(isAuthenticated)
  //       setIsLoading(false)
  //     } catch (error) {
  //       setUser(undefined)
  //       setError(undefined)
  //       setIsAuthenticated(false)
  //       setIsLoading(false)
  //     }
  //   })()
  // }, [])

  return (
    <div className='app-container'>
      <div className='content' style={{ textAlign: 'center' }}>
        {/* {error && <div style={{ textAlign: 'center' }}>{error}</div>}
        {isLoading && <div style={{ textAlign: 'center' }}>Loading...</div>} */}
        {!isAuthenticated ? <Unauth /> : <Auth user={user} />}
      </div>
    </div>
  )
}

export default AppContainer
