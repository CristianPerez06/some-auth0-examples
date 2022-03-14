import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0'

const getPosts = async (req: any, res: any) => {
  const { accessToken } = await getAccessToken(req, res)

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  const posts = await response.json()
  res.status(200).json(posts)
}

export default withApiAuthRequired(getPosts)
