import { FC } from 'react'

type PostsListType = {
  isLoading: boolean,
  error?: string,
  posts?: any[]
}

const PostsList: FC<PostsListType> = (props) => {
  const { isLoading, error, posts } = props

  if (isLoading) {
    return (
      <div style={{ padding: 5 + 'px' }}>
        Loading...
      </div>
    )
  }

  if (!isLoading && error) {
    return (
      <div style={{ padding: 5 + 'px' }}>
        {error}
      </div>
    )
  }

  return (
    <div className='posts-list' style={{ maxWidth: 300 + 'px' }}>
      <ul>
        {posts?.slice(0, 10).map((post) => {
          return (
            <ul key={post.id} style={{ padding: 5 + 'px', textAlign: 'left' }}>
              <li>Post id: {post.id}</li>
              <li>Post title: {post.title}</li>
            </ul>
          )
        })}
      </ul>
    </div>
  )
}

export default PostsList