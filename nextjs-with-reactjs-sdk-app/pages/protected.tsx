import type { NextPage } from 'next'
import PostsList from './components/PostsList'
import useFetch from '../hooks/useFetch'

const Protected: NextPage = () => {
  const { data, error, isLoading } = useFetch('/api/posts')
  
  return (
    <div className='protected' style={{ textAlign: 'center' }}>
      <span>This is a protected page that shows a list of posts</span>
      <div
        className='posts-list-container'
        style={{ paddingTop: 10 + 'px', display: 'flex', justifyContent: 'center' }}
      >
        <PostsList isLoading={isLoading} error={error} posts={data} />
      </div>
    </div>
  )
}

export default Protected

