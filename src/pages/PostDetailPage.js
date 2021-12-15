import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import PostDetailContent from "../components/PostDetail/PostDetailContent"
import PostDetailHead from "../components/PostDetail/PostDetailHead"
import PostDetailSidebar from "../components/PostDetail/PostDetailSidebar"
import PageNotFound from '../components/PageNotFound/PageNotFound' 
import { actFetchPostDetailAsync } from "../store/post/actions"
import IconLoading from "../components/shared/IconLoading"

function PostDetailPage() {
  const dispatch = useDispatch()
  const params = useParams()
  // console.log('params', params)
  const slug = params.slug;

  const [status, setStatus] = useState('loading')

  useEffect(() => {
    dispatch(actFetchPostDetailAsync(slug))
      .then(res => {
        if (res.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      })
  }, [slug, dispatch])

  if (status === 'loading') {
    return (
      <div className="articles-list section">
        <div className="tcl-container">
          <div className="tcl-row tcl-jc-center">
            <IconLoading width='150px' />
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="tcl-container">
        <PageNotFound />
      </div>
    )
  }

  return (
    <main className="post-detail">
      <div className="spacing" />

      <PostDetailHead />

      <div className="spacing" />

      <div className="post-detail__fluid">
        <div className="tcl-container">
          <div className="post-detail__wrapper">
            <PostDetailContent />

            <PostDetailSidebar />
          </div>
        </div>
      </div>
    </main>

  )
}

export default PostDetailPage