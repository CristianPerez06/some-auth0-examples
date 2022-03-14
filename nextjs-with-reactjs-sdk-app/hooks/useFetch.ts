import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const useFetch = (url: string) => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    (
      async () => {
        try {
          setIsLoading(true)

          const accessToken = await getAccessTokenSilently()

          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          const data = await response.json()

          setData(data)
        } catch(err: any) {
          setError(err.message)
        } finally {
          setIsLoading(false)
        }
      }
    )()
  }, [url])

  return { data, error, isLoading }
}

export default useFetch
