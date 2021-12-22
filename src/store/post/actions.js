import { mappingPostData, mappingPostDetailData } from "../../helpers"
import postService from "../../services/post"
import actFetchCommentsAsync from '../comment/actions'

// Action Types
export const ACT_FETCH_ARTICLE_LASTEST = 'ACT_FETCH_ARTICLE_LASTEST'
export const ACT_FETCH_ARTICLE_POPULAR = 'ACT_FETCH_ARTICLE_POPULAR'
export const ACT_FETCH_ARTICLES = 'ACT_FETCH_ARTICLES'
export const ACT_FETCH_POST_DETAIL = 'ACT_FETCH_POST_DETAIL'
export const ACT_FETCH_RELATED_POSTS = 'ACT_FETCH_RELATED_POSTS'


// Action
export function actFetchArticleLastest(posts) {
    return {
        type: ACT_FETCH_ARTICLE_LASTEST,
        payload: {
            posts
        }
    }
}

export function actFetchArticlePopular(posts) {
    return {
        type: ACT_FETCH_ARTICLE_POPULAR,
        payload: {
            posts
        }
    }
}

export function actFetchArticles({ posts, currentPage, total, totalPages }) {
    return {
        type: ACT_FETCH_ARTICLES,
        payload: {
            posts, currentPage, total, totalPages
        }
    }
}

export function actFetchPostDetail(post) {
    return {
        type: ACT_FETCH_POST_DETAIL,
        payload: {
            post
        }
    }
}

export function actFetchRelatedPosts(posts) {
    return {
        type: ACT_FETCH_RELATED_POSTS,
        payload: {
            posts
        }
    }
}


// Action Async
export function actFetchArticleLastestAsync() {
    return async (dispatch) => {
        try {
            const response = await postService.getArticleLastest()
            const posts = response.data.map(mappingPostData)

            dispatch(actFetchArticleLastest(posts))
        } catch (err) {
            // Todo
        }
    }
}

export function actFetchArticlePopularAsync() {
    return async (dispatch) => {
        try {
            const response = await postService.getArticlePopular()
            const posts = response.data.map(mappingPostData)

            dispatch(actFetchArticlePopular(posts))
        } catch (err) {
            // Todo
        }
    }
}

export function actFetchArticlesAsync({
    perPage = 2,
    currentPage = 1,
    ...restParams
} = {}) {
    return async (dispatch) => {
        // console.log('restParams',restParams)
        try {
            const response = await postService.getArticles({
                perPage,
                currentPage,
                ...restParams
            })
            const total = Number(response.headers['x-wp-total'])
            const totalPages = Number(response.headers['x-wp-totalpages'])
            const posts = response.data.map(mappingPostData)

            dispatch(actFetchArticles({ posts, currentPage, total, totalPages }))
        } catch (err) {
            // Todo
        }
    }
}

export function actFetchPostDetailAsync(slug) {
    return async dispatch => {
        try {
            const response = await postService.getDetail(slug)
            // console.log('response', response)
            const post = response.data[0]

            if (!post) {
                throw new Error('Post Not Found')
            }

            const postId = post.id
            const authorId = post.author

            dispatch(actFetchCommentsAsync({postId}))
            dispatch(actFetchPostDetail(mappingPostDetailData(post)))
            dispatch(actFetchRelatedPostsAsync({ postId, authorId }))

            return { ok: true }
        } catch (err) {
            return { ok: false }
        }
    }
}

export function actFetchRelatedPostsAsync({ postId, authorId }) {
    return async dispatch => {
        try {
            const response = await postService.getList({
                author: authorId,
                exclude: postId,
                per_page: 3
            })
            const posts = response.data.map(mappingPostData)
            dispatch(actFetchRelatedPosts(posts))
        } catch (err) {

        }
    }
}