import useSWR from 'swr'
import type { NextPage } from 'next'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import PostsList from '../components/PostsList'

const fetcher = async (uri: string) => {
  const response = await fetch(uri)
  return response.json()
}

const Protected: NextPage = () => {
  const { data, error } = useSWR('/api/posts', fetcher)

  return (
    <div className='protected' style={{ textAlign: 'center' }}>
      <span>This is a protected page that shows a list of posts</span>
      <div
        className='posts-list-container'
        style={{ paddingTop: 10 + 'px', display: 'flex', justifyContent: 'center' }}
      >
        <PostsList isLoading={!data} error={error} posts={data} />
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

export default Protected

