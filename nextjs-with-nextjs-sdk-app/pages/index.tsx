import Head from 'next/head'
import type { NextPage } from 'next'
import Auth from '../components/Auth'
import Unauth from '../components/Unauth'
import { useUser } from '@auth0/nextjs-auth0'

const Index: NextPage = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div style={{ textAlign: 'center' }}>Loading...</div>
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error.message}</div>

  return (
    <div className='app-container'>
      <Head>
        <title>a-nextjs-with-auth0s-nextjs-sdk-app</title>
        <meta name="description" content="a-nextjs-with-auth0s-nextjs-sdk-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='content' style={{ textAlign: 'center' }}>
        {!user ? <Unauth /> : <Auth user={user} />}
      </div>
    </div>
  )
}

export default Index
