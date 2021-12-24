import { useCommentsPaging } from '../../hooks/useCommentsPaging'
import CommentAction from './CommentAction'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import './comments.css'

const handleMapComments = commentItem => (
  <CommentItem
    key={commentItem.id}
    parentId={commentItem.parentId}
    comment={commentItem}
  />
)

function PostDetailComments() {

  const { comments, total, loading, handleLoadMore } = useCommentsPaging()

  return (
    <div className="post-detail__comments">
      <CommentForm />
      <p>{total} Bình luận</p>

      {
        comments.length > 0 && (
          <ul className="comments">
            {comments.map(handleMapComments)}
          </ul>
        )
      }

      <CommentAction
        count={total - comments.length}
        parent={true}
        spacingTop
        loading={loading}
        onClick={handleLoadMore}
      />
    </div>
  )
}

export default PostDetailComments