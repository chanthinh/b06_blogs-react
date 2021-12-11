import { mappingPostData } from "../../helpers"
import postService from "../../services/post"

// Action Types
export const ACT_FETCH_ARTICLE_LASTEST = 'ACT_FETCH_ARTICLE_LASTEST'
export const ACT_FETCH_ARTICLE_POPULAR = 'ACT_FETCH_ARTICLE_POPULAR'
export const ACT_FETCH_ARTICLES = 'ACT_FETCH_ARTICLES'

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

export function actFetchArticles({posts, currentPage, total, totalPages}) {
    return {
        type: ACT_FETCH_ARTICLES,
        payload: {
            posts, currentPage, total, totalPages
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
        console.log('restParams',restParams)
        try {
            const response = await postService.getArticles({
                perPage,
                currentPage,
                ...restParams
            })
            const total = Number(response.headers['x-wp-total'])
            const totalPages = Number(response.headers['x-wp-totalpages'])
            const posts = response.data.map(mappingPostData)

            dispatch(actFetchArticles({posts, currentPage, total, totalPages}))
        } catch (err) {
            // Todo
        }
    }
}