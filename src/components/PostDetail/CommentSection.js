import { Link } from 'react-router-dom'
import { formatRelativeDate, genUserLink } from '../../helpers'

function CommentSection(comment) {
    const { authorAvatar, authorId, authorName, contentHTML, createdDate } = comment
    const { dateFormatted, dateRelative } = formatRelativeDate(createdDate, true)
    const authorLink = genUserLink(authorId)
    return (
        <div className="comments__section">
            <div className="comments__section--avatar">
                <Link to={authorLink}>
                    <img src={authorAvatar} alt={authorName} />
                </Link>
            </div>
            <div className="comments__section--content">
                <Link to={authorLink} className="comments__section--user">{authorName}</Link>
                <p className="comments__section--time" title={dateRelative}>{dateFormatted}</p>
                <div className="comments__section--text" dangerouslySetInnerHTML={{ __html: contentHTML }} />
                {/* <i class="ion-reply comments__section--reply"></i> */}
            </div>
        </div>
    )
}

export default CommentSection