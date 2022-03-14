const getPosts = async (req: any, res: any) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  res.status(200).json(posts)
}

export default getPosts
