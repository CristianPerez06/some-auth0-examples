import Link from 'next/link'

const LoginButton = () => {

  return (
    <Link href="/api/auth/login">
      <a style={{ color: 'blue' }}>Login</a>
    </Link>
  )
}

export default LoginButton