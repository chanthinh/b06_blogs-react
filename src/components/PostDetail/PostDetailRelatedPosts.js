import { useSelector } from "react-redux"
import ArticleRelated from "../ArticleItem/ArticleRelated"

function PostDetailRelatedPosts() {
  const post = useSelector(state => state.Post.relatedPostsByAuthor)
  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      {
        post.map(post => <ArticleRelated key={post.id} post={post} />)
      }
    </div>
  )
}

export default PostDetailRelatedPosts