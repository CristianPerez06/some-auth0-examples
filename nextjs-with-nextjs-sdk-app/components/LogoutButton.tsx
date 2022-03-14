import Link from 'next/link'

const LogoutButton = () => {

  return (
    <Link href="/api/auth/logout">
      <a style={{ color: 'blue' }}>Logout</a>
    </Link>
  )
}

export default LogoutButton