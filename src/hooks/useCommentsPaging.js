import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actFetchCommentsAsync from "../store/comment/actions"

const fnPostIdSelector = state => state.Post.postDetail && state.Post.postDetail.id
const fnParentPagingSelector = state => state.Comment.parentPaging
const fnChildPagingSelector = (state, parentId) => state.Comment.hashChildPaging[parentId]

export function useCommentsPaging({
    parentId = 0,
    extraParams = {},
} = {}) {
    const dispatch = useDispatch()
    const postId = useSelector(fnPostIdSelector)
    const {
        list: comments,
        currentPage,
        totalPages,
        total,

    } = useSelector(state => {
        if (parentId === 0) {
            return fnParentPagingSelector(state)
        }
        return fnChildPagingSelector(state, parentId)
    })
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
            parentId,
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
        totalPages,
        loading,
    }
}