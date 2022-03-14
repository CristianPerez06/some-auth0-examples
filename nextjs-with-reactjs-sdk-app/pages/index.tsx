import Head from 'next/head'
import type { NextPage } from 'next'
import AppContainer from './components/AppContainer'

const Index: NextPage = () => {
  return (
    <div className='app'>
      <Head>
        <title>a-nextjs-with-auth0s-nextjs-sdk-app</title>
        <meta name="description" content="a-nextjs-with-auth0s-nextjs-sdk-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContainer />
    </div>
  )
}

export default Index
