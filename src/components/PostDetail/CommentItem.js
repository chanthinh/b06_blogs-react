import { useCommentsPaging } from "../../hooks/useCommentsPaging"
import CommentAction from "./CommentAction"
import CommentForm from "./CommentForm"
import CommentSection from "./CommentSection"

function CommentItem(props) {

    const isThisParent = props.parentId === 0
    const {
        comments: replyComments,
        handleLoadMore
    } = useCommentsPaging({
        parentId: props.parentId
    })
    return (
        <li className="item">
            <CommentSection comment={props.comment} />
            {/* Reply Comments */}
            {
                isThisParent && false && (
                    <ul className="comments">
                        <CommentItem parentId={1313213} />
                        <CommentItem parentId={4325432} />
                    </ul>
                )
            }

            {
                isThisParent && props.comment.replyCount > 0 && (
                    <CommentAction count={props.comment.replyCount} onClick={handleLoadMore} />
                )
            }

            {/* Reply form */}
            {
                isThisParent && false && (<CommentForm />)
            }
        </li>
    )
}

export default CommentItem