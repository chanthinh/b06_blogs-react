import CommentAction from './CommentAction'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import './comments.css'

function PostDetailComments() {
  return (
    <div className="post-detail__comments">
      <CommentForm />
      <p>20 Comments</p>

      <ul className="comments">
        <CommentItem parentId={0} />
        <CommentItem parentId={0} />
        <CommentItem parentId={0} />
      </ul>

      <CommentAction count={43} parent={true} spacingTop />
    </div>
  )
}

export default PostDetailComments