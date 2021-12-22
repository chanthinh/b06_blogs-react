import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../components/shared/Button"
import { actFetchArticlesAsync } from "../store/post/actions"


export function usePostsPaging({
    extraParams = {}
} = {}) {
    const dispatch = useDispatch()
    const {
        list: posts,
        currentPage,
        totalPages,
        total
    } = useSelector(state => state.Post.articlePaging)
    const [loading, setLoading] = useState(false)
    const hasMorePost = currentPage < totalPages
    // console.log('posts', posts)


    function handleLoadMore() {

        if (loading) {
            return
        }

        setLoading(true)
        dispatch(actFetchArticlesAsync({
            currentPage: currentPage + 1,
            ...extraParams
        })).then(() => {
            setLoading(false)
        })
    }

    return {
        posts,
        total,
    }
}