import CommentAction from "./CommentAction"
import CommentForm from "./CommentForm"
import CommentSection from "./CommentSection"

function CommentItem(props) {

    const isThisParent = props.parentId === 0

    return (
        <li className="item">
            <CommentSection comment={props.comment}/>
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
                isThisParent && (
                    <CommentAction count={20}/>
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