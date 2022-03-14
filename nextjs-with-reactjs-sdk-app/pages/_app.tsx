import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { Auth0Provider } from '@auth0/auth0-react'

const App = ({ Component, pageProps }: AppProps) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL || ''
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : undefined

  const onRedirectCallback = (appState: any) => {
    // Use Next.js's Router.replace method to replace the url
    Router.replace(appState?.returnTo || '/')
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={`${domain}/api/v2/`}
      onRedirectCallback={onRedirectCallback}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default App
