import { mappingComment } from "../../helpers"
import commentService from "../../services/comment"

export const ACT_FETCH_COMMENTS_PARENT = 'ACT_FETCH_COMMENTS_PARENT'

export function actFetchComments({
    comments,
    currentPage,
    total,
    totalPages
}) {
    return {
        type: ACT_FETCH_COMMENTS_PARENT,
        payload: {
            comments,
            currentPage,
            total,
            totalPages
        }
    }
}

function actFetchCommentsAsync({
    perPage = 5,
    currentPage = 1,
    postId,
    parentId = 0,
}) {
    return async dispatch => {
        try {
            if (!postId) {
                throw new Error('Invalid PostId')
            }

            const response = await commentService.getList({
                perPage,
                currentPage,
                postId,
                parentId,
            })
            const total = Number(response.headers['x-wp-total'])
            const totalPages = Number(response.headers['x-wp-totalpages'])
            const comments = response.data.map(mappingComment)

            dispatch(actFetchComments({
                comments,
                currentPage,
                total,
                totalPages
            }))

        } catch (err) {
            //TODO...
        }
    }
}

export default actFetchCommentsAsync