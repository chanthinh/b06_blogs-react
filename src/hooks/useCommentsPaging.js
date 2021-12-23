import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actFetchCommentsAsync from "../store/comment/actions"

const fnPostIdSelector = state => state.Post.postDetail && state.Post.postDetail.id
const fnParentPagingSelector = state => state.Comment.parentPaging

export function useCommentsPaging({
    extraParams = {}
} = {}) {
    const dispatch = useDispatch()
    const postId = useSelector(fnPostIdSelector)
    const {
        list: comments,
        currentPage,
        totalPages,
        total
    } = useSelector(fnParentPagingSelector)
    const [loading, setLoading] = useState(false)
    const hasMoreComments = currentPage < totalPages
    // console.log('posts', posts)

    function handleLoadMore() {
        if (loading) {
            return
        }

        setLoading(true)
        const params = {
            currentPage: currentPage + 1,
            postId: postId,
            parant: 0,
            ...extraParams
        }

        dispatch(actFetchCommentsAsync(params))
            .then(() => {
                setLoading(false)
            })
    }

    return {
        comments,
        total,
        handleLoadMore,
        hasMoreComments,
        totalPages
    }
}