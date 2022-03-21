const { useState } = React

const loadWebAuth = () => {
  let config = JSON.parse(
    decodeURIComponent(escape(window.atob('@@config@@')))
  )
  
  const leeway = config.internalOptions.leeway
  if (leeway) {
    const convertedLeeway = parseInt(leeway)
  
    if (!isNaN(convertedLeeway)) {
      config.internalOptions.leeway = convertedLeeway
    }
  }
  
  const params = Object.assign({
    overrides: {
      __tenant: config.auth0Tenant,
      __token_issuer: config.authorizationServer.issuer
    },
    domain: config.auth0Domain,
    clientID: config.clientID,
    redirectUri: config.callbackURL
  }, config.internalOptions)

  // const params = Object.assign({
  //   domain: 'https://dev-256y0rvb.us.auth0.com',
  //   clientID: 'ZWca1qugGaFb5GIRXSXovyi1EhdE0Cxn',
  //   redirectUri: 'http://localhost:3000/api/auth/callback'
  // })

  const webAuth = new auth0.WebAuth(params)
  return webAuth
}
const webAuth = loadWebAuth()

const sendMagicLink = async (email) => {
  return new Promise((resolve, reject) => {
    const params = {
      connection: 'email',
      send: 'link',
      email: email,
      authParams: {
        responseType: 'token id_token'
      }
    }

    const callback = (err) => {
      if (err) { reject(err) }
      else { resolve() }
    }

    webAuth.passwordlessStart(params, callback)
  })
}

const Message = (props) => {
  const { text, backgroundColor } = props
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      {text}
    </div>
  )
}

const Form = (props) => {
  const { onMagicLinkSent } = props

  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  const requestMagicLink = () => {
    var email = document.getElementById('email').value

    setError()
    setIsLoading(true)
    sendMagicLink(email)
      .then((res) => {
        setIsLoading(false)
        onMagicLinkSent(email)
      })
      .catch((err) => {
        setIsLoading(false)
        const errorMessage = err.description || err.error_description || 'An error has ocurred'
        setError(errorMessage)
      })
  }

  const loginWithTwitter = () => {
    setError()
    setIsLoading(true)

    const options = {
      connection: 'twitter',
      responseType: 'token'
    }
    const callback = (err) => {
      if (err) {
        setIsLoading(false)
        const errorMessage = err.description || err.error_description || 'An error has ocurred'
        setError(errorMessage)    
      }
    }

    webAuth.authorize(options, callback);
  }

  const loginWithGoogle = () => {
    setError()
    setIsLoading(true)

    const options = {
      connection: 'google-oauth2',
      responseType: 'token'
    }
    const callback = (err) => {
      if (err) {
        setIsLoading(false)
        const errorMessage = err.description || err.error_description || 'An error has ocurred'
        setError(errorMessage)    
      }
    }

    webAuth.authorize(options, callback);
  }

  return (
    <div id="login-form-container">
      <h1>POAP Issuer Portal</h1>
      {/* Passwordless login */}
      <div className="login-passwordless">
        <div className="title">
          <h3>Sign in</h3>
        </div>
        <div>Enter your email to receive a sign in link</div>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="border-box full-width"
        />
        <div>If this is your first time, an account will be created.</div>
        <button
          type="button"
          id="btn-request-magic-link"
          className="full-width"
          disabled={isLoading}
          onClick={requestMagicLink}
        >
          Sign in with email
        </button>
        
      </div>
      {/* Divider */}
      <div className="line-text-container line-background">
        <span className="line-background-text">Or continue with</span>
      </div>
      {/* Google & Social login */}
      <div className="login-google-social">
        <button
          type="button"
          id="btn-twitter-login"
          className="full-width"
          onClick={loginWithTwitter}
          disabled={isLoading}
        >
          Twitter
        </button>
        <button
          type="button"
          id="btn-google-login"
          className="full-width"
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          Google
        </button>
      </div>
      {/* Error messages */}
      {error && <Message text={error} backgroundColor='red' />}
    </div>
  )
}

const GoBackButton = (props) => {
  const { onClick } = props

  return (
    <button
      id="btn-back-to-login"
      onClick={onClick}
    >
      Back to login
    </button>
  )
}

const WaitingMagicLink = (props) => {
  const { userEmail } = props

  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  const requestMagicLink = () => {
    setError()
    setIsLoading(true)
    sendMagicLink(userEmail)
      .then((res) => {
        setIsLoading(false)
      })
      .catch((err) => {
        const errorMessage = err.description || err.error_description || 'An error has ocurred'
        setError(errorMessage)
        setIsLoading(false)
      })
  }

  return (
    <div id="waiting-magic-link-container">
      <h2>
        Check your inbox
      </h2>
      {!error && isLoading && (
        <span>
          Sending login link to <b>{userEmail}</b> ...
        </span>
      )}
      {!error && !isLoading && (
        <span>
          We sent you a login link to <b>{userEmail}</b>
        </span>
      )}
      {error && <Message text={error} backgroundColor='red' />}
      <div>
        <button
          onClick={requestMagicLink}
          disabled={isLoading}
        >
          Resend email
        </button>
      </div>
    </div>
  )
}

const Login = () => {
  const [userEmail, setUserEmail] = useState()

  const handleGoBackClick = () => {
    setUserEmail()
  }

  const handleEmailSent = (email) => {
    setUserEmail(email)
  }

  if (!webAuth) {
    return <Message text='Error initializing Webauth' backgroundColor='red' />
  }

  return (
    <div className="container">
      {/* 'Go back' button */}
      {userEmail && <GoBackButton onClick={handleGoBackClick} />}

      {/* 'Login' form */}
      {!userEmail && <Form onMagicLinkSent={handleEmailSent} />}

      {/* 'Wait for magic link' section */}
      {userEmail && <WaitingMagicLink userEmail={userEmail} />}
    </div>
  )
}

ReactDOM.render(<Login />, document.getElementById('root'))